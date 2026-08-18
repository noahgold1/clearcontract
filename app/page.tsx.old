import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Shield, Zap, Download, Eye } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";
import { LandingHero } from "@/components/LandingHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Meteors } from "@/components/ui/meteors";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";

const APP_URL = "https://clearcontract-two.vercel.app";

export const metadata: Metadata = {
  alternates: { canonical: APP_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${APP_URL}/#webapp`,
      name: "ClearContract",
      url: APP_URL,
      description:
        "AI-powered contract analysis tool. Paste any contract and instantly get plain-English explanations of every clause, risk flags, and key insights, powered by Claude AI.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ClearContract?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ClearContract is an AI-powered contract analysis tool that reads any contract and explains every clause in plain English.",
          },
        },
        {
          "@type": "Question",
          name: "Is ClearContract free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ClearContract is free to use with no account required.",
          },
        },
      ],
    },
  ],
};

const features = [
  {
    Icon: Zap,
    name: "Instant analysis",
    description:
      "Drop a contract, get plain-English breakdowns of every clause in under 10 seconds.",
    href: "/app",
    cta: "Try it now",
    background: (
      <div className="absolute inset-0">
        <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] opacity-30" />
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: Shield,
    name: "Risk detection",
    description:
      "Three-level risk system, Standard, Unusual, Risk, with clear explanations.",
    href: "/app",
    cta: "See examples",
    background: (
      <div className="absolute -right-10 -top-10 size-48 rounded-full bg-red-500/10 blur-3xl" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Eye,
    name: "5 audience modes",
    description:
      "Tune the analysis to your role: Freelancer, Tenant, Founder, Employee, or General.",
    href: "/app",
    cta: "Pick your lens",
    background: (
      <div className="absolute -left-10 -bottom-10 size-48 rounded-full bg-white/10 blur-3xl" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Download,
    name: "PDF export",
    description:
      "Save and share a beautifully formatted dark-themed PDF report of your full analysis.",
    href: "/app",
    cta: "Export sample",
    background: (
      <div className="absolute inset-0">
        <GridPattern
          width={20}
          height={20}
          className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] opacity-50"
        />
      </div>
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ─── HERO (animated client island) ────────────────────────────── */}
      <LandingHero />

      {/* ─── ANIMATED STATS ───────────────────────────────────────────── */}
      <section className="relative border-y border-white/[0.06] bg-zinc-950/50 py-12 px-5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: 5, suffix: "", label: "Audience modes" },
            { value: 10, suffix: "s", label: "Avg. analysis time" },
            { value: 47, suffix: "", label: "Clause types detected" },
          ].map(({ value, suffix, label }) => (
            <div key={label}>
              <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1 flex items-baseline justify-center gap-0.5">
                <NumberTicker value={value} />
                <span className="text-zinc-200">{suffix}</span>
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono-brand">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENTO FEATURES ──────────────────────────────────────────── */}
      <section className="relative py-28 px-5" id="features">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            headingTop="Everything you need to read"
            headingBottomGradient="any contract with confidence"
          />

          <AnimatedSection delay={0.15}>
            <BentoGrid className="lg:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-28 px-5 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            headingTop="Three steps"
            headingBottomGradient="to clarity"
          />

          <div className="relative grid md:grid-cols-3 gap-5">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-gradient-to-r from-white/40 via-white/50 to-white/40" />

            {[
              {
                step: "01",
                icon: "📋",
                title: "Paste or upload",
                desc: "Drop in contract text or upload a PDF. We extract and process it automatically, any format.",
              },
              {
                step: "02",
                icon: "🎯",
                title: "Choose your lens",
                desc: "Pick your role, Freelancer, Tenant, Founder, Employee, or General. Claude shifts focus accordingly.",
              },
              {
                step: "03",
                icon: "✅",
                title: "Read the plain truth",
                desc: "Every clause, explained in plain English. Color-coded risk badges. Download as PDF.",
              },
            ].map(({ step, icon, title, desc }, i) => (
              <AnimatedSection key={step} delay={i * 0.12}>
                <div className="relative bg-zinc-900/50 border border-white/[0.07] rounded-2xl p-7 hover:border-white/30 hover:-translate-y-1 transition-all group overflow-hidden">
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="font-mono-brand text-[11px] text-zinc-700 tracking-widest">
                      {step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2 relative z-10">
                    {title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            headingTop="Start free,"
            headingBottomGradient="upgrade when ready"
            sub="No credit card required. Cancel anytime."
          />
          <AnimatedSection delay={0.1}>
            <PricingTable />
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FINAL CTA WITH METEORS ──────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-white/25 bg-zinc-900/50 p-8 sm:p-14 text-center overflow-hidden">
              <Meteors number={20} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  Don&apos;t sign blind
                </h2>
                <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Understand what you&apos;re agreeing to before it&apos;s too late.
                </p>
                <Link
                  href="/app"
                  className="btn-brand group inline-flex items-center gap-2 text-zinc-950 font-semibold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5"
                >
                  Analyze Your First Contract, Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="text-zinc-700 text-xs mt-4">
                  3 free analyses every month · No credit card required
                </p>
              </div>

              <BorderBeam size={300} duration={15} colorFrom="#ffffff" colorTo="#a1a1aa" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
