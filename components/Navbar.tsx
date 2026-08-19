"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function Navbar() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[#16171B] bg-[#F5F4EF]">
      <div
        className="max-w-6xl mx-auto px-5 flex items-center justify-between"
        style={{ height: "60px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/icon.svg" alt="" width={28} height={28} className="w-7 h-7 rounded-lg" />
          <span className="font-semibold text-[15px] text-[#16171B] tracking-tight">
            ClearContract
          </span>
        </Link>

        {/* Nav, tighter on mobile so the CTA button doesn't wrap to 2 lines. */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/app"
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
              pathname === "/app"
                ? "text-[#16171B] bg-[#E6E4DB]"
                : "text-[#16171B]/60 hover:text-[#16171B] hover:bg-[#E6E4DB]"
            }`}
          >
            Analyzer
          </Link>

          {/* Auth UI, switch between avatar menu and sign-in/CTA based on
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
                <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#16171B]/60 hover:text-[#16171B] hover:bg-[#E6E4DB] transition-colors">
                  Sign in
                </button>
              </SignInButton>
              <Link
                href="/app"
                className="ml-1 sm:ml-2 px-3 sm:px-4 py-2 border border-[#16171B] bg-[#16171B] text-[#F5F4EF] text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors hover:bg-[#D62E22] hover:border-[#D62E22]"
              >
                Analyze a contract
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
