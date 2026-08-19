import type { ClauseResult } from "@/lib/prompts";

/* Flat margin marks: the tier is a coloured rule down the left edge, and the
   plain-English meaning is the headline. The clause name is metadata. */
const TIER_CLASS = {
  standard: "cc-t-standard",
  unusual: "cc-t-unusual",
  risk: "cc-t-risk",
};

export function ClauseCard({ clause }: { clause: ClauseResult }) {
  const tier = TIER_CLASS[clause.status] ?? TIER_CLASS.standard;

  return (
    <article className={`cc-clause ${tier}`}>
      <div className="cc-c-meta">{clause.title}</div>
      <p className="cc-c-plain">{clause.plain}</p>
      {clause.flag && <p className="cc-c-note">{clause.flag}</p>}
    </article>
  );
}
