import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import type Stripe from "stripe";
import { Plan, SubscriptionStatus } from "@prisma/client";

function planFromPriceId(priceId: string | null | undefined): Plan {
  if (!priceId) return Plan.FREE;
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return Plan.PRO;
  if (priceId === process.env.STRIPE_BUSINESS_PRICE_ID) return Plan.BUSINESS;
  return Plan.FREE;
}

function statusFromStripe(s: Stripe.Subscription.Status): SubscriptionStatus {
  switch (s) {
    case "active":
    case "trialing":
      return SubscriptionStatus.ACTIVE;
    case "past_due":
    case "unpaid":
      return SubscriptionStatus.PAST_DUE;
    case "canceled":
    case "incomplete_expired":
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.INACTIVE;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log(`[webhook] received: ${event.type}`);

  try {
    switch (event.type) {
      // First-time upgrade: pull clerkId from the session metadata and link
      // the Stripe customer + subscription to the user in our DB.
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkId = session.metadata?.clerkId;
        if (!clerkId) {
          console.warn("[webhook] checkout.session.completed without clerkId metadata");
          break;
        }
        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        // Fetch the full subscription to read its current price.
        let plan: Plan = Plan.FREE;
        let status: SubscriptionStatus = SubscriptionStatus.INACTIVE;
        if (subscriptionId) {
          const sub = await getStripe().subscriptions.retrieve(subscriptionId);
          plan = planFromPriceId(sub.items.data[0]?.price.id);
          status = statusFromStripe(sub.status);
        }

        await prisma.user.update({
          where: { clerkId },
          data: {
            ...(customerId ? { stripeCustomerId: customerId } : {}),
            ...(subscriptionId ? { subscriptionId } : {}),
            plan,
            subscriptionStatus: status,
          },
        });
        console.log(`[webhook] upgraded ${clerkId} -> ${plan}`);
        break;
      }

      // Plan changes (upgrade/downgrade/renewal). Find user by customerId
      // since subscription events don't always carry clerkId metadata.
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });
        if (!user) {
          console.warn(`[webhook] no user for customer ${customerId}`);
          break;
        }
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionId: sub.id,
            plan: planFromPriceId(sub.items.data[0]?.price.id),
            subscriptionStatus: statusFromStripe(sub.status),
          },
        });
        break;
      }

      // Cancellation — drop back to FREE.
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });
        if (!user) break;
        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: Plan.FREE,
            subscriptionStatus: SubscriptionStatus.CANCELED,
            subscriptionId: null,
          },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;
        if (!customerId) break;
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
        });
        if (!user) break;
        await prisma.user.update({
          where: { id: user.id },
          data: { subscriptionStatus: SubscriptionStatus.PAST_DUE },
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[webhook] handler error:", err);
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
