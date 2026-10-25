"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * The loading state for an analysis: a spider walks down the contract and
 * reaches its legs out to the words that usually matter (money, dates,
 * deadlines, and the handful of legal verbs that take things from you).
 *
 * The highlighting here is a client-side pattern match so there is
 * something real to look at while the model works. It is not the model's
 * answer, and nothing here claims to be: the counter says "marked", the
 * verdict comes from the results that replace this component.
 *
 * Everything that moves is written straight to the DOM from one rAF loop.
 * A contract can be 1,500 words, and re-rendering 1,500 spans at 60fps
 * through React state would stutter on a phone.
 */

type Props = {
  /** Pasted text. When present, the spider crawls the actual words. */
  text?: string;
  /** Uploaded photo. The spider crawls the image itself. */
  imageSrc?: string | null;
  /** Shown in the counter pill, e.g. the PDF's file name. */
  label: string;
};

const MAX_WORDS = 1400;
const LEGS = 8;

/* Words that tend to carry the weight in a consumer contract. Kept short on
   purpose: if everything lights up, nothing does. */
const TERMS = new Set(
  (
    "terminate terminated terminates termination indemnify indemnifies indemnification " +
    "indemnity liability liable waive waives waived waiver arbitration arbitrator binding " +
    "exclusive exclusively perpetual perpetuity irrevocable irrevocably penalty penalties " +
    "forfeit forfeits forfeiture automatically renew renews renewal non-compete noncompete " +
    "solicit non-solicitation confidential confidentiality assign assigns assignment " +
    "discretion damages breach jury warranty warranties fee fees deposit evict eviction " +
    "default interest royalty royalties ownership owns intellectual equity vesting vest " +
    "severance overtime harmless sole unlimited governing jurisdiction late refund " +
    "non-refundable nonrefundable cancel cancellation guarantee guarantor withhold deduct " +
    "deductions liquidated surrender"
  ).split(" ")
);

type Kind = 0 | 1 | 2; // 0 plain, 1 legal term, 2 figure
type Tok = { w: string; k: Kind } | string; // string = whitespace run

function kindOf(word: string): Kind {
  // "5." and "12." are section numbers, not figures anyone needs to see.
  if (/^\d+\.$/.test(word)) return 0;
  if (/\d/.test(word) || word.startsWith("$")) return 2;
  const bare = word.toLowerCase().replace(/[^a-z-]/g, "");
  return TERMS.has(bare) ? 1 : 0;
}

function tokenize(text: string): { toks: Tok[]; truncated: boolean } {
  const clean = text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const parts = clean.split(/(\s+)/);
  const toks: Tok[] = [];
  let words = 0;
  for (const p of parts) {
    if (!p) continue;
    if (/^\s+$/.test(p)) { toks.push(p); continue; }
    if (words >= MAX_WORDS) return { toks, truncated: true };
    toks.push({ w: p, k: kindOf(p) });
    words++;
  }
  return { toks, truncated: false };
}

/* Stand-in page for a PDF, whose text only exists on the server until the
   results come back. Deterministic so it doesn't reshuffle on re-render. */
function skeleton(): Tok[] {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const toks: Tok[] = [];
  for (let line = 0; line < 52; line++) {
    if (line % 9 === 8) { toks.push("\n\n"); continue; }
    const n = 6 + Math.floor(rnd() * 6);
    for (let i = 0; i < n; i++) {
      const r = rnd();
      toks.push({ w: " ".repeat(2 + Math.floor(rnd() * 7)), k: r < 0.07 ? 2 : r < 0.16 ? 1 : 0 });
      toks.push(" ");
    }
    toks.push("\n");
  }
  return toks;
}

type Word = { el: HTMLElement; x: number; y: number; k: Kind; hit: boolean };
type Leg = { tx: number; ty: number; gx: number; gy: number; word: Word | null; home: number };

