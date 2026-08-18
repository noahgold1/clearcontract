import { prisma } from "./db";
import { Plan } from "@prisma/client";
import { PLANS } from "./stripe";

export type UsageKind = "analysis" | "photo";

/** The two things a request can be blocked on. */
export type BlockReason = "analysis" | "photo";

export interface UsageResult {
  allowed: boolean;
  /** Why the request was blocked (only when allowed === false). */
  reason?: BlockReason;
  /** Count for the binding quota after this action (or the current count when blocked). */
  used: number;
  /** The binding limit; null means unlimited. */
  limit: number | null;
  plan: Plan;
}

const limitFor = (plan: Plan, kind: "analysis" | "photo"): number => {
  const p = PLANS[plan];
  return kind === "photo" ? p.photoScans : p.analyses;
};

// Time only ever moves forward, so any difference in (year, month) between the
// last reset and now means a fresh billing month has started.
const isNewMonth = (reset: Date, now: Date): boolean =>
  now.getUTCFullYear() !== reset.getUTCFullYear() ||
  now.getUTCMonth() !== reset.getUTCMonth();

/**
 * Ensure a user row exists for a Clerk id. (Kept for callers that only have a
 * clerkId; most routes should use getOrCreateDbUser() from lib/user.ts.)
 */
export async function getOrCreateUser(clerkId: string, email: string) {
  return prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email, plan: Plan.FREE },
  });
}

/**
 * Enforce the caller's plan quota for a single action, then record it.
 *
 * Every analyze call counts against the plan's monthly `analyses` limit.
 * A photo scan ALSO counts against the tighter `photoScans` limit — and is
 * blocked if either quota is exhausted (a photo is still an analysis).
 *
 * Counters reset automatically on the first call of a new calendar month.
 * Returns { allowed:false, reason } instead of throwing so routes can craft
 * a tailored upgrade message.
 */
export async function checkAndIncrementUsage(
  userId: string,
  plan: Plan,
  kind: UsageKind
): Promise<UsageResult> {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const now = new Date();

  let analyses = user.monthlyUsage;
  let photos = user.monthlyPhotoScans;

  if (isNewMonth(new Date(user.usageResetDate), now)) {
    analyses = 0;
    photos = 0;
  }

  const analysisLimit = limitFor(plan, "analysis");
  const photoLimit = limitFor(plan, "photo");

  // The plain-analysis quota applies to every request.
  if (Number.isFinite(analysisLimit) && analyses >= analysisLimit) {
    return { allowed: false, reason: "analysis", used: analyses, limit: analysisLimit, plan };
  }
  // Photo scans have their own, usually tighter, quota.
  if (kind === "photo" && Number.isFinite(photoLimit) && photos >= photoLimit) {
    return { allowed: false, reason: "photo", used: photos, limit: photoLimit, plan };
  }

  const nextAnalyses = analyses + 1;
  const nextPhotos = kind === "photo" ? photos + 1 : photos;

  await prisma.user.update({
    where: { id: userId },
    data: {
      monthlyUsage: nextAnalyses,
      monthlyPhotoScans: nextPhotos,
      // Anchor the window inside the current month so the next call compares
      // against a same-month timestamp until a real month boundary is crossed.
      usageResetDate: now,
    },
  });

  if (kind === "photo") {
    return {
      allowed: true,
      used: nextPhotos,
      limit: Number.isFinite(photoLimit) ? photoLimit : null,
      plan,
    };
  }
  return {
    allowed: true,
    used: nextAnalyses,
    limit: Number.isFinite(analysisLimit) ? analysisLimit : null,
    plan,
  };
}

/**
 * Read current usage without mutating counters — for dashboards/UI.
 */
export async function getUsageStats(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const now = new Date();
  const fresh = isNewMonth(new Date(user.usageResetDate), now);

  const analysisLimit = limitFor(user.plan, "analysis");
  const photoLimit = limitFor(user.plan, "photo");

  return {
    plan: user.plan,
    analyses: {
      used: fresh ? 0 : user.monthlyUsage,
      limit: Number.isFinite(analysisLimit) ? analysisLimit : null,
    },
    photoScans: {
      used: fresh ? 0 : user.monthlyPhotoScans,
      limit: Number.isFinite(photoLimit) ? photoLimit : null,
    },
  };
}
