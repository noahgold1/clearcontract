import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ClearContract collects, uses, and protects your personal information and contract data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex-1 py-20 px-5">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm mb-12">Last updated: May 24, 2026</p>

          <div className="space-y-10 text-zinc-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">1. Overview</h2>
              <p className="text-zinc-400">
                ClearContract (&quot;we&quot;, &quot;us&quot;) is an AI contract analysis
                service. This policy explains what data we collect, how we use it, and
                the rights you have over your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">2. Data we collect</h2>
              <p className="text-zinc-400">We collect only what we need to operate:</p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-300">Account email</strong>, managed
                  through Clerk, our authentication provider.
                </li>
                <li>
                  <strong className="text-zinc-300">Payment information</strong>:
                  handled entirely by Stripe. We never see or store your card details.
                </li>
                <li>
                  <strong className="text-zinc-300">Contract text and files</strong>:
                  the documents you submit for analysis.
                </li>
                <li>
                  <strong className="text-zinc-300">Usage metadata</strong>, counts of
                  analyses per month for plan enforcement, plus basic server logs.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">3. How we use it</h2>
              <p className="text-zinc-400">
                Your email lets you sign in and receive billing notices. Your contract
                text is sent to the Anthropic Claude API for analysis and returned to
                you. We use Stripe to process payments. We do not use your contracts to
                train models.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">4. Retention</h2>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                <li>
                  <strong className="text-zinc-300">Free and Pro</strong>: contract text
                  is processed in-memory during the request and is not retained beyond
                  the analysis itself. A record of your analysis result may be kept up
                  to 90 days for your history view.
                </li>
                <li>
                  <strong className="text-zinc-300">Business</strong>: optional
                  team-shared cloud storage is available when explicitly enabled by an
                  admin.
                </li>
                <li>
                  Account and billing records are retained while your account is active
                  and for the period required for tax and accounting compliance.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">5. We never sell your data</h2>
              <p className="text-zinc-400">
                We do not sell, rent, or share your personal information or contract
                content with advertisers or data brokers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">6. Subprocessors</h2>
              <p className="text-zinc-400">
                We rely on these third-party services: Clerk (authentication), Stripe
                (payments), Anthropic (AI analysis), and Vercel (hosting). Each has its
                own privacy policy and security commitments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">7. Your rights (GDPR &amp; CCPA)</h2>
              <p className="text-zinc-400">
                You have the right to access, correct, export, or delete your personal
                data, and to opt out of any sale of personal information (we do not sell
                it). To exercise any of these rights, email{" "}
                <a
                  href="mailto:support@clrct.com"
                  className="text-zinc-200 hover:text-white"
                >
                  support@clrct.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">8. Security</h2>
              <p className="text-zinc-400">
                Data is transmitted over TLS. Authentication tokens are managed by
                Clerk. We follow industry-standard practices for production access
                control. No system is perfectly secure; if you discover a vulnerability,
                please report it to{" "}
                <a
                  href="mailto:support@clrct.com"
                  className="text-zinc-200 hover:text-white"
                >
                  support@clrct.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">9. Contact</h2>
              <p className="text-zinc-400">
                Privacy questions or data requests:{" "}
                <a
                  href="mailto:support@clrct.com"
                  className="text-zinc-200 hover:text-white"
                >
                  support@clrct.com
                </a>
                . We respond within 48 hours.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
