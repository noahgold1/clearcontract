import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Powered by Claude AI
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Understand any contract
            <br />
            <span className="text-blue-600">in plain English</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste your contract or upload a PDF. ClearContract breaks every clause into a
            simple explanation, flags unusual terms, and highlights real risks — in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-blue-200"
            >
              Analyze a Contract Free
            </Link>
            <Link
              href="/pricing"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl text-lg transition-colors border border-gray-200 shadow-sm"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            3 free analyses per month — no credit card required
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-gray-100 py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-gray-400 text-sm font-medium">
          {["Freelancers", "Tenants", "Startup Founders", "Job Seekers", "Small Business Owners"].map(
            (label) => (
              <span key={label} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {label}
              </span>
            )
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From legalese to plain English in 3 steps
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No law degree required. No reading between the lines.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📋",
                title: "Paste or upload",
                desc: "Paste your contract text or upload a PDF. We accept lease agreements, freelance contracts, employment offers, term sheets, and more.",
              },
              {
                step: "2",
                icon: "🎯",
                title: "Choose your audience",
                desc: "Select your role — Freelancer, Tenant, Founder, Employee, or General. Claude tailors the analysis to the risks that matter most to you.",
              },
              {
                step: "3",
                icon: "✅",
                title: "Get your breakdown",
                desc: "Every clause is explained in plain English with a color-coded risk badge. Download as PDF or share with your team.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div
                key={step}
                className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {step}
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to sign with confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Clause-by-clause breakdown",
                desc: "Every clause explained in 2-3 plain-English sentences — not a 10-page summary.",
              },
              {
                icon: "🚩",
                title: "Risk flagging",
                desc: "Unusual or one-sided clauses are automatically highlighted with a clear explanation of why they matter.",
              },
              {
                icon: "👥",
                title: "5 audience modes",
                desc: "Tailored analysis for Freelancers, Tenants, Founders, Employees, and General use.",
              },
              {
                icon: "📄",
                title: "PDF upload support",
                desc: "Upload any PDF contract. We extract the text and analyze it automatically.",
              },
              {
                icon: "⬇️",
                title: "Download as PDF",
                desc: "Export your full analysis as a formatted PDF to share with advisors or keep on file.",
              },
              {
                icon: "🔒",
                title: "Secure and private",
                desc: "Your contracts are never stored permanently or used for training. Analyze with confidence.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-500">
              Start free. Upgrade when you need more.
            </p>
          </div>
          <PricingTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t sign without understanding
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of people who use ClearContract to know exactly what
            they&apos;re agreeing to.
          </p>
          <Link
            href="/app"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-block shadow-lg"
          >
            Analyze Your First Contract Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
