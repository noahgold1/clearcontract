import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, type PlanKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planKey, priceId: clientPriceId, email } = body as {
      planKey?: PlanKey;
      priceId?: string;
      email?: string;
    };

    // Resolve the real Stripe price ID server-side. planKey is preferred —
    // STRIPE_*_PRICE_ID env vars are not exposed to the client, so the
    // priceId field on PLANS is always empty in the browser.
    let priceId: string | null = null;
    if (planKey && PLANS[planKey]) {
      priceId = PLANS[planKey].priceId || null;
    } else if (clientPriceId) {
      // Backwards compat: if the caller already has a real Stripe price ID,
      // accept it directly.
      priceId = clientPriceId;
    }

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
      ...(email ? { customer_email: email } : {}),
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
