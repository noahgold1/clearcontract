export type AudienceMode =
  | "freelancer"
  | "tenant"
  | "founder"
  | "employment"
  | "general";

export const AUDIENCE_MODES: Record<
  AudienceMode,
  { label: string; description: string; icon: string }
> = {
  freelancer: {
    label: "Freelancer / Contractor",
    description: "IP assignment, non-competes, payment terms",
    icon: "💼",
  },
  tenant: {
    label: "Tenant / Renter",
    description: "Deposits, maintenance, early termination",
    icon: "🏠",
  },
  founder: {
    label: "Founder / Startup",
    description: "Dilution, liquidation preferences, board control",
    icon: "🚀",
  },
  employment: {
    label: "Employee",
    description: "At-will, non-competes, IP assignment, arbitration",
    icon: "👔",
  },
  general: {
    label: "General",
    description: "Plain-English explanation for anyone",
    icon: "📄",
  },
};

const BASE_SYSTEM_PROMPT = `You are a contract analyst. Your job is to shrink a contract: say what each clause does to the person signing it, in as few words as possible. Return a JSON array. Each item must follow this exact shape:
{
  "title": "short clause name, 1-4 words",
  "plain": "one sentence, 20 words or fewer, saying what this clause does to the signer",
  "status": "standard" | "unusual" | "risk",
  "flag": "one sentence, 15 words or fewer, saying why it matters, or null"
}

Rules:
- Write like you are telling a friend, not a lawyer. No legal terms unless you explain them.
- Include specific numbers from the contract (amounts, days, months) when they matter.
- "standard" = common, expected clause with no special concern. flag is null.
- "unusual" = uncommon or one-sided but not necessarily harmful.
- "risk" = takes money, work, or rights from the signer; always set a non-null flag.
- Fold routine boilerplate (governing law, notices, severability, entire agreement, headings) into at most two "standard" items.
- Return ONLY a valid JSON array. No markdown, no prose, no code fences.
- If the contract is very long, cover the 15 clauses that matter most.`;

const MODE_ADDITIONS: Record<AudienceMode, string> = {
  freelancer:
    "Focus on IP assignment (work-for-hire), non-compete and non-solicitation clauses, payment terms and late fees, kill fees, termination rights, and indemnification — all from a contractor's perspective.",
  tenant:
    "Focus on security deposit terms and conditions for return, maintenance and repair duties, early termination penalties, landlord access rights, rent increase provisions, and subletting restrictions.",
  founder:
    "Focus on dilution and anti-dilution provisions, liquidation preferences and participation rights, board control and drag-along rights, investor veto rights (protective provisions), founder vesting, and right-of-first-refusal clauses.",
  employment:
    "Focus on at-will employment clauses, non-compete and non-solicitation scope and duration, IP assignment of personal projects created outside work hours, mandatory arbitration, severance terms, and equity vesting cliffs.",
  general:
    "Explain all clauses clearly for a non-lawyer. Highlight anything that limits rights, requires payment, or imposes obligations on the signing party.",
};

export function buildSystemPrompt(mode: AudienceMode): string {
  return `${BASE_SYSTEM_PROMPT}\n\n${MODE_ADDITIONS[mode]}`;
}

export interface ClauseResult {
  title: string;
  plain: string;
  status: "standard" | "unusual" | "risk";
  flag: string | null;
}
