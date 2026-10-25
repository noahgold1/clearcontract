"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

/* Transparent over the night background, blurred once content scrolls
   under it. The one filled shape is the pill that starts an analysis. */
export function Navbar() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05080E]/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4BA8FF]">
          <img src="/icon.svg" alt="" width={28} height={28} className="w-7 h-7" />
          <span className="text-[15px] font-medium tracking-tight text-[#F2F6FB]">ClearContract</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/app"
            className={`hidden sm:inline-flex px-3 py-2 text-sm rounded-full transition-colors ${
              pathname === "/app" ? "text-[#F2F6FB]" : "text-[#F2F6FB]/55 hover:text-[#F2F6FB]"
            }`}
          >
            Analyzer
          </Link>

          {isLoaded && isSignedIn && (
            <div className="ml-1 flex items-center">
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </div>
          )}

          {isLoaded && !isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="px-3 py-2 text-sm rounded-full text-[#F2F6FB]/55 hover:text-[#F2F6FB] transition-colors">
                  Sign in
                </button>
              </SignInButton>
              {pathname !== "/app" && (
                <Link
                  href="/app"
                  className="ml-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap text-[#F2F6FB] bg-[#4BA8FF]/[0.12] border border-[#4BA8FF]/40 hover:bg-[#4BA8FF]/[0.22] hover:border-[#4BA8FF]/70 transition-colors"
                >
                  Analyze a contract
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
