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
    price: 0,
    priceId: null,
    analyses: 3,
    features: [
      "3 contract analyses per month",
      "General audience mode",
      "Plain-English clause breakdowns",
    ],
  },
  PRO: {
    name: "Pro",
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    analyses: Infinity,
    features: [
      "Unlimited contract analyses",
      "All 5 audience modes",
      "PDF download of results",
      "Priority support",
    ],
  },
  BUSINESS: {
    name: "Business",
    price: 49,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? "",
    analyses: Infinity,
    features: [
      "Everything in Pro",
      "API access",
      "Team seats (up to 5)",
      "Custom system prompt overrides",
      "Dedicated support",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
