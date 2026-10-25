import type { Metadata } from "next";
import { Inter, Baloo_2, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// The canonical home of the site. Everything in the metadata below derives
// from this, so the live domain must be the only value here — pointing it at
// a deploy preview tells Google to index that preview instead of clrct.com.
const APP_URL = "https://clrct.com";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const baloo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

// Display accent for the hero headline, used italic.
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ClearContract: AI Contract Analyzer | Understand What You're Signing",
    template: "%s | ClearContract",
  },
  description:
    "ClearContract uses Claude AI to analyze any contract in seconds. Get plain-English explanations of every clause, flag risky terms, and know exactly what you're agreeing to before you sign.",
  keywords: [
    "AI contract analyzer",
    "contract analysis tool",
    "plain English contract explainer",
    "legal document analyzer",
    "freelance contract review",
    "understand contract clauses",
    "contract risk detection",
    "AI legal tool",
    "contract checker",
    "employment contract analyzer",
  ],
  authors: [{ name: "ClearContract" }],
  creator: "ClearContract",
  publisher: "ClearContract",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "ClearContract",
    title: "ClearContract: Understand Any Contract in Seconds",
    description:
      "AI-powered contract analysis. Paste any contract and get a plain-English breakdown of every clause, risk flags, and actionable insights, powered by Claude AI.",
    // No images array here on purpose. app/opengraph-image.tsx generates the
    // card and Next wires it up automatically; listing a file as well only
    // creates a second, wrong URL to keep in sync. There is no og-image.png.
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearContract: Understand Any Contract in Seconds",
    description:
      "Paste any contract. Get plain-English explanations of every clause. Flag risks instantly. Powered by Claude AI.",
    // Same reasoning: X falls back to og:image, which the generated card fills.
  },
  alternates: {
    canonical: APP_URL,
  },
  category: "technology",
  verification: {
    google: "TgpV7EfC2D9IA_KBUkNx7yM8IRVZ9c3MHG9NdpKDEuQ",
  },
};

/**
 * Site-wide structured data. Only claims that are true of the live product go
 * in here: it is free, it runs in the browser, it is made by one person. No
 * aggregateRating — there are no real reviews to point at, and inventing them
 * is both a policy violation and a lie.
 */
const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "ClearContract",
      description:
        "Reads a contract and tells you, in plain English, what each clause actually does to you.",
      inLanguage: "en-US",
      publisher: { "@id": `${APP_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#org`,
      name: "ClearContract",
      url: APP_URL,
      logo: `${APP_URL}/icon.svg`,
      email: "support@clrct.com",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${APP_URL}/#app`,
      name: "ClearContract",
      url: `${APP_URL}/app`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Contract analysis",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript.",
      description:
        "Paste a contract, upload a PDF, or photograph the page. Every clause comes back in plain English, sorted into standard, unusual, and risk.",
      featureList: [
        "Plain-English rewrite of every clause",
        "Risk and unusual-language flags",
        "PDF and photograph input",
        "Reader profiles for freelancer, tenant, founder, and employment contracts",
        "Downloadable marked-up PDF",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${APP_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          // Sign-in has to belong to the same site as the rest of it:
          // paper ground, ink type, canary for the one thing you click.
          colorPrimary: "#16171B",
          colorBackground: "#F5F4EF",
          colorText: "#16171B",
          colorTextSecondary: "#5C5F68",
          colorInputBackground: "#FFFFFF",
          colorInputText: "#16171B",
          colorDanger: "#D62E22",
          borderRadius: "0.25rem",
        },
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} ${baloo.variable} ${mono.variable} ${playfair.variable}`}
      >
        <head>
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/icon.svg" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
          />
        </head>
        <body className="font-sans antialiased">
          <SmoothScroll />
          <ScrollProgress />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
