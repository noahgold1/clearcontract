import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import type { User } from "@prisma/client";

/**
 * Get the current Clerk-authenticated user and upsert their row in our
 * Postgres User table. Returns the DB User. Throws if not signed in —
 * callers should handle that via middleware/auth.protect() first.
 */
export async function getOrCreateDbUser(): Promise<User> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // Fast path: already in DB
  const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (existing) return existing;

  // First-time user: look up email from Clerk and create
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    throw new Error("Clerk user has no email — cannot create DB record");
  }

  // A row may already exist for this email under a different clerkId — e.g.
  // after migrating the Clerk instance from development to production, the
  // same person gets a new Clerk user id. Re-link that row to the new id
  // instead of failing on the unique email constraint.
  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    return prisma.user.update({
      where: { id: byEmail.id },
      data: { clerkId: userId },
    });
  }

  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
      plan: "FREE",
    },
  });
}

/**
 * Cheaper alternative when you only need clerkId and don't want to touch
 * the DB. Returns null if signed out.
 */
export async function getCurrentClerkId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
