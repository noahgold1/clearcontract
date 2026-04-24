import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { type AudienceMode } from "@/lib/prompts";
import { truncateToTokenLimit } from "@/lib/pdf-utils";

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const VALID_MODES: AudienceMode[] = ["freelancer", "tenant", "founder", "employment", "general"];

export interface RewriteSuggestion {
  clause: string;
  original: string;
  rewritten: string;
  why: string;
}

const REWRITE_SYSTEM = `You are a contract negotiation assistant helping the signing party reduce their own risk. Given a contract, identify the 4-6 highest-risk or most one-sided clauses and propose a rewrite for each.

For each suggestion return an object:
{
  "clause": "short name of the clause",
  "original": "the exact risky language from the contract, quoted verbatim (max 400 chars)",
  "rewritten": "your proposed replacement language — specific, enforceable, balanced",
  "why": "one sentence explaining how this rewrite reduces the signer's risk"
}

Return ONLY a JSON array of these objects. No markdown, no prose, no code fences.

Prioritize: overbroad IP assignment, one-sided indemnification, unlimited liability, unilateral termination, auto-renewal with short notice windows, non-competes with excessive scope, and payment terms worse than industry standard.

Keep rewrites realistic — changes a reasonable counterparty would actually accept, not pie-in-the-sky asks.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMode = body.mode as string;
    const mode: AudienceMode = VALID_MODES.includes(rawMode as AudienceMode)
      ? (rawMode as AudienceMode)
      : "general";
    const contractText: string = (body.text ?? "").trim();

    if (!contractText || contractText.length < 50) {
      return NextResponse.json(
        { error: "Not enough contract text to rewrite." },
        { status: 400 }
      );
    }

    const truncated = truncateToTokenLimit(contractText);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system: `${REWRITE_SYSTEM}\n\nThe signer's role: ${mode}.`,
      messages: [
        {
          role: "user",
          content: `Contract:\n\n${truncated}\n\nReturn the JSON array of rewrite suggestions.`,
        },
      ],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let suggestions: RewriteSuggestion[];
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) throw new Error("not an array");
      suggestions = parsed
        .filter(
          (s) =>
            s &&
            typeof s === "object" &&
            s.clause &&
            s.original &&
            s.rewritten &&
            s.why
        )
        .map((s) => ({
          clause: String(s.clause).slice(0, 200),
          original: String(s.original).slice(0, 800),
          rewritten: String(s.rewritten).slice(0, 1200),
          why: String(s.why).slice(0, 400),
        }));
    } catch {
      console.error("[rewrite] JSON parse failed. Raw:", rawText.slice(0, 500));
      return NextResponse.json(
        { error: "The AI returned an unexpected format. Please try again." },
        { status: 502 }
      );
    }

    if (suggestions.length === 0) {
      return NextResponse.json(
        { error: "No rewrite suggestions generated." },
        { status: 422 }
      );
    }

    return NextResponse.json({ suggestions });
  } catch (err: unknown) {
    console.error("[rewrite] error:", err);
    if (err instanceof Anthropic.APIError) {
      if (err.status === 401)
        return NextResponse.json({ error: "AI service configuration error." }, { status: 500 });
      if (err.status === 429)
        return NextResponse.json(
          { error: "Too many requests. Please wait and try again." },
          { status: 429 }
        );
    }
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
