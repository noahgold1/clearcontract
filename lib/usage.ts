import { prisma } from "./prisma";
import { Plan } from "@prisma/client";

export const FREE_TIER_LIMIT = 3;

/**
 * Get or create a user record by Clerk ID.
 */
export async function getOrCreateUser(clerkId: string, email: string) {
  return prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email },
  });
}

/**
 * Check if a user has exceeded their monthly usage limit.
 * Resets the counter if we're in a new calendar month.
 */
export async function checkAndIncrementUsage(
  userId: string,
  plan: Plan
): Promise<{ allowed: boolean; used: number; limit: number | null }> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  // Paid plans have no limit
  if (plan === "PRO" || plan === "BUSINESS") {
    await prisma.user.update({
      where: { id: userId },
      data: { monthlyUsage: { increment: 1 } },
    });
    return { allowed: true, used: user.monthlyUsage + 1, limit: null };
  }

  // Reset counter on new month
  const now = new Date();
  const resetDate = new Date(user.usageResetDate);
  const isNewMonth =
    now.getFullYear() > resetDate.getFullYear() ||
    now.getMonth() > resetDate.getMonth();

  if (isNewMonth) {
    await prisma.user.update({
      where: { id: userId },
      data: { monthlyUsage: 1, usageResetDate: now },
    });
    return { allowed: true, used: 1, limit: FREE_TIER_LIMIT };
  }

  if (user.monthlyUsage >= FREE_TIER_LIMIT) {
    return { allowed: false, used: user.monthlyUsage, limit: FREE_TIER_LIMIT };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { monthlyUsage: { increment: 1 } },
  });

  return {
    allowed: true,
    used: user.monthlyUsage + 1,
    limit: FREE_TIER_LIMIT,
  };
}

/**
 * Return current usage stats without modifying the counter.
 */
export async function getUsageStats(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const now = new Date();
  const resetDate = new Date(user.usageResetDate);
  const isNewMonth =
    now.getFullYear() > resetDate.getFullYear() ||
    now.getMonth() > resetDate.getMonth();

  const used = isNewMonth ? 0 : user.monthlyUsage;
  const limit = user.plan === "FREE" ? FREE_TIER_LIMIT : null;

  return { used, limit, plan: user.plan };
}
