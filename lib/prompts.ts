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

const BASE_SYSTEM_PROMPT = `You are a contract analyst. For each clause in the contract, return a JSON array. Each item must follow this exact shape:
{
  "title": "short clause name",
  "plain": "2-3 sentence plain English explanation of what this clause means",
  "status": "standard" | "unusual" | "risk",
  "flag": "brief message explaining the concern, or null if none"
}

Rules:
- "standard" = common, expected clause with no special concern
- "unusual" = uncommon or one-sided but not necessarily harmful
- "risk" = potentially harmful; always set a non-null flag message
- Return ONLY a valid JSON array. No markdown, no prose, no code fences.
- If the contract is very long, focus on the most important 15-20 clauses.`;

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
