"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";

interface SectionHeadingProps {
  kicker: string;
  headingTop: string;
  headingBottomGradient: string;
  sub?: string;
}

export function SectionHeading({
  kicker,
  headingTop,
  headingBottomGradient,
  sub,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 px-5">
      {/* Decorative "// section_name" kicker — hidden on mobile where it
          just eats vertical space without adding signal. */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hidden sm:block font-mono-brand text-indigo-400 text-xs tracking-widest mb-4 uppercase"
      >
        {kicker}
      </motion.p>

      <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
        <TextReveal text={headingTop} as="span" />
        <br />
        <TextReveal
          text={headingBottomGradient}
          delay={0.15}
          as="span"
          className="text-indigo-300"
        />
      </h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-zinc-500 text-sm"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
