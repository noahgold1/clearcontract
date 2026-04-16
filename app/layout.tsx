import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const APP_URL = "https://clearcontract-two.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
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

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ClearContract — AI Contract Analyzer | Understand What You're Signing",
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
    title: "ClearContract — Understand Any Contract in Seconds",
    description:
      "AI-powered contract analysis. Paste any contract and get a plain-English breakdown of every clause, risk flags, and actionable insights — powered by Claude AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClearContract — AI Contract Analyzer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearContract — Understand Any Contract in Seconds",
    description:
      "Paste any contract. Get plain-English explanations of every clause. Flag risks instantly. Powered by Claude AI.",
    images: ["/og-image.png"],
    creator: "@clearcontract",
  },
  alternates: {
    canonical: APP_URL,
  },
  category: "technology",
  verification: {
    google: "TgpV7EfC2D9IA_KBUkNx7yM8IRVZ9c3MHG9NdpKDEuQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${mono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
