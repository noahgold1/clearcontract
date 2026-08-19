import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { ContractAnalyzer } from "@/components/ContractAnalyzer";
import { UpgradeBanner } from "@/components/UpgradeBanner";
import { ManageBilling } from "@/components/ManageBilling";
import { prisma } from "@/lib/db";
import "./cc-app-theme.css";

export const metadata: Metadata = {
  title: "Analyze a Contract",
  description:
    "Paste your contract or upload a PDF. ClearContract uses Claude AI to explain every clause in plain English and flag anything risky, in seconds.",
  alternates: {
    canonical: "https://clrct.com/app",
  },
};

// Navbar + Footer are provided by app/app/layout.tsx, don't render again here.
export default async function AppPage() {
  const { userId } = await auth();

  // Look up current plan so we can badge the header and show the billing
  // portal button for paid users. Swallow errors, DB might not be
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
    FREE: { label: "Free plan", className: "text-zinc-400 border-[#4A4D55]" },
    PRO: { label: "Pro", className: "text-[#F0DE4E] border-[#F0DE4E]" },
    BUSINESS: {
      label: "Business",
      className: "text-[#F0DE4E] border-[#F0DE4E]",
    },
  }[plan];

  return (
    <div className="cc-app">
      <div className="cc-mid">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="cc-plan">{planBadge.label}</span>
            <h1 className="cc-setup-h" style={{ marginTop: 18 }}>
              Paste the contract.
            </h1>
            <p className="cc-setup-p">
              Every clause comes back in plain English, with the terms that take
              something from you marked in red.
            </p>
          </div>
          {hasStripeCustomer && <ManageBilling />}
        </div>

        {/* Upgrade banner (shown when routed from pricing page) */}
        <Suspense fallback={null}>
          <UpgradeBanner />
        </Suspense>

        {/* Notice */}
        <div
          style={{
            borderLeft: "3px solid #D62E22",
            paddingLeft: 20,
            marginTop: 34,
            maxWidth: "58ch",
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8 }}>
            <strong>It is not a lawyer.</strong> It reads the words and tells you what
            they mean. It does not know your situation or what else you have already
            signed. When the contract is big enough that being wrong would cost you,
            take it to a lawyer.
          </p>
        </div>

        <ContractAnalyzer />
      </div>
    </div>
  );
}

