import type { Metadata } from "next";
import { ContractAnalyzer } from "@/components/ContractAnalyzer";
import "./cc-app-theme.css";

export const metadata: Metadata = {
  title: "Analyze a Contract",
  description:
    "Paste a contract, upload a PDF, or photograph the page. Every clause comes back in a sentence, sorted into risk, unusual, and standard.",
  alternates: {
    canonical: "https://clrct.com/app",
  },
};

// Navbar + Footer come from app/app/layout.tsx.
export default function AppPage() {
  return (
    <div className="cc-app">
      <div className="cc-mid">
        <h1 className="cc-setup-h">Paste a contract.</h1>
        <p className="cc-setup-p">
          Every clause comes back in a sentence. It&apos;s not a lawyer, so for anything big, ask one.
        </p>
        <ContractAnalyzer />
      </div>
    </div>
  );
}
