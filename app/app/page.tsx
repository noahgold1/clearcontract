import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { ContractAnalyzer } from "@/components/ContractAnalyzer";
import { UpgradeBanner } from "@/components/UpgradeBanner";
import { ManageBilling } from "@/components/ManageBilling";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Analyze a Contract",
  description:
    "Paste your contract or upload a PDF. ClearContract uses Claude AI to explain every clause in plain English and flag anything risky — in seconds.",
  alternates: {
    canonical: "https://clrct.com/app",
  },
};

// Navbar + Footer are provided by app/app/layout.tsx — don't render again here.
export default async function AppPage() {
  const { userId } = await auth();

  // Look up current plan so we can badge the header and show the billing
  // portal button for paid users. Swallow errors — DB might not be
  // provisioned in some dev/preview environments.
  let plan: "FREE" | "PRO" | "BUSINESS" = "FREE";
  let hasStripeCustomer = false;
  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true, stripeCustomerId: true },
      });
      if (user) {
        plan = user.plan;
        hasStripeCustomer = Boolean(user.stripeCustomerId);
      }
    } catch (e) {
      console.warn("[app/page] DB lookup failed:", e);
    }
  }

  const planBadge = {
    FREE: { label: "Free plan", className: "bg-white/[0.06] text-zinc-300 border-white/[0.1]" },
    PRO: { label: "Pro", className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30" },
    BUSINESS: {
      label: "Business",
      className: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    },
  }[plan];

  return (
    <div className="py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <p className="hidden sm:block text-[11px] font-semibold text-indigo-400 uppercase tracking-widest font-mono-brand">
                // contract_analyzer
              </p>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${planBadge.className}`}
              >
                {planBadge.label}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-display mb-2">
              Analyze Your Contract
            </h1>
            <p className="text-zinc-500 text-sm max-w-lg">
              Paste your contract or upload a PDF. Claude AI breaks every clause into plain
              English, flags risks, and tells you what to watch out for.
            </p>
          </div>
          {hasStripeCustomer && <ManageBilling />}
        </div>

        {/* Upgrade banner (shown when routed from pricing page) */}
        <Suspense fallback={null}>
          <UpgradeBanner />
        </Suspense>

        {/* Disclaimer */}
        <div className="bg-amber-500/[0.07] border border-amber-500/20 rounded-xl px-5 py-3 mb-8 flex items-start gap-3">
          <span className="text-amber-400 mt-0.5 shrink-0 text-sm">⚠</span>
          <p className="text-amber-200/70 text-sm">
            <strong className="text-amber-200/90">
              For informational purposes only. Not legal advice.
            </strong>{" "}
            ClearContract helps you understand contract language but is not a substitute
            for advice from a qualified attorney.
          </p>
        </div>

        <ContractAnalyzer />
      </div>
    </div>
  );
}
