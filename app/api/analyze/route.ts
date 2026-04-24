import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, type AudienceMode, type ClauseResult } from "@/lib/prompts";
import { extractTextFromPDF, truncateToTokenLimit } from "@/lib/pdf-utils";

export const maxDuration = 60; // Vercel max for hobby plan

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const VALID_MODES: AudienceMode[] = ["freelancer", "tenant", "founder", "employment", "general"];

type ImagePayload = {
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  base64: string;
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let contractText = "";
    let images: ImagePayload[] = [];
    let mode: AudienceMode = "general";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const rawMode = formData.get("mode") as string;
      mode = VALID_MODES.includes(rawMode as AudienceMode) ? (rawMode as AudienceMode) : "general";

      const file = formData.get("file") as File | null;
      const photo = formData.get("photo") as File | null;
      const pastedText = formData.get("text") as string | null;

      if (file && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        contractText = await extractTextFromPDF(buffer);
      } else if (photo && photo.size > 0) {
        if (photo.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: "Photo too large. Maximum size is 10MB." }, { status: 400 });
        }
        const supported: ImagePayload["mediaType"][] = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ];
        const mediaType = photo.type as ImagePayload["mediaType"];
        if (!supported.includes(mediaType)) {
          return NextResponse.json(
            { error: "Unsupported image type. Use JPEG, PNG, WEBP, or GIF." },
            { status: 400 }
          );
        }
        const buffer = Buffer.from(await photo.arrayBuffer());
        images = [{ mediaType, base64: buffer.toString("base64") }];
      } else if (pastedText) {
        contractText = pastedText;
      }
    } else {
      const body = await req.json();
      const rawMode = body.mode as string;
      mode = VALID_MODES.includes(rawMode as AudienceMode) ? (rawMode as AudienceMode) : "general";
      contractText = body.text ?? "";
    }

    contractText = contractText.trim();

    if (!contractText && images.length === 0) {
      return NextResponse.json({ error: "No contract provided." }, { status: 400 });
    }
    if (contractText && contractText.length < 50) {
      return NextResponse.json({ error: "Contract text is too short to analyze." }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(mode);

    const userContent:
      | Array<
          | { type: "text"; text: string }
          | {
              type: "image";
              source: { type: "base64"; media_type: ImagePayload["mediaType"]; data: string };
            }
        > = [];

    if (images.length > 0) {
      for (const img of images) {
        userContent.push({
          type: "image",
          source: { type: "base64", media_type: img.mediaType, data: img.base64 },
        });
      }
      userContent.push({
        type: "text",
        text:
          "This image contains a photograph or screenshot of a contract. First, OCR the text of the contract. Then analyze it and return ONLY a JSON array as specified in the system prompt.",
      });
    } else {
      const truncated = truncateToTokenLimit(contractText);
      userContent.push({
        type: "text",
        text: `Analyze the following contract and return ONLY a JSON array as specified:\n\n${truncated}`,
      });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 8096,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";

    // Strip any accidental markdown fences
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let clauses: ClauseResult[];
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) throw new Error("Response was not an array");
      // Validate and sanitize each clause
      clauses = parsed
        .filter((c) => c && typeof c === "object" && c.title && c.plain)
        .map((c) => ({
          title: String(c.title).slice(0, 200),
          plain: String(c.plain).slice(0, 1000),
          status: ["standard", "unusual", "risk"].includes(c.status) ? c.status : "standard",
          flag: c.flag ? String(c.flag).slice(0, 500) : null,
        }));
    } catch {
      console.error("[analyze] JSON parse failed. Raw:", rawText.slice(0, 500));
      return NextResponse.json(
        { error: "The AI returned an unexpected format. Please try again." },
        { status: 502 }
      );
    }

    if (clauses.length === 0) {
      return NextResponse.json(
        { error: "No clauses were found. Please check that the input is a real contract." },
        { status: 422 }
      );
    }

    return NextResponse.json({ clauses });
  } catch (err: unknown) {
    console.error("[analyze] error:", err);

    if (err instanceof Anthropic.APIError) {
      if (err.status === 401) return NextResponse.json({ error: "AI service configuration error." }, { status: 500 });
      if (err.status === 429) return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
    }

    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
