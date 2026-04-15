import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroPreview } from "@/components/HeroPreview";

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
        description: "Free to use, no account required",
      },
      featureList: [
        "Plain-English contract clause explanations",
        "Risk detection and flagging",
        "PDF upload support",
        "5 audience modes: freelancer, employee, business, tenant, general",
        "Downloadable PDF report",
        "Powered by Claude AI",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#org`,
      name: "ClearContract",
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/icon.svg`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "ClearContract",
      description: "Understand any contract in seconds with AI",
      publisher: { "@id": `${APP_URL}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${APP_URL}/app`,
        },
        "query-input": "required name=contract_text",
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
            text: "ClearContract is an AI-powered contract analysis tool that reads any contract and explains every clause in plain English. It flags risky terms, unusual provisions, and tells you exactly what you're agreeing to before you sign.",
          },
        },
        {
          "@type": "Question",
          name: "Is ClearContract free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ClearContract is free to use with no account required. Simply paste your contract text or upload a PDF and get an instant AI analysis.",
          },
        },
        {
          "@type": "Question",
          name: "What types of contracts can ClearContract analyze?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ClearContract can analyze any type of contract including employment agreements, freelance contracts, rental leases, business contracts, NDAs, service agreements, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Is this legal advice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. ClearContract is an informational tool to help you understand contract language. It is not legal advice. For important legal matters, always consult a qualified attorney.",
          },
        },
      ],
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative hero-grid dot-grid min-h-[92vh] flex items-center px-5 py-24">
        {/* Edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2.5 border border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-dot" />
              Powered by Claude Sonnet
            </div>

            <h1 className="font-display text-5xl md:text-[62px] leading-[1.02] font-bold tracking-tight mb-6">
              <span className="text-white">Know exactly</span>
              <br />
              <span className="text-gradient">what you're signing</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              Drop in any contract. Get a plain-English breakdown of every clause in seconds —
              with risk flags, unusual terms, and clear explanations tailored to your situation.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all btn-glow hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Analyze a Contract Free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                See how it works
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Micro trust signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600">
              {["No account required to start", "3 free analyses/month", "PDF export included"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — live preview */}
          <div className="hidden lg:flex justify-center">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-[#0c0c10] py-5 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "5", label: "Audience modes" },
            { value: "< 10s", label: "Avg. analysis time" },
            { value: "100%", label: "Privacy — not stored" },
            { value: "∞", label: "Clauses per contract" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-display text-2xl font-bold text-white mb-0.5">{value}</div>
              <div className="text-xs text-zinc-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-28 px-5" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">// how_it_works</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
                Three steps to clarity
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative grid md:grid-cols-3 gap-5">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-gradient-to-r from-indigo-500/40 via-violet-500/30 to-indigo-500/40" />

            {[
              { step: "01", icon: "📋", title: "Paste or upload", desc: "Drop in contract text or upload a PDF. We extract and process it automatically — lease agreements, employment offers, term sheets, any format." },
              { step: "02", icon: "🎯", title: "Choose your lens", desc: "Pick your role — Freelancer, Tenant, Founder, Employee, or General. Claude shifts its focus to the exact risks that matter to you." },
              { step: "03", icon: "✅", title: "Read the plain truth", desc: "Every clause, explained in plain English. Color-coded risk badges surface what matters. Download the full report as a PDF." },
            ].map(({ step, icon, title, desc }, i) => (
              <ScrollReveal key={step} delay={i * 120}>
                <div className="relative bg-[#0e0e13] border border-white/[0.07] rounded-2xl p-7 hover:border-indigo-500/30 transition-colors shine-border group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-brand text-[11px] text-zinc-700 tracking-widest">{step}</span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-lg">
                      {icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUDIENCE MODES ───────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">// audience_modes</p>
              <h2 className="font-display text-4xl font-bold text-white tracking-tight mb-3">
                Analysis tuned to your situation
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
                Each mode uses a different Claude system prompt, focused on the clauses that
                actually affect you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-3">
            {[
              { icon: "💼", label: "Freelancer", focus: "IP assignment · Non-competes · Payment terms · Kill fees" },
              { icon: "🏠", label: "Tenant", focus: "Deposit rules · Maintenance duties · Early exit · Landlord access" },
              { icon: "🚀", label: "Founder", focus: "Dilution · Liquidation preferences · Board control · Veto rights" },
              { icon: "👔", label: "Employee", focus: "At-will clauses · Non-solicitation · IP of side projects · Arbitration" },
              { icon: "📄", label: "General", focus: "Plain-English explanations for any non-lawyer" },
            ].map(({ icon, label, focus }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <div className="bg-[#0e0e13] border border-white/[0.07] rounded-xl p-5 hover:border-indigo-500/30 transition-all shine-border text-center group cursor-default h-full">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="font-semibold text-white text-sm mb-3">{label}</div>
                  <div className="space-y-1">
                    {focus.split(" · ").map((f) => (
                      <div key={f} className="text-[10px] text-zinc-600 font-mono-brand">{f}</div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE DEEP-DIVE ────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* Feature 1 — Risk flags */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">// risk_detection</p>
                <h3 className="font-display text-3xl font-bold text-white mb-4 tracking-tight">
                  Three levels of risk, instantly surfaced
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                  Every clause gets a badge — Standard, Unusual, or Risk. Risky clauses come with
                  a plain-English flag explaining exactly why it should concern you.
                </p>
                <div className="space-y-2">
                  {[
                    { color: "bg-emerald-400", label: "Standard", desc: "Common, expected clause with no concern" },
                    { color: "bg-amber-400",   label: "Unusual",  desc: "One-sided or uncommon — worth knowing" },
                    { color: "bg-red-400",     label: "Risk",     desc: "Potentially harmful — always flagged with explanation" },
                  ].map(({ color, label, desc }) => (
                    <div key={label} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
                      <span className="text-sm font-semibold text-white w-20 shrink-0">{label}</span>
                      <span className="text-xs text-zinc-500">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="bg-[#0e0e13] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="border-b border-white/[0.06] px-4 py-3 flex items-center gap-2">
                  <span className="font-mono-brand text-[11px] text-zinc-600">clause_analysis.json</span>
                </div>
                <div className="p-4 space-y-3 font-mono-brand text-xs">
                  {[
                    { status: "risk", title: "Non-compete clause", flag: "24 months, no geographic limit" },
                    { status: "unusual", title: "Net-60 payment terms", flag: "Twice the industry standard" },
                    { status: "standard", title: "Governing law", flag: null },
                  ].map(({ status, title, flag }) => {
                    const colors = { risk: "text-red-400", unusual: "text-amber-400", standard: "text-emerald-400" };
                    return (
                      <div key={title} className="bg-[#09090b] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-zinc-300 text-[11px]">{title}</span>
                          <span className={`text-[10px] font-semibold ${colors[status as keyof typeof colors]}`}>{status.toUpperCase()}</span>
                        </div>
                        {flag && <span className="text-zinc-600 text-[10px]">⚑ {flag}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Feature 2 — PDF */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={150} className="md:order-2">
              <div>
                <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">// pdf_export</p>
                <h3 className="font-display text-3xl font-bold text-white mb-4 tracking-tight">
                  Save and share your analysis
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                  Export the full analysis as a formatted PDF — dark-themed, clause-by-clause,
                  with all risk flags and a legal disclaimer. Share it with your lawyer,
                  your team, or keep it on file.
                </p>
                <Link href="/app" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">
                  Try it now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal className="md:order-1">
              <div className="bg-[#0e0e13] border border-white/[0.07] rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">📑</div>
                <div className="font-mono-brand text-xs text-zinc-600 mb-4">clearcontract-analysis-2024-01-15.pdf</div>
                <div className="space-y-2 text-left mb-4">
                  {["Cover page with mode + date", "Clause-by-clause breakdown", "Risk flag explanations", "Legal disclaimer footer"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-zinc-500">
                      <svg className="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-semibold py-2.5 rounded-xl transition-colors">
                  ⬇ Download Analysis PDF
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase">// pricing</p>
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

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-indigo-500/20 bg-[#0e0e13] p-14 text-center overflow-hidden">
              <div className="absolute inset-0 hero-grid pointer-events-none opacity-60" />
              <p className="font-mono-brand text-indigo-400 text-xs tracking-widest mb-6 uppercase">// get_started</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Don&apos;t sign blind
              </h2>
              <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
                Thousands of people use ClearContract to understand what they&apos;re agreeing to
                before it&apos;s too late.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all btn-glow hover:-translate-y-0.5"
              >
                Analyze Your First Contract — Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-zinc-700 text-xs mt-4">No account required · 3 free analyses/month</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
