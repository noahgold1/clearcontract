"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/stripe";

export function PricingTable() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(priceId: string | null, planKey: string) {
    if (planKey === "FREE") {
      router.push("/app");
      return;
    }

    setLoading(planKey);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  }

  const plans = [
    { key: "FREE", ...PLANS.FREE },
    { key: "PRO", ...PLANS.PRO, popular: true },
    { key: "BUSINESS", ...PLANS.BUSINESS },
  ] as const;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.key}
          className={`relative rounded-2xl border p-8 flex flex-col ${
            "popular" in plan && plan.popular
              ? "border-blue-500 shadow-xl shadow-blue-100 bg-white"
              : "border-gray-200 bg-white shadow-sm"
          }`}
        >
          {"popular" in plan && plan.popular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
            <div className="flex items-end gap-1 mt-3">
              <span className="text-4xl font-extrabold text-gray-900">
                ${plan.price}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-500 text-sm mb-1">/month</span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckout(plan.priceId, plan.key)}
            disabled={loading === plan.key}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 ${
              "popular" in plan && plan.popular
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {loading === plan.key
              ? "Redirecting..."
              : plan.key === "FREE"
              ? "Get started free"
              : `Get ${plan.name}`}
          </button>
        </div>
      ))}
    </div>
  );
}
