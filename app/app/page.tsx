import type { Metadata } from "next";
import { Suspense } from "react";
import { ContractAnalyzer } from "@/components/ContractAnalyzer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UpgradeBanner } from "@/components/UpgradeBanner";

export const metadata: Metadata = {
  title: "Analyze a Contract",
  description:
    "Paste your contract or upload a PDF. ClearContract uses Claude AI to explain every clause in plain English and flag anything risky — in seconds.",
  alternates: {
    canonical: "https://clearcontract-two.vercel.app/app",
  },
};

export default function AppPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="flex-1 py-12 px-5">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest font-mono-brand mb-3">
              // contract_analyzer
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-display mb-2">
              Analyze Your Contract
            </h1>
            <p className="text-zinc-500 text-sm max-w-lg">
              Paste your contract or upload a PDF. Claude AI breaks every clause into plain English, flags risks, and tells you what to watch out for.
            </p>
          </div>

          {/* Upgrade banner (shown when routed from pricing page) */}
          <Suspense fallback={null}>
            <UpgradeBanner />
          </Suspense>

          {/* Disclaimer */}
          <div className="bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-5 py-3 mb-8 flex items-start gap-3">
            <span className="text-amber-400 mt-0.5 shrink-0 text-sm">⚠</span>
            <p className="text-amber-200/70 text-sm">
              <strong className="text-amber-200/90">For informational purposes only. Not legal advice.</strong>{" "}
              ClearContract helps you understand contract language but is not a substitute for advice from a qualified attorney.
            </p>
          </div>

          <ContractAnalyzer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
