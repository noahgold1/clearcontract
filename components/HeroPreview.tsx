import { BorderBeam } from "./ui/border-beam";

export function HeroPreview() {
  const clauses = [
    {
      title: "IP Assignment — Work for Hire",
      plain:
        "All work you create belongs entirely to the client, including anything built outside of work hours if it relates to their business.",
      status: "risk" as const,
      flag: "Overly broad — covers work done on personal time.",
    },
    {
      title: "Payment Terms",
      plain:
        "You will be paid net-60 from invoice receipt. No late fees are specified for delayed payment.",
      status: "unusual" as const,
      flag: "Net-60 is twice the freelancer standard of net-30.",
    },
    {
      title: "Governing Law",
      plain:
        "Any disputes will be resolved under the laws of Delaware, regardless of where you are located.",
      status: "standard" as const,
      flag: null,
    },
  ];

  const statusConfig = {
    standard: {
      label: "Standard",
      dot: "bg-emerald-400",
      badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    unusual: {
      label: "Unusual",
      dot: "bg-amber-400",
      badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    risk: {
      label: "Risk",
      dot: "bg-red-400",
      badge: "text-red-400 bg-red-500/10 border-red-400/20",
    },
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Window chrome */}
      <div className="relative rounded-2xl border border-white/[0.1] bg-[#0e0e13] shadow-2xl shadow-indigo-950/40 overflow-hidden">
        <BorderBeam size={250} duration={12} colorFrom="#818cf8" colorTo="#a855f7" />

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0a0a0f]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] text-zinc-600 font-mono-brand">
              freelancer_contract.pdf
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-dot" />
            <span className="text-[10px] text-indigo-400 font-medium">Analyzing</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex divide-x divide-white/[0.06] border-b border-white/[0.06]">
          {[
            { label: "Standard", count: 1, color: "text-emerald-400" },
            { label: "Unusual", count: 1, color: "text-amber-400" },
            { label: "Risk", count: 1, color: "text-red-400" },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 py-2 text-center">
              <div className={`text-base font-bold ${color}`}>{count}</div>
              <div className="text-[10px] text-zinc-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Clause cards */}
        <div className="p-3 space-y-2">
          {clauses.map((clause) => {
            const cfg = statusConfig[clause.status];
            return (
              <div
                key={clause.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-[11px] font-semibold text-zinc-200 leading-tight">
                    {clause.title}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}
                  >
                    <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">{clause.plain}</p>
                {clause.flag && (
                  <div className="mt-1.5 flex items-start gap-1">
                    <span className="text-[10px]">⚑</span>
                    <p className="text-[10px] text-zinc-500 italic">{clause.flag}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="px-3 pb-3 flex items-center gap-2">
          <button className="flex-1 text-[11px] font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 py-1.5 rounded-lg border border-indigo-500/20 transition-colors">
            ⬇ Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
