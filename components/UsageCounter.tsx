import Link from "next/link";
import type { Plan } from "@prisma/client";

interface UsageCounterProps {
  used: number;
  limit: number | null;
  plan: Plan;
}

export function UsageCounter({ used, limit, plan }: UsageCounterProps) {
  if (plan !== "FREE") {
    return (
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="font-semibold text-blue-700 capitalize">
          {plan.toLowerCase()} plan
        </span>
        <span className="text-blue-500">— Unlimited analyses</span>
      </div>
    );
  }

  const remaining = (limit ?? 3) - used;
  const isNearLimit = remaining <= 1;
  const isAtLimit = remaining <= 0;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm border ${
        isAtLimit
          ? "bg-red-50 border-red-200"
          : isNearLimit
          ? "bg-yellow-50 border-yellow-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div>
        <span className={`font-semibold ${isAtLimit ? "text-red-700" : isNearLimit ? "text-yellow-700" : "text-gray-900"}`}>
          {used} of {limit}
        </span>
        <span className={`ml-1 ${isAtLimit ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-gray-500"}`}>
          free analyses used
        </span>
      </div>
      {isAtLimit ? (
        <Link
          href="/pricing"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          Upgrade
        </Link>
      ) : null}
    </div>
  );
}
