import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-20 relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#4BA8FF]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl text-center">
          <h1 className="font-display text-7xl md:text-9xl font-black tracking-tight mb-4 bg-gradient-to-br from-white via-white/5 to-white/5 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            We couldn&apos;t find that page
          </h2>
          <p className="text-zinc-400 text-base mb-10 leading-relaxed">
            The page you&apos;re looking for might have been moved, renamed, or it may
            have never existed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#4BA8FF]/50 bg-[#4BA8FF]/15 px-6 py-3.5 text-sm font-medium text-[#F2F6FB] transition-colors hover:border-[#4BA8FF]/80 hover:bg-[#4BA8FF]/25"
            >
              Back to home
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-[#F2F6FB]/75 transition-colors hover:border-white/[0.2] hover:text-[#F2F6FB]"
            >
              Try the analyzer
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
