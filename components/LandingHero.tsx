"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { HeroPreview } from "@/components/HeroPreview";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { TiltCard } from "@/components/ui/tilt-card";
import { CharacterReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative flex min-h-[92vh] items-center px-5 py-24 overflow-hidden">
      {/* Floating gradient orbs */}
      <FloatingOrbs />

      {/* Grid pattern */}
      <GridPattern
        width={50}
        height={50}
        className={cn(
          "absolute inset-0 opacity-20",
          "[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_50%,transparent_100%)]"
        )}
      />

      {/* Edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-20">
        {/* ─── Left: copy ─────────────────────────────────── */}
        <div>
          {/* Animated shimmer badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 mb-8 flex items-center justify-start"
          >
            <div
              className={cn(
                "group rounded-full border border-white/10 bg-white/5 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-white/10"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-neutral-200 hover:duration-300">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                <span className="text-xs font-semibold tracking-wide">
                  Powered by Claude Sonnet 4.5
                </span>
              </AnimatedShinyText>
            </div>
          </motion.div>

          {/* Headline — character reveal */}
          <h1 className="font-display text-5xl md:text-[68px] leading-[1.02] font-bold tracking-tight mb-6">
            <CharacterReveal text="Know exactly" className="text-white" />
            <br />
            <CharacterReveal
              text="what you're signing"
              delay={0.3}
              className="bg-gradient-to-br from-indigo-200 via-indigo-400 to-violet-600 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Drop in any contract. Get a plain-English breakdown of every clause in seconds —
            with risk flags, unusual terms, and clear explanations tailored to your situation.
          </motion.p>

          {/* CTA with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <MagneticButton strength={12}>
              <Link
                href="/app"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-shadow hover:shadow-[0_4px_40px_rgba(99,102,241,0.65)]"
              >
                <FileText className="w-4 h-4" />
                Analyze a Contract Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </MagneticButton>
            <MagneticButton strength={8}>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                See how it works
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600"
          >
            {["No account required", "3 free analyses/month", "PDF export included"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ─── Right: interactive 3D preview ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex justify-center"
        >
          <TiltCard intensity={8} glare={0.2} className="w-full max-w-sm">
            {/* Floating glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-pink-500/20 blur-2xl" />
            <div className="relative">
              <HeroPreview />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
