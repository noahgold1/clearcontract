import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Shield, Zap, Download, Eye, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroPreview } from "@/components/HeroPreview";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

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
        "AI-powered contract analysis tool. Paste any contract and instantly get plain-English explanations of every clause, risk flags, and key insights — powered by Claude AI.",
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

const testimonials = [
  {
    name: "Sarah K.",
    role: "Freelance Designer",
    body: "Caught a 24-month non-compete buried in clause 47. Saved me from signing my career away.",
  },
  {
    name: "Marcus T.",
    role: "Software Engineer",
    body: "My offer letter had IP language that would've claimed my side projects. ClearContract flagged it instantly.",
  },
  {
    name: "Priya R.",
    role: "Startup Founder",
    body: "Used it to review our SAFE notes. Spotted a liquidation preference issue our lawyer missed.",
  },
  {
    name: "James L.",
    role: "Renter",
    body: "Found a clause letting the landlord enter without notice. Negotiated it out before signing.",
  },
  {
    name: "Elena M.",
    role: "Consultant",
    body: "Net-90 payment terms hidden on page 12. Renegotiated to net-30 thanks to the flag.",
  },
  {
    name: "David W.",
    role: "Small Business Owner",
    body: "The risk badges make it dead simple. I run every vendor contract through this now.",
  },
];

const features = [
  {
    Icon: Zap,
    name: "Instant analysis",
    description: "Drop a contract, get plain-English breakdowns of every clause in under 10 seconds.",
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
    description: "Three-level risk system — Standard, Unusual, Risk — with clear explanations.",
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
    description: "Tune the analysis to your role: Freelancer, Tenant, Founder, Employee, or General.",
    href: "/app",
    cta: "Pick your lens",
    background: (
      <div className="absolute -left-10 -bottom-10 size-48 rounded-full bg-indigo-500/10 blur-3xl" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Download,
    name: "PDF export",
    description: "Save and share a beautifully formatted dark-themed PDF report of your full analysis.",
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

function TestimonialCard({ name, role, body }: { name: string; role: string; body: string }) {
  return (
    <figure className="relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors">
      <div className="flex flex-row items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
          {name[0]}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white">{name}</figcaption>
          <p className="text-xs text-zinc-500">{role}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-zinc-400 leading-relaxed">"{body}"</blockquote>
    </figure>
  );
}

export default function LandingPage() {
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center px-5 py-24 overflow-hidden">
        {/* Spotlight */}
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#818cf8" />

        {/* Grid pattern */}
        <GridPattern
          width={50}
          height={50}
          className={cn(
            "absolute inset-0 opacity-30",
            "[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_50%,transparent_100%)]"
          )}
        />

        {/* Edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-20">
          {/* Left */}
          <div>
            {/* Animated shimmer badge */}
            <div className="z-10 mb-8 flex items-center justify-start">
              <div
                className={cn(
                  "group rounded-full border border-white/10 bg-white/5 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-white/10",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-neutral-200 hover:duration-300">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  <span className="text-xs font-semibold tracking-wide">Powered by Claude Sonnet 4.5</span>
                </AnimatedShinyText>
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-[68px] leading-[1.02] font-bold tracking-tight mb-6">
              <span className="text-white">Know exactly</span>
              <br />
              <span className="bg-gradient-to-br from-indigo-200 via-indigo-400 to-violet-600 bg-clip-text text-transparent">
                what you're signing
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg">
              Drop in any contract. Get a plain-English breakdown of every clause in seconds —
              with risk flags, unusual terms, and clear explanations tailored to your situation.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/app"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                Analyze a Contract Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                See how it works
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600">
              {["No account required", "3 free analyses/month", "PDF export included"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — preview with border beam */}
          <div className="hidden lg:flex justify-center">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ─── ANIMATED STATS ───────────────────────────────────────────── */}
      <section className="relative border-y border-white/[0.06] bg-zinc-950/50 py-12 px-5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 5, suffix: "", label: "Audience modes" },
            { value: 10, suffix: "s", label: "Avg. analysis time" },
            { value: 100, suffix: "%", label: "Privacy guaranteed" },
            { value: 47, suffix: "", label: "Clause types detected" },
          ].map(({ value, suffix, label }) => (
            <div key={label}>
              <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1 flex items-baseline justify-center gap-0.5">
                <NumberTicker value={value} />
                <span className="text-indigo-400">{suffix}</span>
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono-brand">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENTO FEATURES ──────────────────────────────────────────── */}
      <section className="py-28 px-5" id="features">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">
                // features
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Everything you need to read
                <br />
                <span className="bg-gradient-to-br from-indigo-200 to-violet-500 bg-clip-text text-transparent">
                  any contract with confidence
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <BentoGrid className="lg:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-28 px-5 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">
                // how_it_works
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
                Three steps to clarity
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative grid md:grid-cols-3 gap-5">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-gradient-to-r from-indigo-500/40 via-violet-500/30 to-indigo-500/40" />

            {[
              {
                step: "01",
                icon: "📋",
                title: "Paste or upload",
                desc: "Drop in contract text or upload a PDF. We extract and process it automatically — any format.",
              },
              {
                step: "02",
                icon: "🎯",
                title: "Choose your lens",
                desc: "Pick your role — Freelancer, Tenant, Founder, Employee, or General. Claude shifts focus accordingly.",
              },
              {
                step: "03",
                icon: "✅",
                title: "Read the plain truth",
                desc: "Every clause, explained in plain English. Color-coded risk badges. Download as PDF.",
              },
            ].map(({ step, icon, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 120}>
                <div className="relative bg-zinc-900/50 border border-white/[0.07] rounded-2xl p-7 hover:border-indigo-500/30 transition-colors group overflow-hidden">
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="font-mono-brand text-[11px] text-zinc-700 tracking-widest">
                      {step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-lg">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2 relative z-10">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS MARQUEE ────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.06] overflow-hidden">
        <ScrollReveal>
          <div className="text-center mb-12 px-5">
            <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">
              // testimonials
            </p>
            <h2 className="font-display text-4xl font-bold text-white tracking-tight">
              People we've saved from bad contracts
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative flex flex-col gap-4">
          <Marquee pauseOnHover className="[--duration:50s]">
            {firstRow.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {secondRow.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-zinc-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-950" />
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">
                // pricing
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
                Start free, upgrade when ready
              </h2>
              <p className="text-zinc-500 text-sm">No credit card required. Cancel anytime.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <PricingTable />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FINAL CTA WITH METEORS ──────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-indigo-500/20 bg-zinc-900/50 p-14 text-center overflow-hidden">
              <Meteors number={20} />
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-violet-950/20 pointer-events-none" />

              <div className="relative z-10">
                <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-6 uppercase">
                  // get_started
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  Don&apos;t sign blind
                </h2>
                <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Thousands of people use ClearContract to understand what they&apos;re agreeing to
                  before it&apos;s too late.
                </p>
                <Link
                  href="/app"
                  className="group inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] hover:-translate-y-0.5"
                >
                  Analyze Your First Contract — Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="text-zinc-700 text-xs mt-4">
                  No account required · 3 free analyses/month
                </p>
              </div>

              <BorderBeam size={300} duration={15} colorFrom="#818cf8" colorTo="#c084fc" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
