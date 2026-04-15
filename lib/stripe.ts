import Stripe from "stripe";

// Lazy singleton — only instantiated on first actual request, not at build time.
// This prevents Next.js static analysis from failing when STRIPE_SECRET_KEY is absent.
let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is not set.");
    _stripe = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

export const PLANS = {
  FREE: {
    name: "Free",
    tagline: "For occasional use",
    price: 0,
    priceId: null,
    analyses: 3,
    features: [
      "3 contract analyses per month",
      "All 5 audience modes",
      "Risk detection (Standard · Unusual · Risk)",
      "Paste text or upload PDF",
      "Contracts up to 10,000 words",
      "PDF report export",
      "No account required",
    ],
    cta: "Get started free",
  },
  PRO: {
    name: "Pro",
    tagline: "For freelancers & individuals",
    price: 12,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    analyses: Infinity,
    features: [
      "Unlimited contract analyses",
      "Long contracts up to 75,000 words",
      "Drag-and-drop PDF upload",
      "Branded PDF reports (no watermark)",
      "Saved analysis history (90 days)",
      "Priority processing queue",
      "Email support within 24 hours",
      "Early access to new audience modes",
    ],
    cta: "Upgrade to Pro",
  },
  BUSINESS: {
    name: "Business",
    tagline: "For teams & legal departments",
    price: 39,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? "",
    analyses: Infinity,
    features: [
      "Everything in Pro, plus:",
      "Side-by-side contract comparison",
      "Bulk analysis (up to 10 at once)",
      "Team seats (up to 5 members)",
      "Custom audience mode prompts",
      "Annotated PDFs with clause highlights",
      "Slack & email notifications",
      "Priority support · 4-hour SLA",
    ],
    cta: "Upgrade to Business",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
