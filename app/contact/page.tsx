import type { Metadata } from "next";
import { Mail, Clock, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ClearContract team for support, privacy, or legal inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex-1 py-20 px-5">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Contact us
          </h1>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl leading-relaxed">
            Questions about your account, billing, or how ClearContract works? We&apos;re
            happy to help.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-[#111116] border border-white/[0.07] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-zinc-200" />
              </div>
              <h2 className="text-white font-semibold mb-1.5">Support</h2>
              <p className="text-zinc-500 text-sm mb-3 leading-relaxed">
                Bug reports, billing issues, feature requests, anything else.
              </p>
              <a
                href="mailto:support@clrct.com"
                className="text-zinc-200 hover:text-white text-sm font-medium"
              >
                support@clrct.com
              </a>
            </div>

            <div className="bg-[#111116] border border-white/[0.07] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-zinc-200" />
              </div>
              <h2 className="text-white font-semibold mb-1.5">Response time</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We aim to respond to every inquiry within 48 hours, Monday through
                Friday.
              </p>
            </div>
          </div>

          <div className="bg-[#111116] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-zinc-200" />
              </div>
              <div>
                <h2 className="text-white font-semibold mb-2">Privacy &amp; legal</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  For GDPR or CCPA requests, data deletion, or any other privacy and
                  legal matter, email{" "}
                  <a
                    href="mailto:support@clrct.com"
                    className="text-zinc-200 hover:text-white"
                  >
                    support@clrct.com
                  </a>{" "}
                  with the word &quot;Privacy&quot; or &quot;Legal&quot; in the subject
                  line and we&apos;ll route it to the right person.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
