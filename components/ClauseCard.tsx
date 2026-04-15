import type { ClauseResult } from "@/lib/prompts";

const STATUS_CONFIG = {
  standard: {
    label: "Standard",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.05]",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    dot: "bg-emerald-400",
    flagBg: "bg-emerald-500/[0.07]",
    flagText: "text-emerald-300/80",
  },
  unusual: {
    label: "Unusual",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.05]",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    dot: "bg-amber-400",
    flagBg: "bg-amber-500/[0.07]",
    flagText: "text-amber-300/80",
  },
  risk: {
    label: "Risk",
    border: "border-red-500/25",
    bg: "bg-red-500/[0.06]",
    badge: "bg-red-500/10 text-red-400 border border-red-500/20",
    dot: "bg-red-400",
    flagBg: "bg-red-500/[0.08]",
    flagText: "text-red-300/80",
  },
};

export function ClauseCard({ clause }: { clause: ClauseResult }) {
  const config = STATUS_CONFIG[clause.status] ?? STATUS_CONFIG.standard;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-5 hover:brightness-110 transition-all`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-zinc-100 text-sm leading-snug">{clause.title}</h3>
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${config.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed">{clause.plain}</p>

      {clause.flag && (
        <div className={`mt-3 flex items-start gap-2 ${config.flagBg} rounded-lg px-3 py-2.5`}>
          <span className="text-sm shrink-0">{clause.status === "risk" ? "🚩" : "⚠️"}</span>
          <p className={`text-xs font-medium ${config.flagText}`}>{clause.flag}</p>
        </div>
      )}
    </div>
  );
}
