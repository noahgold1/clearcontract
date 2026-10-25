import Link from "next/link";

/**
 * Same language as the navbar: paper ground, one hard ink rule, square
 * corners, mono for anything that behaves like a form label. The disclaimer
 * is set off with a redline bar rather than a warning pill, because the
 * redline is the thing this site does.
 */
export function Footer() {
  return (
    <footer className="border-t border-[#16171B] bg-[#F5F4EF] py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/icon.svg" alt="" width={24} height={24} className="w-6 h-6 rounded-md" />
              <span className="font-semibold text-[#16171B] text-sm tracking-tight">
                ClearContract
              </span>
            </div>
            <p className="text-sm text-[#16171B]/60 max-w-[22rem] leading-relaxed">
              Reads the contract and tells you what each clause does to you.
            </p>
          </div>

          <div className="flex gap-14 text-sm">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#16171B]/45 mb-3">
                Product
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/app"
                    className="text-[#16171B]/70 hover:text-[#D62E22] transition-colors"
                  >
                    Analyzer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#16171B]/45 mb-3">
                Legal
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy"
                    className="text-[#16171B]/70 hover:text-[#D62E22] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[#16171B]/70 hover:text-[#D62E22] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#16171B]/70 hover:text-[#D62E22] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#16171B]/15 flex flex-col-reverse md:flex-row md:items-center justify-between gap-5">
          <p className="font-mono text-[11px] text-[#16171B]/45">
            &copy; {new Date().getFullYear()} ClearContract
          </p>
          <p className="text-xs text-[#16171B]/70 border-l-[3px] border-[#D62E22] pl-3 max-w-md leading-relaxed">
            Not legal advice. It reads the words in front of it, and it can miss things.
          </p>
        </div>
      </div>
    </footer>
  );
}
