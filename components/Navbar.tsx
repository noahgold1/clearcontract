"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between" style={{ height: "60px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/30">
            📋
          </div>
          <span className="font-semibold text-[15px] text-white tracking-tight">ClearContract</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/pricing"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/pricing"
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/app"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/app"
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Analyzer
          </Link>
          <Link
            href="/app"
            className="ml-2 px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Try free
          </Link>
        </nav>
      </div>
    </header>
  );
}
