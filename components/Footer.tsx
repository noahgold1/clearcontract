import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b] py-10 px-5 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center text-xs shadow-lg shadow-indigo-500/30">
                📋
              </div>
              <span className="font-semibold text-white text-sm">ClearContract</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              AI-powered contract analysis in plain English.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-medium text-zinc-300 mb-3">Product</p>
              <ul className="space-y-2 text-zinc-500">
                <li><Link href="/app" className="hover:text-zinc-300 transition-colors">Analyzer</Link></li>
                <li><Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} ClearContract. All rights reserved.
          </p>
          <p className="text-xs text-amber-500/80 font-medium bg-amber-500/[0.08] border border-amber-500/20 px-3 py-1.5 rounded-full">
            ⚠️ For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
