import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ClearContract pricing, start free with no account required. Upgrade for unlimited contract analyses, PDF exports, and priority processing.",
  alternates: {
    canonical: "https://clearcontract-two.vercel.app/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="flex-1 py-20 px-5">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
              Simple,{" "}
              <span className="text-gradient">transparent</span>{" "}
              pricing
            </h1>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Start free, upgrade when you need more. No hidden fees, cancel any time.
            </p>
          </div>

          <PricingTable />

          {/* FAQ */}
          <div className="mt-24 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white font-display">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: "What counts as one analysis?",
                  a: "Each time you submit a contract for analysis counts as one use. You can re-analyze the same contract as many times as you like, each submission counts separately.",
                },
                {
                  q: "When do free tier credits reset?",
                  a: "Free tier credits reset on the first of each calendar month. Unused credits do not roll over to the next month.",
                },
                {
                  q: "What's the difference between Free and Pro?",
                  a: "Free gives you 3 analyses per month with contracts up to 10,000 words (~15 pages). Pro removes both limits, unlimited analyses on contracts up to 75,000 words (~115 pages) and PDF export of every analysis.",
                },
                {
                  q: "What does Business unlock that Pro doesn't?",
                  a: "Business adds the AI contract rewrite tool, which suggests safer replacement language for risky clauses you can accept, reject, and merge back into your contract. It also includes unlimited photo scans and best-effort priority support.",
                },
                {
                  q: "Is this actually legal advice?",
                  a: "No. ClearContract is an informational tool to help you understand contracts. It is not legal advice. For important legal matters, always consult a qualified attorney.",
                },
                {
                  q: "Can I cancel my subscription?",
                  a: "Yes, anytime. You'll keep access until the end of your billing period. Use the billing portal to manage or cancel, no questions asked, and we offer a 14-day money-back guarantee on all paid plans.",
                },
                {
                  q: "What file types are supported?",
                  a: "Text paste and PDF uploads on all plans (including Free). PDFs must contain selectable text (not scanned images). Word document and Google Docs support is coming soon to Pro and Business.",
                },
                {
                  q: "Do you store my contracts?",
                  a: "We do not store the original contract text on our servers, it's processed in-memory and discarded after the analysis returns. The structured analysis results (clause summaries, risk flags) are saved against your account so you can revisit them. Anthropic, our AI provider, also does not train models on your inputs.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-[#111116] border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.12] transition-colors shine-border"
                >
                  <h3 className="font-semibold text-white mb-2 text-sm">{q}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
