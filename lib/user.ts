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

  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
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
