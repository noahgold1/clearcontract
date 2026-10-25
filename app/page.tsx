import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Landing } from "@/components/Landing";
import { FAQS } from "@/lib/landing-content";
import "./landing.css";

/* Built from the same FAQS array the page renders, so what Google reads and
   what people read cannot drift apart. */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#05080E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}
