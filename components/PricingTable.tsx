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
    <div className="grid md:grid-cols-3 gap-4">
      {plans.map((plan) => {
        const isPopular = "popular" in plan && plan.popular;
        return (
          <div
            key={plan.key}
            className={`relative rounded-2xl p-7 flex flex-col transition-all ${
              isPopular
                ? "bg-indigo-500/10 border border-indigo-500/40 shadow-xl shadow-indigo-500/10"
                : "bg-[#111116] border border-white/[0.07] hover:border-white/[0.12]"
            }`}
          >
            {isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide uppercase shadow-lg shadow-indigo-500/40">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className={`text-base font-semibold mb-4 ${isPopular ? "text-indigo-300" : "text-zinc-400"}`}>
                {plan.name}
              </h3>
              <div className="flex items-end gap-1.5">
                <span className="text-4xl font-black text-white">${plan.price}</span>
                {plan.price > 0 && (
                  <span className="text-zinc-500 text-sm mb-1.5">/month</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <svg
                    className={`w-4 h-4 mt-0.5 shrink-0 ${isPopular ? "text-indigo-400" : "text-zinc-500"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className={isPopular ? "text-zinc-200" : "text-zinc-400"}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.priceId, plan.key)}
              disabled={loading === plan.key}
              className={`w-full py-2.5 px-5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 ${
                isPopular
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                  : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]"
              }`}
            >
              {loading === plan.key
                ? "Redirecting..."
                : plan.key === "FREE"
                ? "Get started free"
                : `Get ${plan.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
