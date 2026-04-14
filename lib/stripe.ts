import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

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
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
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
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
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
