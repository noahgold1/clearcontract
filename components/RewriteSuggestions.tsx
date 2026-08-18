"use client";

import { useState, useMemo } from "react";
import { Sparkles, Check, X, RotateCcw, Download, Copy } from "lucide-react";
import type { RewriteSuggestion } from "@/app/api/rewrite/route";

type Decision = "pending" | "accepted" | "rejected";

interface Props {
  contractText: string;
  onRequest: () => void;
  loading: boolean;
  error: string | null;
  suggestions: RewriteSuggestion[] | null;
}

export function RewriteSuggestions({
  contractText,
  onRequest,
  loading,
  error,
  suggestions,
}: Props) {
  const [decisions, setDecisions] = useState<Record<number, Decision>>({});
  const [applied, setApplied] = useState<null | {
    text: string;
    applied: number[];
    failed: { idx: number; clause: string }[];
  }>(null);
  const [allCopied, setAllCopied] = useState(false);

  const accepted = useMemo(
    () =>
      suggestions
        ? suggestions
            .map((s, i) => ({ s, i }))
            .filter(({ i }) => decisions[i] === "accepted")
        : [],
    [suggestions, decisions]
  );

  function setDecision(i: number, d: Decision) {
    setDecisions((prev) => ({ ...prev, [i]: d }));
  }

  function resetReview() {
    setDecisions({});
    setApplied(null);
  }

  function applyChanges() {
    if (!suggestions) return;
    let text = contractText;
    const appliedIdxs: number[] = [];
    const failed: { idx: number; clause: string }[] = [];

    accepted.forEach(({ s, i }) => {
      // Try exact substring match first. If the AI's `original` quote was
      // copied verbatim from the contract this works cleanly.
      const exactIdx = text.indexOf(s.original);
      if (exactIdx !== -1) {
        text = text.slice(0, exactIdx) + s.rewritten + text.slice(exactIdx + s.original.length);
        appliedIdxs.push(i);
        return;
      }

      // Whitespace-tolerant match: collapse runs of whitespace on both sides.
      const norm = (t: string) => t.replace(/\s+/g, " ").trim();
      const haystack = norm(text);
      const needle = norm(s.original);
      const hIdx = haystack.indexOf(needle);
      if (hIdx !== -1) {
        // Map normalized index back to a best-effort range in the original
        // text. We just replace the first occurrence by regex with flexible
        // whitespace.
        const flexible = s.original
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // escape regex
          .replace(/\s+/g, "\\s+");
        const re = new RegExp(flexible, "m");
        if (re.test(text)) {
          text = text.replace(re, s.rewritten);
          appliedIdxs.push(i);
          return;
        }
      }

      failed.push({ idx: i, clause: s.clause });
    });

    setApplied({ text, applied: appliedIdxs, failed });
  }

  async function copyAll() {
    if (!applied) return;
    try {
      await navigator.clipboard.writeText(applied.text);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  function download() {
    if (!applied) return;
    const blob = new Blob([applied.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contract-rewritten.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const acceptedCount = accepted.length;
  const rejectedCount = Object.values(decisions).filter((d) => d === "rejected").length;
  const pendingCount = (suggestions?.length ?? 0) - acceptedCount - rejectedCount;

  return (
    <div className="mt-4 bg-gradient-to-br from-white/10/[0.06] via-white/5/[0.04] to-transparent border border-white/25 rounded-2xl p-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-zinc-200" />
            <span className="text-[11px] font-bold text-zinc-200 uppercase tracking-widest font-mono-brand">
              Business · AI Rewrite
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Rewrite this contract to reduce your risk
          </h3>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl leading-relaxed">
            Claude proposes safer language for the highest-risk clauses. Accept or reject
            each change, then apply, we merge the accepted edits into your contract text.
          </p>
        </div>
        {!suggestions && !loading && (
          <button
            type="button"
            onClick={onRequest}
            className="shrink-0 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-black/20 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate rewrites
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-5 flex items-center gap-3 text-zinc-200 text-sm">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Claude is drafting safer language for you…
        </div>
      )}

      {error && (
        <div className="mt-5 bg-red-500/[0.08] border border-red-500/20 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Review step, per-suggestion accept/reject */}
      {suggestions && suggestions.length > 0 && !applied && (
        <>
          <div className="mt-6 space-y-4">
            {suggestions.map((s, i) => {
              const d = decisions[i] ?? "pending";
              const cardBorder =
                d === "accepted"
                  ? "border-emerald-500/40 bg-emerald-500/[0.03]"
                  : d === "rejected"
                  ? "border-red-500/30 bg-red-500/[0.02] opacity-60"
                  : "border-white/[0.07] bg-[#0d0d11]";

              return (
                <div
                  key={i}
                  className={`rounded-xl border p-5 space-y-3 transition-colors ${cardBorder}`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      {s.clause}
                      {d === "accepted" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          Accepted
                        </span>
                      )}
                      {d === "rejected" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                          Rejected
                        </span>
                      )}
                    </h4>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDecision(i, d === "accepted" ? "pending" : "accepted")
                        }
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                          d === "accepted"
                            ? "bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-400"
                            : "text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDecision(i, d === "rejected" ? "pending" : "rejected")
                        }
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                          d === "rejected"
                            ? "bg-red-500 text-white border-red-400 hover:bg-red-400"
                            : "text-red-300 border-red-500/30 hover:bg-red-500/10"
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/80 font-mono-brand mb-1.5">
                      Original
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                      &ldquo;{s.original}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90 font-mono-brand mb-1.5">
                      Suggested rewrite
                    </p>
                    <p className="text-sm text-zinc-200 leading-relaxed">{s.rewritten}</p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.05]">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      <span className="text-zinc-200 font-semibold">Why: </span>
                      {s.why}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review-summary bar */}
          <div className="mt-5 flex items-center justify-between gap-4 flex-wrap bg-[#0d0d11] border border-white/[0.07] rounded-xl px-4 py-3">
            <div className="text-xs text-zinc-400 flex items-center gap-4 flex-wrap font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {acceptedCount} accepted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {rejectedCount} rejected
              </span>
              <span className="flex items-center gap-1.5 text-zinc-600">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                {pendingCount} pending
              </span>
            </div>
            <button
              type="button"
              onClick={applyChanges}
              disabled={acceptedCount === 0}
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 disabled:bg-white/20 disabled:text-zinc-400 text-zinc-950 font-semibold text-sm px-4 py-2 rounded-lg shadow-lg shadow-black/20 disabled:shadow-none transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Apply {acceptedCount || 0} {acceptedCount === 1 ? "change" : "changes"}
            </button>
          </div>
        </>
      )}

      {/* Merged-contract view */}
      {applied && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 font-mono-brand mb-1">
                Updated contract
              </p>
              <p className="text-sm text-zinc-400">
                {applied.applied.length}{" "}
                {applied.applied.length === 1 ? "change merged" : "changes merged"} into
                your contract text.
                {applied.failed.length > 0 &&
                  ` ${applied.failed.length} couldn't be auto-merged, see below.`}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 px-3 py-1.5 rounded-md transition-colors"
              >
                {allCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy all
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 px-3 py-1.5 rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download .txt
              </button>
              <button
                type="button"
                onClick={resetReview}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-white/[0.1] hover:border-white/[0.2] px-3 py-1.5 rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start over
              </button>
            </div>
          </div>

          {applied.failed.length > 0 && (
            <div className="bg-amber-500/[0.07] border border-amber-500/30 rounded-xl p-4 text-amber-200/80 text-xs leading-relaxed">
              <p className="font-semibold text-amber-200 mb-2">
                ⚠️ Couldn&apos;t auto-merge these, the AI&apos;s quoted text didn&apos;t
                match your contract exactly (usually a spacing or quote-character
                difference). Copy them in manually:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {applied.failed.map(({ idx, clause }) => (
                  <li key={idx}>{clause}</li>
                ))}
              </ul>
            </div>
          )}

          <textarea
            readOnly
            value={applied.text}
            className="w-full h-80 px-4 py-3 rounded-xl bg-[#0d0d11] border border-white/[0.07] text-sm text-zinc-200 font-mono leading-relaxed resize-vertical focus:outline-none focus:border-white/40"
          />
        </div>
      )}

      <p className="text-[11px] text-zinc-600 text-center pt-4">
        Drafting suggestions, not legal advice. Have a qualified attorney review anything
        before you send it back to the counterparty.
      </p>
    </div>
  );
}
