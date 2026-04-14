import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Pricing
            </h1>
            <p className="text-xl text-gray-500 max-w-lg mx-auto">
              Start free, upgrade when you need more. No hidden fees, cancel any time.
            </p>
          </div>

          <PricingTable />

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What counts as one analysis?",
                  a: "Each time you submit a contract for analysis counts as one use. You can re-analyze the same contract as many times as you like — each submission counts separately.",
                },
                {
                  q: "When do free tier credits reset?",
                  a: "Free tier credits reset on the first of each calendar month. Unused credits do not roll over.",
                },
                {
                  q: "Is this actually legal advice?",
                  a: "No. ClearContract is an informational tool to help you understand contracts. It is not legal advice. For important legal matters, always consult a qualified attorney.",
                },
                {
                  q: "Can I cancel my subscription?",
                  a: "Yes, anytime. You'll keep access until the end of your billing period. Use the billing portal (linked in the app) to manage or cancel.",
                },
                {
                  q: "What file types are supported?",
                  a: "Text paste and PDF uploads. PDFs must contain selectable text (not scanned images). Support for Word documents is coming soon.",
                },
                {
                  q: "How does the Business plan API access work?",
                  a: "Business plan users get a personal API key to call the ClearContract analysis endpoint programmatically. Rate limits apply. Documentation is available in the app.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
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
