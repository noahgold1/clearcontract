import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-20 relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
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
              className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-black/30"
            >
              Back to home
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
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
