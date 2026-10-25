import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05080E] mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="" width={22} height={22} className="w-[22px] h-[22px]" />
          <span className="text-sm font-medium text-[#F2F6FB]">ClearContract</span>
          <span className="text-sm text-[#F2F6FB]/40 ml-2">Not legal advice.</span>
        </div>
        <nav className="flex gap-6 text-sm text-[#F2F6FB]/55">
          <Link href="/app" className="hover:text-[#F2F6FB] transition-colors">Analyzer</Link>
          <Link href="/privacy" className="hover:text-[#F2F6FB] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#F2F6FB] transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-[#F2F6FB] transition-colors">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
