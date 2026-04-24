import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getOrCreateDbUser } from "@/lib/user";

export async function POST() {
  try {
    const dbUser = await getOrCreateDbUser();
    if (!dbUser.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account yet. Upgrade to a paid plan first." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const portalSession = await getStripe().billingPortal.sessions.create({
      customer: dbUser.stripeCustomerId,
      return_url: `${appUrl}/app`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("[create-portal-session] error:", err);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
