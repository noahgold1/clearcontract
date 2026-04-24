import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, type PlanKey } from "@/lib/stripe";
import { getOrCreateDbUser } from "@/lib/user";

export async function POST(req: NextRequest) {
  try {
    // Middleware already required auth for this route, so this will throw
    // only in misconfiguration.
    const dbUser = await getOrCreateDbUser();

    const body = await req.json();
    const { planKey } = body as { planKey?: PlanKey };

    const priceId = planKey && PLANS[planKey] ? PLANS[planKey].priceId : null;
    if (!priceId) {
      return NextResponse.json(
        { error: "This plan is not yet available." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // If we already have a Stripe customer for this user, reuse it — keeps
      // their payment methods / history consolidated across upgrades.
      ...(dbUser.stripeCustomerId
        ? { customer: dbUser.stripeCustomerId }
        : { customer_email: dbUser.email }),
      // Metadata flows back to us on the webhook so we can link the new
      // subscription to the Clerk user.
      metadata: {
        clerkId: dbUser.clerkId,
        dbUserId: dbUser.id,
        planKey: planKey!,
      },
      subscription_data: {
        metadata: {
          clerkId: dbUser.clerkId,
          dbUserId: dbUser.id,
          planKey: planKey!,
        },
      },
      success_url: `${appUrl}/app?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session] error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
