import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, type AudienceMode, type ClauseResult } from "@/lib/prompts";
import { extractTextFromPDF, truncateToTokenLimit } from "@/lib/pdf-utils";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let contractText = "";
    let mode: AudienceMode = "general";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      mode = (formData.get("mode") as AudienceMode) ?? "general";
      const file = formData.get("file") as File | null;
      const pastedText = formData.get("text") as string | null;

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        contractText = await extractTextFromPDF(buffer);
      } else if (pastedText) {
        contractText = pastedText;
      }
    } else {
      const body = await req.json();
      mode = body.mode ?? "general";
      contractText = body.text ?? "";
    }

    if (!contractText.trim()) {
      return NextResponse.json(
        { error: "No contract text provided." },
        { status: 400 }
      );
    }

    const truncated = truncateToTokenLimit(contractText);
    const systemPrompt = buildSystemPrompt(mode);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 8096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Here is the contract to analyze:\n\n${truncated}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip any accidental markdown fences before parsing
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let clauses: ClauseResult[];
    try {
      clauses = JSON.parse(cleaned);
      if (!Array.isArray(clauses)) throw new Error("Not an array");
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ clauses });
  } catch (err: unknown) {
    console.error("[analyze] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
