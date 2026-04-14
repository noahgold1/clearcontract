"use client";

import { useState, useRef } from "react";
import { ClauseCard } from "./ClauseCard";
import { DownloadPDF } from "./DownloadPDF";
import { AUDIENCE_MODES, type AudienceMode, type ClauseResult } from "@/lib/prompts";

type InputMethod = "paste" | "upload";

export function ContractAnalyzer() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("paste");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<AudienceMode>("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clauses, setClauses] = useState<ClauseResult[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setClauses(null);
    setLoading(true);

    try {
      let res: Response;

      if (inputMethod === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", mode);
        res = await fetch("/api/analyze", { method: "POST", body: formData });
      } else {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, mode }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setClauses(data.clauses);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const riskCount = clauses?.filter((c) => c.status === "risk").length ?? 0;
  const unusualCount = clauses?.filter((c) => c.status === "unusual").length ?? 0;
  const standardCount = clauses?.filter((c) => c.status === "standard").length ?? 0;

  return (
    <div className="space-y-6">
      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
      >
        {/* Audience mode selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Audience Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {(Object.entries(AUDIENCE_MODES) as [AudienceMode, (typeof AUDIENCE_MODES)[AudienceMode]][]).map(
              ([key, info]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border text-xs font-medium transition-all ${
                    mode === key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{info.icon}</span>
                  <span className="text-center leading-tight">{info.label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Input method toggle */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Contract Input
          </label>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit mb-4">
            {(["paste", "upload"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setInputMethod(method)}
                className={`px-5 py-2 text-sm font-medium transition-colors ${
                  inputMethod === method
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {method === "paste" ? "Paste Text" : "Upload PDF"}
              </button>
            ))}
          </div>

          {inputMethod === "paste" ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your contract text here..."
              className="w-full h-52 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required={inputMethod === "paste"}
            />
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <div className="space-y-1">
                  <div className="text-3xl">📄</div>
                  <p className="font-semibold text-gray-900 text-sm">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB —{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">⬆️</div>
                  <p className="font-medium text-gray-700 text-sm">
                    Click to upload a PDF
                  </p>
                  <p className="text-gray-400 text-xs">PDF files only. Max 10MB.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || (inputMethod === "paste" ? !text.trim() : !file)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyzing with Claude AI...
            </>
          ) : (
            "Analyze Contract"
          )}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex gap-3">
          <span className="text-red-500 text-lg shrink-0">✗</span>
          <p className="text-red-800 font-medium text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {clauses && clauses.length > 0 && (
        <div className="space-y-5">
          {/* Results header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
              <div className="flex items-center gap-4 mt-1.5 text-sm">
                <span className="flex items-center gap-1.5 text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {standardCount} standard
                </span>
                <span className="flex items-center gap-1.5 text-yellow-700">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  {unusualCount} unusual
                </span>
                <span className="flex items-center gap-1.5 text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {riskCount} risk
                </span>
              </div>
            </div>
            <DownloadPDF clauses={clauses} mode={mode} />
          </div>

          {/* Clause cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {clauses.map((clause, i) => (
              <ClauseCard key={i} clause={clause} />
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center pt-2">
            For informational purposes only. Not legal advice. Consult a qualified attorney for legal matters.
          </p>
        </div>
      )}
    </div>
  );
}
