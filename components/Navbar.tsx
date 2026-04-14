"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <span className="text-2xl">📋</span>
          <span>ClearContract</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href="/pricing"
            className={`hover:text-gray-900 transition-colors ${pathname === "/pricing" ? "text-gray-900" : ""}`}
          >
            Pricing
          </Link>
          <Link
            href="/app"
            className={`hover:text-gray-900 transition-colors ${pathname === "/app" ? "text-blue-600 font-semibold" : ""}`}
          >
            Analyzer
          </Link>
          <Link
            href="/app"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Try free
          </Link>
        </nav>
      </div>
    </header>
  );
}