export function ContractCrawler({ text, imageSrc, label }: Props) {
  const mode: "text" | "image" | "pdf" = text?.trim() ? "text" : imageSrc ? "image" : "pdf";

  const { toks, truncated } = useMemo(() => {
    if (mode === "text") return tokenize(text!);
    if (mode === "pdf") return { toks: skeleton(), truncated: false };
    return { toks: [] as Tok[], truncated: false };
  }, [mode, text]);

  const totalKeys = useMemo(
    () => toks.filter((t) => typeof t !== "string" && t.k > 0).length,
    [toks]
  );

  const boxRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const legRefs = useRef<(SVGPathElement | null)[]>([]);
  const kneeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const tipRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [hits, setHits] = useState(0);
  const [imgReady, setImgReady] = useState(mode !== "image");

  useEffect(() => {
    const box = boxRef.current, doc = docRef.current;
    if (!box || !doc || !imgReady) return;

    const words: Word[] = Array.from(doc.querySelectorAll<HTMLElement>("[data-k]")).map((el) => ({
      el,
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
      k: Number(el.dataset.k) as Kind,
      hit: false,
    }));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // No crawl. Show the marked terms all at once and leave it still.
      words.forEach((w) => w.k > 0 && w.el.classList.add("is-hit"));
      setHits(words.filter((w) => w.k > 0).length);
      return;
    }

    let W = box.clientWidth, H = box.clientHeight, docH = doc.offsetHeight;
    const onResize = () => { W = box.clientWidth; H = box.clientHeight; docH = doc.offsetHeight; };
    window.addEventListener("resize", onResize);

    let x = W * 0.5, y = 40, dir = 1, t = 0, angle = Math.PI / 2;
    let offset = 0, last = performance.now(), retarget = 0, hitCount = 0, lastPushed = 0;
    const passSeconds = Math.min(18, Math.max(9, docH / 70));
    const speed = () => docH / passSeconds;
    const reach = () => Math.min(175, W * 0.36);

    const legs: Leg[] = Array.from({ length: LEGS }, (_, i) => {
      const home = (i / LEGS) * Math.PI * 2 + Math.PI / LEGS;
      return { tx: x, ty: y, gx: x, gy: y, word: null, home };
    });
    const touched: { el: HTMLElement; at: number }[] = [];

    // Words are in document order, so y only increases: binary-search the
    // window instead of scanning all of them every retarget.
    const firstAtOrBelow = (yy: number) => {
      let lo = 0, hi = words.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (words[m].y < yy) lo = m + 1; else hi = m; }
      return lo;
    };

    const pickTargets = () => {
      const R = reach();
      const near: Word[] = [];
      for (let i = firstAtOrBelow(y - R); i < words.length && words[i].y <= y + R; i++) {
        const w = words[i], dx = w.x - x, dy = w.y - y;
        if (dx * dx + dy * dy < R * R && dx * dx + dy * dy > 30 * 30) near.push(w);
      }
      const dist = (w: Word) => (w.x - x) ** 2 + (w.y - y) ** 2;
      const keys = near.filter((w) => w.k > 0 && !w.hit).sort((a, b) => dist(a) - dist(b)).slice(0, 4);
      const rest = near.filter((w) => !keys.includes(w)).sort(() => Math.random() - 0.5);
      const chosen = [...keys, ...rest].slice(0, LEGS - 2);

      // Give each target to the free leg whose resting angle is closest,
      // so legs fan out instead of crossing over each other.
      const free = new Set(legs.map((_, i) => i));
      const assign = (gx: number, gy: number, word: Word | null) => {
        const a = Math.atan2(gy - y, gx - x);
        let best = -1, bestD = Infinity;
        free.forEach((i) => {
          const h = legs[i].home + angle - Math.PI / 2;
          const d = Math.abs(Math.atan2(Math.sin(a - h), Math.cos(a - h)));
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best < 0) return;
        free.delete(best);
        legs[best].gx = gx; legs[best].gy = gy; legs[best].word = word;
      };
      chosen.forEach((w) => assign(w.x, w.y, w));
      free.forEach((i) => {
        const a = legs[i].home + angle - Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const len = 55 + Math.random() * 60;
        legs[i].gx = x + Math.cos(a) * len; legs[i].gy = y + Math.sin(a) * len; legs[i].word = null;
      });
      free.clear();
    };

    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now; t += dt;

      // Walk down the page, then back up, until the results replace us.
      y += dir * speed() * dt;
      if (y > docH - 24) { y = docH - 24; dir = -1; }
      if (y < 24) { y = 24; dir = 1; }
      const nx = W * (0.5 + 0.27 * Math.sin(t * 0.5) + 0.09 * Math.sin(t * 1.9));
      const vx = (nx - x) / Math.max(dt, 1e-3), vy = dir * speed();
      x = nx;
      const want = Math.atan2(vy, vx);
      angle += Math.atan2(Math.sin(want - angle), Math.cos(want - angle)) * Math.min(1, dt * 6);

      offset = Math.max(0, Math.min(docH - H, y - H * 0.45));
      doc.style.transform = `translate3d(0,${-offset}px,0)`;

      retarget -= dt;
      if (retarget <= 0) { pickTargets(); retarget = 0.17; }

      const sy = y - offset;
      bodyRef.current?.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${sy.toFixed(1)}) rotate(${((angle * 180) / Math.PI - 90).toFixed(1)})`
      );

      const ease = 1 - Math.exp(-dt * 13);
      legs.forEach((leg, i) => {
        leg.tx += (leg.gx - leg.tx) * ease;
        leg.ty += (leg.gy - leg.ty) * ease;

        if (leg.word && Math.abs(leg.tx - leg.gx) < 5 && Math.abs(leg.ty - leg.gy) < 5) {
          const w = leg.word;
          if (w.k > 0 && !w.hit) { w.hit = true; w.el.classList.add("is-hit"); hitCount++; }
          else if (w.k === 0 && !w.el.classList.contains("is-touched")) {
            w.el.classList.add("is-touched"); touched.push({ el: w.el, at: t });
          }
          leg.word = null;
        }

        // Hip sits on the body; the knee bows outward from the side the leg
        // is on, which is what makes the lines read as legs and not rays.
        const side = i < LEGS / 2 ? 1 : -1;
        const hx = x + Math.cos(angle) * ((i % 4) - 1.5) * 7;
        const hy = sy + Math.sin(angle) * ((i % 4) - 1.5) * 7;
        const ex = leg.tx, ey = leg.ty - offset;
        const mx = (hx + ex) / 2, my = (hy + ey) / 2;
        const len = Math.hypot(ex - hx, ey - hy) || 1;
        const kx = mx + (-(ey - hy) / len) * len * 0.22 * side;
        const ky = my + ((ex - hx) / len) * len * 0.22 * side;
        legRefs.current[i]?.setAttribute("d", `M${hx.toFixed(1)} ${hy.toFixed(1)}L${kx.toFixed(1)} ${ky.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`);
        kneeRefs.current[i]?.setAttribute("cx", kx.toFixed(1));
        kneeRefs.current[i]?.setAttribute("cy", ky.toFixed(1));
        tipRefs.current[i]?.setAttribute("cx", ex.toFixed(1));
        tipRefs.current[i]?.setAttribute("cy", ey.toFixed(1));
      });

      while (touched.length && t - touched[0].at > 1.3) touched.shift()!.el.classList.remove("is-touched");
      if (now - lastPushed > 250) { lastPushed = now; setHits(hitCount); }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [toks, imgReady]);

  return (
    <div className="cc-crawl" aria-hidden="true">
      <div className="cc-crawl-box" ref={boxRef}>
        <div className={`cc-crawl-doc cc-crawl-${mode}`} ref={docRef}>
          {mode === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc!} alt="" onLoad={() => setImgReady(true)} />
          ) : (
            <>
              {toks.map((tk, i) =>
                typeof tk === "string" ? (
                  tk
                ) : (
                  <span key={i} data-k={tk.k} className={`cc-crawl-w k${tk.k}`}>
                    {tk.w}
                  </span>
                )
              )}
              {truncated && <span className="cc-crawl-more">{"\n\n"}[continues]</span>}
            </>
          )}
        </div>

        <svg className="cc-crawl-spider" width="100%" height="100%">
          {Array.from({ length: LEGS }, (_, i) => (
            <g key={i}>
              <path ref={(el) => { legRefs.current[i] = el; }} className="cc-leg" />
              <circle ref={(el) => { kneeRefs.current[i] = el; }} r="2.6" className="cc-knee" />
              <circle ref={(el) => { tipRefs.current[i] = el; }} r="3.4" className="cc-tip" />
            </g>
          ))}
          <g ref={bodyRef} transform="translate(-100 -100)">
            <rect x="-9" y="-25" width="18" height="50" rx="9" className="cc-body" />
            <circle cy="15" r="4.2" className="cc-eye" />
          </g>
        </svg>

        <div className="cc-crawl-pill">
          <span className="cc-crawl-label">{label}</span>
          {mode === "text" ? (
            <span>
              <b>{hits}</b> of {totalKeys} terms marked
            </span>
          ) : (
            <span>reading on the server</span>
          )}
        </div>
      </div>
    </div>
  );
}
