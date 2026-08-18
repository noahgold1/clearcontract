// Centralized model config. Change ANTHROPIC_MODEL in Vercel env vars to swap
// the model without a code change. NEXT_PUBLIC_MODEL_DISPLAY controls the
// "Powered by ..." badge text on the landing page.

export const ANTHROPIC_MODEL =
  process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

export const MODEL_DISPLAY =
  process.env.NEXT_PUBLIC_MODEL_DISPLAY || "Claude Sonnet 4.5";
