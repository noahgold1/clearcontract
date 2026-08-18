"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";

/** Radius of the cursor spotlight, in px. */
const SPOTLIGHT_R = 260;

type Status = "risk" | "unusual" | "standard";

/**
 * Both hero layers render this same list, so the spotlight reads like an
 * x-ray: impenetrable legalese underneath, plain English inside the light.
 * Blocks are fixed-height and clipped so the two layers stay in register.
 */
const CLAUSES: { label: string; legal: string; plain: string; status: Status }[] = [
  {
    label: "Intellectual Property",
    legal:
      "Contractor hereby irrevocably assigns to Company all right, title and interest in and to any and all Work Product together with all intellectual property rights therein, whether conceived within or outside the scope hereof.",
    plain: "They own everything you make — including side projects on your own time.",
    status: "risk",
  },
  {
    label: "Indemnification",
    legal:
      "Contractor shall indemnify, defend and hold harmless Company, its affiliates, officers and agents from and against any and all claims, losses, liabilities and expenses of whatever nature arising hereunder.",
    plain: "If anyone sues over this work, you pay the legal bills — not them.",
    status: "risk",
  },
  {
    label: "Limitation of Liability",
    legal:
      "In no event shall Company's aggregate liability exceed the lesser of fees actually paid hereunder during the preceding three (3) months or one hundred dollars ($100.00), regardless of the form of action.",
    plain: "Their maximum payout to you is capped at $100. Yours to them is unlimited.",
    status: "risk",
  },
  {
    label: "Termination",
    legal:
      "Company may terminate this Agreement at any time, with or without cause, effective immediately upon written notice, without further obligation of any kind to Contractor.",
    plain: "They can end this instantly. You get no notice and no severance.",
    status: "risk",
  },
  {
    label: "Auto-Renewal",
    legal:
      "This Agreement shall automatically renew for successive twelve (12) month terms unless either party delivers written notice of non-renewal not less than ninety (90) days prior to expiration.",
    plain: "Locks in for another year unless you cancel 90 days early.",
    status: "unusual",
  },
  {
    label: "Non-Compete",
    legal:
      "For a period of twenty-four (24) months following termination, Contractor shall not engage in any business competitive with Company within any territory in which Company conducts operations.",
    plain: "You can't work in your field for 2 years, anywhere they operate.",
    status: "risk",
  },
  {
    label: "Payment Terms",
    legal:
      "Company shall remit payment of undisputed invoices within ninety (90) days of receipt, provided all deliverables have been accepted by Company in its sole and absolute discretion.",
    plain: "You wait 90 days to get paid — and only if they decide they're happy.",
    status: "unusual",
  },
  {
    label: "Governing Law",
    legal:
      "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions or principles.",
    plain: "Any dispute gets handled under Delaware law.",
    status: "standard",
  },
  {
    label: "Confidentiality",
    legal:
      "Each party shall maintain in strict confidence all Confidential Information disclosed by the other party and shall not disclose such information to any third party without prior written consent.",
    plain: "Both sides keep each other's secrets. Normal and mutual.",
    status: "standard",
  },
  {
    label: "Arbitration",
    legal:
      "Any dispute arising hereunder shall be resolved exclusively by binding arbitration administered in Company's principal place of business, and the parties waive any right to trial by jury.",
    plain: "You give up your right to sue or join a class action.",
    status: "unusual",
  },
  {
    label: "Assignment",
    legal:
      "Company may assign this Agreement in whole or in part to any successor or affiliate without notice. Contractor may not assign any rights or obligations hereunder without prior written consent.",
    plain: "They can hand this contract to anyone. You can't.",
    status: "unusual",
  },
  {
    label: "Entire Agreement",
    legal:
      "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations, representations and agreements, whether written or oral, relating to the subject matter hereof.",
    plain: "Only what's written here counts. Verbal promises don't.",
    status: "standard",
  },
];

const STATUS_STYLES: Record<Status, { dot: string; text: string; label: string }> = {
  risk: { dot: "bg-red-400", text: "text-red-300", label: "Risk" },
  unusual: { dot: "bg-amber-400", text: "text-amber-300", label: "Unusual" },
  standard: { dot: "bg-emerald-400", text: "text-emerald-300", label: "Standard" },
};

