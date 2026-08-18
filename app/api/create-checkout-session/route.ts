import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
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

    const metadata = {
      clerkId: dbUser.clerkId,
      dbUserId: dbUser.id,
      planKey: planKey!,
    };

    const baseParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // Metadata flows back to us on the webhook so we can link the new
      // subscription to the Clerk user.
      metadata,
      subscription_data: { metadata },
      success_url: `${appUrl}/app?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      allow_promotion_codes: true,
    };

    const stripe = getStripe();

    const createSession = async () => {
      // If we already have a Stripe customer for this user, reuse it, keeps
      // their payment methods / history consolidated across upgrades. But a
      // customer created in test mode does not exist in live mode (and vice
      // versa); if Stripe rejects it, fall back to customer_email and let a
      // fresh customer be created.
      if (dbUser.stripeCustomerId) {
        try {
          return await stripe.checkout.sessions.create({
            ...baseParams,
            customer: dbUser.stripeCustomerId,
          });
        } catch (customerErr) {
          const msg =
            customerErr instanceof Error ? customerErr.message : String(customerErr);
          if (!/no such customer|resource_missing|similar object exists/i.test(msg)) {
            throw customerErr;
          }
          // Stale/invalid customer, drop it and retry with email.
        }
      }
      return stripe.checkout.sessions.create({
        ...baseParams,
        customer_email: dbUser.email,
      });
    };

    const session = await createSession();
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session] error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
