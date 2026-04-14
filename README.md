# ClearContract

AI-powered contract analysis in plain English. Paste any contract or upload a PDF and get a clause-by-clause breakdown with risk flags — powered by Claude AI.

## Features

- **Contract analyzer** — paste text or upload a PDF; get JSON-structured clause breakdowns
- **5 audience modes** — Freelancer, Tenant, Founder, Employee, General (each with a custom Claude system prompt)
- **Color-coded risk badges** — Standard / Unusual / Risk with flag messages
- **Download results as PDF** (Pro plan)
- **Clerk auth** — email + Google OAuth
- **Free tier** — 3 analyses/month; tracked per user in Postgres
- **Stripe subscriptions** — Pro ($19/mo) and Business ($49/mo) with webhook sync

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth | Clerk |
| Payments | Stripe |
| AI | Anthropic Claude (`claude-sonnet-4-5`) |
| Database | Prisma + PostgreSQL (Vercel Postgres or Supabase) |
| PDF extraction | pdf-parse (server-side) |
| PDF generation | jsPDF (client-side) |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk dashboard](https://dashboard.clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |
| `ANTHROPIC_API_KEY` | [Anthropic console](https://console.anthropic.com) |
| `STRIPE_SECRET_KEY` | [Stripe dashboard](https://dashboard.stripe.com) → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → your endpoint → Signing secret |
| `STRIPE_PRO_PRICE_ID` | Stripe → Products → Pro plan price ID |
| `STRIPE_BUSINESS_PRICE_ID` | Stripe → Products → Business plan price ID |
| `DATABASE_URL` | Vercel Postgres or Supabase connection string |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally; your Vercel URL in prod |

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your keys
```

### 3. Set up the database

```bash
# Push Prisma schema to your database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stripe Setup

### Create products and prices

1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Create two products:
   - **Pro** — $19/month recurring → copy the price ID to `STRIPE_PRO_PRICE_ID`
   - **Business** — $49/month recurring → copy the price ID to `STRIPE_BUSINESS_PRICE_ID`

### Set up webhooks

1. Go to Stripe → Developers → Webhooks → **Add endpoint**
2. URL: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET`

### Local webhook testing

```bash
# Install Stripe CLI (https://stripe.com/docs/stripe-cli)
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI will print a webhook signing secret — use that for `STRIPE_WEBHOOK_SECRET` locally.

---

## Clerk Setup

1. Create a new app at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Enable **Email** and **Google** sign-in providers
3. Copy the publishable key and secret key to your `.env.local`
4. Set the redirect URLs in Clerk dashboard:
   - Sign-in: `/app`
   - Sign-up: `/app`

---

## Database Schema

```prisma
model User {
  id                 String             @id @default(cuid())
  clerkId            String             @unique
  email              String             @unique
  stripeCustomerId   String?            @unique
  subscriptionId     String?
  plan               Plan               @default(FREE)
  subscriptionStatus SubscriptionStatus @default(INACTIVE)
  monthlyUsage       Int                @default(0)
  usageResetDate     DateTime           @default(now())
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  analyses           Analysis[]
}

model Analysis {
  id        String   @id @default(cuid())
  userId    String
  mode      String
  results   Json
  createdAt DateTime @default(now())
}
```

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com/new)
3. Add all environment variables in Vercel Dashboard → Settings → Environment Variables
4. Add a **Vercel Postgres** database (or paste your Supabase `DATABASE_URL`)
5. After first deploy, run `prisma migrate deploy` via the Vercel CLI or set it as a build command:
   ```
   prisma generate && prisma migrate deploy && next build
   ```
6. Update your Stripe webhook endpoint URL to your Vercel production URL

---

## API Reference

### `POST /api/analyze`

Analyzes a contract and returns clause breakdowns.

**Request (JSON):**
```json
{
  "text": "CONTRACT TEXT HERE",
  "mode": "freelancer"
}
```

**Request (multipart/form-data):**
- `file` — PDF file
- `mode` — audience mode

**Response:**
```json
{
  "clauses": [
    {
      "title": "IP Assignment",
      "plain": "All work you create belongs to the client...",
      "status": "risk",
      "flag": "This clause assigns IP broadly, including work done outside project scope."
    }
  ],
  "usage": { "used": 1, "limit": 3 }
}
```

**Error (usage limit):**
```json
{
  "error": "You've used all 3 free analyses this month.",
  "upgradeRequired": true
}
```

---

## License

MIT