/**
 * One full-bleed grid of clause blocks. `plain` is the revealed layer, so it
 * gets colour, status badges and readable sans copy; `legal` is the base layer
 * and stays deliberately dense and low-contrast.
 */
function ClauseGrid({ variant }: { variant: "legal" | "plain" }) {
  const plain = variant === "plain";
  return (
    <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 sm:p-5 content-start">
      {CLAUSES.map((c) => {
        const s = STATUS_STYLES[c.status];
        return (
          <div
            key={c.label}
            className={`h-[120px] sm:h-[150px] overflow-hidden rounded-xl border p-3 sm:p-3.5 ${
              plain
                ? // Opaque, so inside the spotlight the legalese underneath is
                  // fully occluded rather than bleeding through the plain copy.
                  "border-white/[0.16] bg-[#121216]"
                : "border-white/[0.05] bg-white/[0.015]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              {plain && <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />}
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  plain ? s.text : "text-zinc-700 font-mono"
                }`}
              >
                {plain ? s.label : c.label}
              </span>
            </div>
            <p
              className={
                plain
                  ? "text-[12px] leading-snug text-zinc-100"
                  : "text-[10px] leading-relaxed text-zinc-700 font-mono"
              }
            >
              {plain ? c.plain : c.legal}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  // A fixed 260px radius floodlights a phone screen, so it scales down on
  // narrow viewports to stay a spotlight rather than a wash.
  const [radius, setRadius] = useState(SPOTLIGHT_R);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const applyRadius = () =>
      setRadius(window.innerWidth < 640 ? 140 : SPOTLIGHT_R);
    applyRadius();
    window.addEventListener("resize", applyRadius);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start centred so the reveal is visible before any interaction, which
    // also covers touch devices where no pointer may ever move.
    const rect = el.getBoundingClientRect();
    const start = { x: rect.width / 2, y: rect.height / 2 };
    mouse.current = { ...start };
    smooth.current = { ...start };
    setPos(start);

    if (reduced) {
      return () => window.removeEventListener("resize", applyRadius);
    }

    // The RAF loop parks itself once the eased position catches up, and is
    // restarted by the next pointer move. Avoids burning a frame callback
    // forever while the cursor sits still.
    const tick = () => {
      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      smooth.current.x += dx * 0.1;
      smooth.current.y += dy * 0.1;
      setPos({ x: smooth.current.x, y: smooth.current.y });

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    // pointermove covers mouse, pen and touch-drag in one listener.
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", applyRadius);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // A CSS radial-gradient mask gives the same soft-edged spotlight as a canvas
  // luminance mask, without serialising a full-screen canvas to a data URL on
  // every frame. Stops mirror the original gradient ramp.
  const mask =
    `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, ` +
    "rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, " +
    "rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "calc(100dvh - 60px)", minHeight: "560px" }}
    >
      {/* Both layers share one zooming wrapper so they stay in register. */}
      <div className="absolute inset-0 hero-zoom">
        {/* Base: dense legalese */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ClauseGrid variant="legal" />
        </div>

        {/* Vignette dims the legalese so the headline stays readable. It sits
            BELOW the reveal layer, otherwise it would wash out the spotlight. */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 22%, rgba(0,0,0,0.82), rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Reveal: plain English, visible only inside the spotlight */}
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
        >
          <ClauseGrid variant="plain" />
        </div>
      </div>

      {/* Bottom scrim so the standfirst and CTA stay legible over the grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%] sm:h-[38%] z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Heading */}
      <div className="absolute top-[13%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
          >
            Know exactly
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
          >
            what you&apos;re signing
          </span>
        </h1>
        {/* Touch devices have no cursor, so the hint swaps at the sm breakpoint. */}
        <p
          className="mt-6 text-sm text-white/60 hero-anim hero-fade"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="hidden sm:inline">
            Move your cursor to read the fine print in plain English
          </span>
          <span className="sm:hidden">Drag across the page to read the fine print</span>
        </p>
      </div>

      {/* Bottom left */}
      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          Every contract hides its risk in the dense parts, buried in clauses written to
          be skimmed past rather than understood.
        </p>
      </div>

      {/* Bottom right */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          ClearContract reads every clause and tells you what it actually means, flagging
          the terms that put you at risk before you sign.
        </p>
        <Link
          href="/app"
          className="group inline-flex items-center gap-2 bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
        >
          <FileText className="w-4 h-4" />
          Analyze a contract
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
