"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";

export function UpgradeBanner() {
  const params = useSearchParams();
  const plan = params.get("upgrade");
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissal when the query param changes
  useEffect(() => {
    if (plan) setDismissed(false);
  }, [plan]);

  if (!plan || dismissed) return null;
  if (plan !== "pro" && plan !== "business") return null;

  const planLabel = plan === "pro" ? "Pro" : "Business";

  return (
    <div className="relative bg-white/[0.08] border border-white/30 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
      <span className="mt-0.5 shrink-0">
        <Sparkles className="w-4 h-4 text-zinc-200" />
      </span>
      <div className="flex-1 text-sm">
        <p className="text-zinc-200 font-medium mb-0.5">
          {planLabel} checkout coming online shortly
        </p>
        <p className="text-zinc-200 text-xs leading-relaxed">
          We&apos;re finishing Stripe setup for paid plans. In the meantime you have full
          access to the free tier, 3 analyses per month, no account needed. Your {planLabel}{" "}
          spot will be first in line when billing launches.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-zinc-200 hover:text-white transition-colors shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
