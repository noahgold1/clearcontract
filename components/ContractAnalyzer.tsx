"use client";

import { useState, useRef } from "react";
import { ClauseCard } from "./ClauseCard";
import { DownloadPDF } from "./DownloadPDF";
import { RewriteSuggestions } from "./RewriteSuggestions";
import { AUDIENCE_MODES, type AudienceMode, type ClauseResult } from "@/lib/prompts";
import type { RewriteSuggestion } from "@/app/api/rewrite/route";

type InputMethod = "paste" | "upload" | "photo";
type FilterStatus = "all" | "risk" | "unusual" | "standard";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111116] p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-3.5 w-2/5 bg-white/[0.07] rounded" />
        <div className="h-5 w-16 bg-white/[0.07] rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-full bg-white/[0.05] rounded" />
        <div className="h-2.5 w-5/6 bg-white/[0.05] rounded" />
        <div className="h-2.5 w-4/6 bg-white/[0.05] rounded" />
      </div>
    </div>
  );
}

export function ContractAnalyzer() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("paste");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<AudienceMode>("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clauses, setClauses] = useState<ClauseResult[] | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Rewrite feature (Business tier)
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);
  const [rewrites, setRewrites] = useState<RewriteSuggestion[] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setPhoto(f);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setClauses(null);
    setRewrites(null);
    setRewriteError(null);
    setFilter("all");
    setLoading(true);

    try {
      let res: Response;
      if (inputMethod === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", mode);
        res = await fetch("/api/analyze", { method: "POST", body: formData });
      } else if (inputMethod === "photo" && photo) {
        const formData = new FormData();
        formData.append("photo", photo);
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
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setClauses(data.clauses);
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRewrite() {
    // Rewrite needs the contract text. For paste input we have it directly;
    // for uploads/photos, the server already extracted it during analysis but
    // we don't keep a copy client-side. So only enable rewrite for pasted text.
    if (!text.trim()) {
      setRewriteError(
        "Rewrite currently needs pasted contract text. Paste your contract into the Paste tab and run a fresh analysis to enable this."
      );
      return;
    }
    setRewriteLoading(true);
    setRewriteError(null);
    setRewrites(null);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRewriteError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setRewrites(data.suggestions);
    } catch {
      setRewriteError("Network error. Check your connection and try again.");
    } finally {
      setRewriteLoading(false);
    }
  }

  const riskCount = clauses?.filter((c) => c.status === "risk").length ?? 0;
  const unusualCount = clauses?.filter((c) => c.status === "unusual").length ?? 0;
  const standardCount = clauses?.filter((c) => c.status === "standard").length ?? 0;
  const totalCount = clauses?.length ?? 0;

  const filteredClauses = clauses?.filter((c) => filter === "all" || c.status === filter) ?? [];

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const filterTabs: {
    key: FilterStatus;
    label: string;
    count: number;
    color: string;
    active: string;
  }[] = [
    { key: "all", label: "All", count: totalCount, color: "text-zinc-400", active: "bg-white/[0.08] text-white border-white/[0.15]" },
    { key: "risk", label: "Risk", count: riskCount, color: "text-red-400", active: "bg-red-500/10 text-red-300 border-red-500/30" },
    { key: "unusual", label: "Unusual", count: unusualCount, color: "text-amber-400", active: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
    { key: "standard", label: "Standard", count: standardCount, color: "text-emerald-400", active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  ];

  const inputMethodTabs: { key: InputMethod; label: string }[] = [
    { key: "paste", label: "Paste Text" },
    { key: "upload", label: "Upload PDF" },
    { key: "photo", label: "📷 Photo" },
  ];

  const submitDisabled =
    loading ||
    (inputMethod === "paste"
      ? !text.trim()
      : inputMethod === "upload"
      ? !file
      : !photo);

  return (
    <div className="space-y-5">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111116] border border-white/[0.07] rounded-2xl p-6 space-y-6"
      >
        {/* Mode selector */}
        <div>
          <label className="hidden sm:block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 font-mono-brand">
            // audience_mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {(
              Object.entries(AUDIENCE_MODES) as [
                AudienceMode,
                (typeof AUDIENCE_MODES)[AudienceMode]
              ][]
            ).map(([key, info]) => (
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
            ))}
          </div>
        </div>

        {/* Input method */}
        <div>
          <label className="hidden sm:block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 font-mono-brand">
            // contract_input
          </label>
          <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-1 mb-4">
            {inputMethodTabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setInputMethod(key)}
                className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                  inputMethod === key
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {inputMethod === "paste" && (
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your contract text here..."
                className="w-full h-52 px-4 py-3 rounded-xl bg-[#0d0d11] border border-white/[0.07] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-colors pb-8"
              />
              <div className="absolute bottom-2.5 right-3 flex items-center gap-2 pointer-events-none">
                {charCount > 0 && (
                  <>
                    <span className="text-[10px] text-zinc-600 font-mono-brand">
                      {wordCount.toLocaleString()} words
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-[10px] text-zinc-600 font-mono-brand">
                      {charCount.toLocaleString()} chars
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {inputMethod === "upload" && (
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
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

          {inputMethod === "photo" && (
            <div
              onClick={() => photoInputRef.current?.click()}
              className="border border-dashed border-white/[0.1] rounded-xl p-10 text-center cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all"
            >
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                // `capture="environment"` hints mobile browsers to open the
                // rear camera directly. Desktop browsers ignore it and open
                // the standard file picker.
                capture="environment"
                className="hidden"
                onChange={handlePhotoChange}
              />
              {photo && photoPreview ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Contract preview"
                    className="max-h-64 mx-auto rounded-lg border border-white/[0.07]"
                  />
                  <p className="text-zinc-500 text-xs">
                    {photo.name} · {(photo.size / 1024).toFixed(1)} KB —{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhoto(null);
                        if (photoPreview) URL.revokeObjectURL(photoPreview);
                        setPhotoPreview(null);
                        if (photoInputRef.current) photoInputRef.current.value = "";
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">📸</div>
                  <p className="font-medium text-zinc-400 text-sm">Take or upload a photo</p>
                  <p className="text-zinc-600 text-xs">
                    JPG, PNG, WEBP · Max 10MB · Make sure the text is legible
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitDisabled}
          className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/30 disabled:text-indigo-300/40 text-white font-semibold py-3.5 rounded-xl text-sm transition-all btn-glow flex items-center justify-center gap-2"
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
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Analyze Contract
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl p-4 flex gap-3 items-start">
          <span className="text-red-400 shrink-0 mt-0.5">✗</span>
          <p className="text-red-300 text-sm leading-relaxed">{error}</p>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 py-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
            <span className="text-zinc-500 text-sm">Reading your contract...</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {clauses && clauses.length > 0 && (
        <div className="space-y-5" ref={resultsRef}>
          {/* Results header */}
          <div className="flex items-start justify-between flex-wrap gap-3 pt-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="hidden sm:inline text-[11px] font-semibold text-zinc-500 uppercase tracking-widest font-mono-brand">
                  // results
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-display">Analysis Complete</h2>
              <div className="flex items-center gap-4 mt-1.5 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {standardCount} standard
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {unusualCount} unusual
                </span>
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {riskCount} risk
                </span>
              </div>
            </div>
            <DownloadPDF clauses={clauses} mode={mode} />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  filter === tab.key
                    ? tab.active
                    : "border-white/[0.07] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300"
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] font-bold tabular-nums ${filter === tab.key ? "" : "text-zinc-600"}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Clause grid */}
          {filteredClauses.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredClauses.map((clause, i) => (
                <ClauseCard key={i} clause={clause} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-600 text-sm">
              No {filter} clauses found.
            </div>
          )}

          {/* Business-only rewrite feature */}
          <RewriteSuggestions
            onRequest={handleRewrite}
            loading={rewriteLoading}
            error={rewriteError}
            suggestions={rewrites}
          />

          <p className="text-xs text-zinc-700 text-center pt-2">
            For informational purposes only. Not legal advice. Consult a qualified attorney
            for legal matters.
          </p>
        </div>
      )}
    </div>
  );
}
