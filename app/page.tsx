import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-24 px-5">
        {/* Glow */}
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Powered by Claude AI
          </div>

          <h1 className="text-5xl md:text-[68px] font-black text-white tracking-tight leading-[1.05] mb-6">
            Understand any contract
            <br />
            <span className="text-gradient">in plain English</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste your contract or upload a PDF. ClearContract breaks every clause into a
            simple explanation, flags unusual terms, and highlights real risks — in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
            >
              Analyze a Contract Free
            </Link>
            <Link
              href="/pricing"
              className="border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-5 text-sm text-zinc-600">
            3 free analyses per month · No credit card required
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-white/[0.06] py-5 px-5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-zinc-500 text-sm font-medium">
          {["Freelancers", "Tenants", "Startup Founders", "Job Seekers", "Small Businesses"].map((label) => (
            <span key={label} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From legalese to plain English in 3 steps
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto">
              No law degree required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: "01", icon: "📋", title: "Paste or upload", desc: "Paste your contract text or upload a PDF — lease agreements, freelance contracts, employment offers, term sheets, and more." },
              { step: "02", icon: "🎯", title: "Choose your audience", desc: "Select your role — Freelancer, Tenant, Founder, Employee, or General. Claude tailors the analysis to the risks that matter most to you." },
              { step: "03", icon: "✅", title: "Get your breakdown", desc: "Every clause is explained in plain English with a color-coded risk badge. Download as PDF or share with your team." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="relative bg-[#111116] border border-white/[0.07] rounded-2xl p-7 hover:border-indigo-500/30 transition-colors group">
                <div className="text-xs font-bold text-indigo-400/60 mb-4 tracking-widest">{step}</div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to sign with confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🔍", title: "Clause-by-clause breakdown", desc: "Every clause explained in 2-3 plain-English sentences — not a 10-page summary." },
              { icon: "🚩", title: "Risk flagging", desc: "Unusual or one-sided clauses are automatically highlighted with a clear explanation of why they matter." },
              { icon: "👥", title: "5 audience modes", desc: "Tailored analysis for Freelancers, Tenants, Founders, Employees, and General use." },
              { icon: "📄", title: "PDF upload support", desc: "Upload any PDF contract. We extract the text and analyze it automatically." },
              { icon: "⬇️", title: "Download as PDF", desc: "Export your full analysis as a formatted PDF to share with advisors or keep on file." },
              { icon: "🔒", title: "Secure and private", desc: "Your contracts are never stored permanently or used for training. Analyze with confidence." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#111116] border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.12] transition-colors">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-5 border-t border-white/[0.06]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400">Start free. Upgrade when you need more.</p>
          </div>
          <PricingTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-[#111116] border border-indigo-500/20 rounded-3xl p-14 overflow-hidden">
            <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
              Don&apos;t sign without understanding
            </h2>
            <p className="text-zinc-400 text-lg mb-8 relative">
              Know exactly what you&apos;re agreeing to before you sign.
            </p>
            <Link
              href="/app"
              className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 relative"
            >
              Analyze Your First Contract Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
