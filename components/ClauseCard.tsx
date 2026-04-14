import type { ClauseResult } from "@/lib/prompts";

const STATUS_CONFIG = {
  standard: {
    label: "Standard",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  unusual: {
    label: "Unusual",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  risk: {
    label: "Risk",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

export function ClauseCard({ clause }: { clause: ClauseResult }) {
  const config = STATUS_CONFIG[clause.status] ?? STATUS_CONFIG.standard;

  return (
    <div
      className={`rounded-xl border ${config.border} ${config.bg} p-5 transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">
          {clause.title}
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${config.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{clause.plain}</p>

      {clause.flag && (
        <div className="mt-3 flex items-start gap-2 bg-white/70 rounded-lg px-3 py-2.5 border border-current/10">
          <span className="text-base shrink-0">
            {clause.status === "risk" ? "🚩" : "⚠️"}
          </span>
          <p className="text-sm font-medium text-gray-800">{clause.flag}</p>
        </div>
      )}
    </div>
  );
}
