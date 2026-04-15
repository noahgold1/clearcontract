import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="flex-1 py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Start free, upgrade when you need more. No hidden fees, cancel any time.
            </p>
          </div>

          <PricingTable />

          {/* FAQ */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {[
                { q: "What counts as one analysis?", a: "Each time you submit a contract for analysis counts as one use. You can re-analyze the same contract as many times as you like — each submission counts separately." },
                { q: "When do free tier credits reset?", a: "Free tier credits reset on the first of each calendar month. Unused credits do not roll over." },
                { q: "Is this actually legal advice?", a: "No. ClearContract is an informational tool to help you understand contracts. It is not legal advice. For important legal matters, always consult a qualified attorney." },
                { q: "Can I cancel my subscription?", a: "Yes, anytime. You'll keep access until the end of your billing period. Use the billing portal to manage or cancel." },
                { q: "What file types are supported?", a: "Text paste and PDF uploads. PDFs must contain selectable text (not scanned images). Word document support is coming soon." },
              ].map(({ q, a }) => (
                <div key={q} className="bg-[#111116] border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.12] transition-colors">
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
