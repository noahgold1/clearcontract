"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CLAUSES, FAQS, MARKS, READERS, wordCount } from "@/lib/landing-content";

// three.js is ~150KB gzipped. Load it after the headline is on screen; the
// hero's CSS background is the same night color, so nothing jumps.
const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-animation").then((m) => m.ShaderAnimation),
  { ssr: false }
);

const FINE_PRINT =
  "Contractor shall indemnify, defend and hold harmless Company, its affiliates, officers and agents from and against any and all claims, losses, liabilities and expenses of whatever nature arising hereunder. In no event shall Company's aggregate liability exceed the lesser of fees actually paid hereunder during the preceding three (3) months or one hundred dollars ($100.00), regardless of the form of action. This Agreement shall automatically renew for successive twelve (12) month terms unless either party delivers written notice of non-renewal not less than ninety (90) days prior to expiration.";

/* The one orchestrated moment: a block of fine print collapses toward the
   center while the rings close in, and the headline is what's left. Pure
   CSS keyframes, so the headline appears even if scripts are slow or off. */
function Hero() {
  return (
    <section className="lp-hero">
      <ShaderAnimation className="lp-hero-shader" />
      <div className="lp-hero-dim" />
      <p className="lp-fineprint" aria-hidden="true">{FINE_PRINT}</p>
      <div className="lp-hero-in">
        <h1 className="lp-h1">Contracts, shrunk.</h1>
        <p className="lp-hero-sub">Paste one in. Get the few lines that matter.</p>
        <div className="lp-hero-cta">
          <Link href="/app" className="lp-pill">Analyze a contract</Link>
          <span className="lp-hero-note">Free. No account needed.</span>
        </div>
      </div>
    </section>
  );
}

function Rail() {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    on();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { el.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>(".lp-card");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="lp-sec lp-shrink">
      <div className="lp-wrap lp-sec-head">
        <h2 className="lp-h2">Six real clauses, shrunk.</h2>
        <div className="lp-rail-btns">
          <button type="button" className="lp-round" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous clause">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="lp-round" onClick={() => step(1)} disabled={edge.end} aria-label="Next clause">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div className="lp-rail" ref={ref} tabIndex={0} role="region" aria-label="Example clauses, scroll sideways">
        {CLAUSES.map((c) => (
          <article key={c.name} className={`lp-card lp-m-${c.mark}`}>
            <div className="lp-card-top">
              <span className="lp-mark"><i />{c.mark === "risk" ? "Risk" : "Unusual"}</span>
              <span className="lp-count">
                {wordCount(c.legal)} words <span className="lp-count-to">to {wordCount(c.plain)}</span>
              </span>
            </div>
            <p className="lp-legal">{c.legal}</p>
            <p className="lp-plain">{c.plain}</p>
            <p className="lp-card-name">{c.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Marks() {
  return (
    <section className="lp-sec">
      <div className="lp-wrap">
        <h2 className="lp-h2">Every clause gets one of three marks.</h2>
        <div className="lp-marks">
          {MARKS.map((m) => (
            <div key={m.mark} className={`lp-markrow lp-m-${m.mark}`}>
              <span className="lp-mark"><i />{m.label}</span>
              <p>{m.line}</p>
            </div>
          ))}
        </div>

        <div className="lp-readers">
          <h3 className="lp-h3">Tell it who&apos;s reading.</h3>
          <ul>
            {READERS.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="lp-sec">
      <div className="lp-wrap lp-faq">
        <h2 className="lp-h2">Questions</h2>
        <div className="lp-faq-list">
          {FAQS.map((f) => (
            <details key={f.q} className="lp-qa">
              <summary>
                {f.q}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="lp-close">
      <svg className="lp-arc" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="lp-arc-g" x1="0" x2="1">
            <stop offset="0" stopColor="#4BA8FF" stopOpacity="0" />
            <stop offset=".5" stopColor="#4BA8FF" stopOpacity=".9" />
            <stop offset="1" stopColor="#4BA8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 400 C 300 40, 900 40, 1200 400" fill="none" stroke="url(#lp-arc-g)" strokeWidth="1.2" />
      </svg>
      <div className="lp-wrap lp-close-in">
        <h2 className="lp-h2 lp-close-h">Read it before you sign it.</h2>
        <Link href="/app" className="lp-pill">Analyze a contract</Link>
      </div>
    </section>
  );
}

export function Landing() {
  return (
    <main className="lp">
      <Hero />
      <Rail />
      <Marks />
      <Faq />
      <Closing />
    </main>
  );
}
