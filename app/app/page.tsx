import { ContractAnalyzer } from "@/components/ContractAnalyzer";

export default function AppPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-8 flex items-start gap-3">
        <span className="text-amber-500 mt-0.5 text-lg">⚠️</span>
        <p className="text-amber-800 text-sm">
          <strong>For informational purposes only. Not legal advice.</strong> ClearContract
          helps you understand contract language, but is not a substitute for advice from a
          qualified attorney.
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contract Analyzer</h1>
        <p className="text-gray-500 mt-1">
          Paste your contract or upload a PDF to get a plain-English breakdown.
        </p>
      </div>

      <ContractAnalyzer />
    </div>
  );
}
