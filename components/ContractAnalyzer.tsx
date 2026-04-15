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
    <div className="space-y-5">
      {/* Form card */}
      <form onSubmit={handleSubmit} className="bg-[#111116] border border-white/[0.07] rounded-2xl p-6 space-y-6">

        {/* Mode selector */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Audience Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {(Object.entries(AUDIENCE_MODES) as [AudienceMode, typeof AUDIENCE_MODES[AudienceMode]][]).map(
              ([key, info]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border text-xs font-medium transition-all ${
                    mode === key
                      ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                      : "border-white/[0.07] hover:border-white/[0.15] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-lg">{info.icon}</span>
                  <span className="text-center leading-tight">{info.label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Input method toggle */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Contract Input
          </label>
          <div className="flex gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-1 w-fit mb-4">
            {(["paste", "upload"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setInputMethod(method)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  inputMethod === method
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "text-zinc-500 hover:text-zinc-300"
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
              className="w-full h-52 px-4 py-3 rounded-xl bg-[#0d0d11] border border-white/[0.07] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-colors"
              required={inputMethod === "paste"}
            />
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-white/[0.1] rounded-xl p-10 text-center cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <div className="space-y-1.5">
                  <div className="text-3xl">📄</div>
                  <p className="font-medium text-zinc-200 text-sm">{file.name}</p>
                  <p className="text-zinc-600 text-xs">
                    {(file.size / 1024).toFixed(1)} KB —{" "}
                    <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-red-400 hover:text-red-300 transition-colors">
                      Remove
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">⬆️</div>
                  <p className="font-medium text-zinc-400 text-sm">Click to upload a PDF</p>
                  <p className="text-zinc-600 text-xs">PDF files only · Max 10MB</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || (inputMethod === "paste" ? !text.trim() : !file)}
          className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/30 disabled:text-indigo-300/50 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing with Claude AI...
            </>
          ) : (
            "Analyze Contract"
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl p-4 flex gap-3">
          <span className="text-red-400 shrink-0">✗</span>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {clauses && clauses.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Analysis Results</h2>
              <div className="flex items-center gap-4 mt-1.5 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{standardCount} standard
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{unusualCount} unusual
                </span>
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />{riskCount} risk
                </span>
              </div>
            </div>
            <DownloadPDF clauses={clauses} mode={mode} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {clauses.map((clause, i) => (
              <ClauseCard key={i} clause={clause} />
            ))}
          </div>

          <p className="text-xs text-zinc-700 text-center pt-2">
            For informational purposes only. Not legal advice. Consult a qualified attorney for legal matters.
          </p>
        </div>
      )}
    </div>
  );
}
