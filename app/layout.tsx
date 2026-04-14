import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearContract — Plain-English Contract Explainer",
  description:
    "Paste any contract and get a plain-English breakdown of every clause in seconds, powered by AI. Know what you're signing.",
  keywords: ["contract analysis", "legal AI", "plain english contract", "contract explainer"],
  openGraph: {
    title: "ClearContract — Know What You're Signing",
    description:
      "AI-powered contract analysis that explains every clause in plain English.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
