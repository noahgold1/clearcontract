"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Check, ArrowRight } from "lucide-react";
import { PLANS, type PlanKey } from "@/lib/stripe";

type CurrentPlan = "FREE" | "PRO" | "BUSINESS";
const PLAN_RANK: Record<CurrentPlan, number> = { FREE: 0, PRO: 1, BUSINESS: 2 };

export function PricingTable() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setCurrentPlan(null);
      return;
    }
    let cancelled = false;
    fetch("/api/usage")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const p = data.plan as CurrentPlan | undefined;
        if (p === "FREE" || p === "PRO" || p === "BUSINESS") setCurrentPlan(p);
      })
      .catch(() => {
        /* leave currentPlan null, falls back to default CTAs */
      });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  async function handleCheckout(_priceId: string | null, planKey: string) {
    if (planKey === "FREE") {
      router.push("/app");
      return;
    }

    // Paid plans need a signed-in user so we can link the Stripe customer
    // back to them. Redirect to sign-up, then bounce back to /pricing to
    // resume the upgrade.
    if (isLoaded && !isSignedIn) {
      const next = encodeURIComponent(`/pricing?resume=${planKey}`);
      router.push(`/sign-up?redirect_url=${next}`);
      return;
    }

    setLoading(planKey);
    setError(null);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Plan genuinely not wired up on the server (missing env var).
        // route to the free app with a friendly notice.
        router.push(`/app?upgrade=${planKey.toLowerCase()}`);
      }
    } catch {
      setError("Network error. Please try again.");
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
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isPopular = "popular" in plan && plan.popular;
          return (
            <div
              key={plan.key}
              className={`relative rounded-2xl p-7 flex flex-col transition-all ${
                isPopular
                  ? "bg-white/[0.08] border border-white/40 shadow-xl shadow-black/20 md:scale-[1.02]"
                  : "bg-zinc-900/50 border border-white/[0.07] hover:border-white/[0.15]"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-zinc-950 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide uppercase shadow-lg shadow-black/20">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name + tagline */}
              <div className="mb-6">
                <h3
                  className={`text-base font-semibold mb-1 ${
                    isPopular ? "text-zinc-200" : "text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="text-xs text-zinc-500 mb-5">{plan.tagline}</p>

                {/* Price */}
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-black text-white tracking-tight">
                    ${plan.price}
                  </span>
                  {plan.price > 0 ? (
                    <span className="text-zinc-500 text-sm mb-2">/month</span>
                  ) : (
                    <span className="text-zinc-500 text-sm mb-2">forever</span>
                  )}
                </div>
                {plan.price > 0 && (
                  <p className="text-[11px] text-zinc-600 mt-1">Billed monthly · cancel anytime</p>
                )}
              </div>

              {(() => {
                const planKey = plan.key as PlanKey;
                let ctaLabel: string = plan.cta;
                let isCurrent = false;
                if (currentPlan) {
                  const cardRank = PLAN_RANK[planKey];
                  const userRank = PLAN_RANK[currentPlan];
                  if (cardRank === userRank) {
                    isCurrent = true;
                    ctaLabel = "Current plan";
                  } else if (cardRank > userRank) {
                    ctaLabel = `Upgrade to ${plan.name}`;
                  } else {
                    ctaLabel = `Downgrade to ${plan.name}`;
                  }
                }
                return (
                  <button
                    onClick={() => handleCheckout(plan.priceId, plan.key)}
                    disabled={loading === plan.key || isCurrent}
                    className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6 inline-flex items-center justify-center gap-2 group ${
                      isCurrent
                        ? "bg-white/[0.04] text-zinc-500 border border-white/[0.08]"
                        : isPopular
                        ? "bg-white hover:bg-zinc-200 text-zinc-950 shadow-lg shadow-black/20 hover:shadow-black/20"
                        : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]"
                    }`}
                  >
                    {loading === plan.key ? (
                      "Redirecting..."
                    ) : (
                      <>
                        {ctaLabel}
                        {!isCurrent && (
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        )}
                      </>
                    )}
                  </button>
                );
              })()}

              {/* Divider */}
              <div className="border-t border-white/[0.05] mb-5" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => {
                  // "Everything in Pro, plus:" gets special styling
                  const isHeader = feature.endsWith("plus:");
                  if (isHeader) {
                    return (
                      <li
                        key={feature}
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-200 -mb-1"
                      >
                        {feature}
                      </li>
                    );
                  }
                  return (
                    <li key={feature + idx} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isPopular ? "text-zinc-200" : "text-emerald-500"
                        }`}
                        strokeWidth={3}
                      />
                      <span className={isPopular ? "text-zinc-200" : "text-zinc-400"}>
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Money-back / trust footer */}
      <div className="flex items-center justify-center gap-6 pt-6 text-xs text-zinc-600 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
          14-day money-back guarantee
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
          Cancel anytime, no questions asked
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
          Secure payment via Stripe
        </span>
      </div>
    </div>
  );
}
