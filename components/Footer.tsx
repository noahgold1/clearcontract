import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
              <span className="text-xl">📋</span>
              <span>ClearContract</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              AI-powered contract analysis in plain English. Know what you&apos;re signing.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-semibold text-gray-900 mb-3">Product</p>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/app" className="hover:text-gray-900 transition-colors">Analyzer</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-3">Account</p>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/sign-in" className="hover:text-gray-900 transition-colors">Sign in</Link></li>
                <li><Link href="/sign-up" className="hover:text-gray-900 transition-colors">Sign up</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ClearContract. All rights reserved.
          </p>
          <p className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-full">
            ⚠️ For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
