// Content for the landing page, kept apart from the markup so the FAQ
// structured data in app/page.tsx is built from the same words people read.

export type Mark = "risk" | "unusual" | "standard";

export const CLAUSES: { name: string; mark: Mark; legal: string; plain: string }[] = [
  {
    name: "Intellectual property",
    mark: "risk",
    legal:
      "Contractor hereby irrevocably assigns to Company all right, title and interest in and to any and all Work Product together with all intellectual property rights therein, whether conceived within or outside the scope hereof.",
    plain: "They own everything you make, even side projects.",
  },
  {
    name: "Indemnification",
    mark: "risk",
    legal:
      "Contractor shall indemnify, defend and hold harmless Company, its affiliates, officers and agents from and against any and all claims, losses, liabilities and expenses of whatever nature arising hereunder.",
    plain: "If anyone sues over the work, you pay.",
  },
  {
    name: "Liability cap",
    mark: "risk",
    legal:
      "In no event shall Company's aggregate liability exceed the lesser of fees actually paid hereunder during the preceding three (3) months or one hundred dollars ($100.00), regardless of the form of action.",
    plain: "The most they can ever owe you is $100.",
  },
  {
    name: "Non-compete",
    mark: "risk",
    legal:
      "For a period of twenty-four (24) months following termination, Contractor shall not engage in any business competitive with Company within any territory in which Company conducts operations.",
    plain: "No work in your field for two years.",
  },
  {
    name: "Payment",
    mark: "unusual",
    legal:
      "Company shall remit payment of undisputed invoices within ninety (90) days of receipt, provided all deliverables have been accepted by Company in its sole and absolute discretion.",
    plain: "You get paid in 90 days, if they like the work.",
  },
  {
    name: "Arbitration",
    mark: "unusual",
    legal:
      "Any dispute arising hereunder shall be resolved exclusively by binding arbitration administered in Company's principal place of business, and the parties waive any right to trial by jury.",
    plain: "No court, no jury, and it happens in their city.",
  },
];

export const MARKS: { mark: Mark; label: string; line: string }[] = [
  { mark: "risk", label: "Risk", line: "Takes something from you." },
  { mark: "unusual", label: "Unusual", line: "Not what you'd normally see." },
  { mark: "standard", label: "Standard", line: "Ordinary. Move on." },
];

export const READERS = ["Freelancer", "Tenant", "Founder", "Employee", "General"];

export const FAQS: { q: string; a: string }[] = [
  { q: "What can I give it?", a: "Pasted text, a PDF, or a photo of the page." },
  { q: "How long does it take?", a: "About ten seconds. A long PDF can take closer to thirty." },
  { q: "What do the three marks mean?", a: "Risk takes something from you. Unusual is worth a second read. Standard is ordinary." },
  { q: "Why pick who's reading?", a: "A lease and a freelance contract hide different things, so it looks for different ones." },
  { q: "Can I keep the result?", a: "Yes. Download it as a PDF." },
  { q: "Is this legal advice?", a: "No. It reads the words. For anything that would hurt to get wrong, ask a lawyer." },
];

export const wordCount = (s: string) => s.trim().split(/\s+/).length;
