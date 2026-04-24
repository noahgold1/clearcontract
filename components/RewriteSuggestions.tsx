"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import type { RewriteSuggestion } from "@/app/api/rewrite/route";

interface Props {
  onRequest: () => void;
  loading: boolean;
  error: string | null;
  suggestions: RewriteSuggestion[] | null;
}

export function RewriteSuggestions({ onRequest, loading, error, suggestions }: Props) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function copy(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="mt-4 bg-gradient-to-br from-indigo-500/[0.06] via-violet-500/[0.04] to-transparent border border-indigo-500/25 rounded-2xl p-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest font-mono-brand">
              Business · AI Rewrite
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Rewrite this contract to reduce your risk
          </h3>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl leading-relaxed">
            Claude suggests replacement language for the highest-risk clauses — things a
            reasonable counterparty would actually accept. Copy, paste into your reply,
            ship.
          </p>
        </div>
        {!suggestions && !loading && (
          <button
            type="button"
            onClick={onRequest}
            className="shrink-0 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/30 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate rewrites
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-5 flex items-center gap-3 text-indigo-300 text-sm">
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

      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 space-y-4">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.07] bg-[#0d0d11] p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-white">{s.clause}</h4>
                <button
                  type="button"
                  onClick={() => copy(s.rewritten, i)}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-2.5 py-1 rounded-md transition-colors"
                >
                  {copiedIdx === i ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy rewrite
                    </>
                  )}
                </button>
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
                  <span className="text-indigo-400 font-semibold">Why: </span>
                  {s.why}
                </p>
              </div>
            </div>
          ))}

          <p className="text-[11px] text-zinc-600 text-center pt-1">
            These are drafting suggestions, not legal advice. Have a qualified attorney
            review before you send anything back to the counterparty.
          </p>
        </div>
      )}
    </div>
  );
}
