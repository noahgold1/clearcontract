import { ContractAnalyzer } from "@/components/ContractAnalyzer";

export default function AppPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {/* Disclaimer */}
      <div className="bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-5 py-3 mb-8 flex items-start gap-3">
        <span className="text-amber-400 mt-0.5 shrink-0">⚠️</span>
        <p className="text-amber-200/70 text-sm">
          <strong className="text-amber-200/90">For informational purposes only. Not legal advice.</strong>{" "}
          ClearContract helps you understand contract language but is not a substitute for advice from a qualified attorney.
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Contract Analyzer</h1>
        <p className="text-zinc-500 mt-1.5 text-sm">
          Paste your contract or upload a PDF to get a plain-English breakdown of every clause.
        </p>
      </div>

      <ContractAnalyzer />
    </div>
  );
}
