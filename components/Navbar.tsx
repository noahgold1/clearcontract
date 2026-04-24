"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <div
        className="max-w-6xl mx-auto px-5 flex items-center justify-between"
        style={{ height: "60px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/30">
            📋
          </div>
          <span className="font-semibold text-[15px] text-white tracking-tight">
            ClearContract
          </span>
        </Link>

        {/* Nav — tighter on mobile so the CTA button doesn't wrap to 2 lines. */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/pricing"
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              pathname === "/pricing"
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/app"
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              pathname === "/app"
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            Analyzer
          </Link>

          {/* Auth UI — switch between avatar menu and sign-in/CTA based on
              client-side auth state. Render nothing until Clerk is loaded to
              avoid a flicker between states. */}
          {isLoaded && isSignedIn && (
            <div className="ml-1 sm:ml-2 flex items-center">
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </div>
          )}

          {isLoaded && !isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors">
                  Sign in
                </button>
              </SignInButton>
              <Link
                href="/app"
                className="ml-1 sm:ml-2 px-3 sm:px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                Try free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
