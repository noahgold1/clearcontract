"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  headingTop: string;
  headingBottomGradient: string;
  sub?: string;
}

export function SectionHeading({
  headingTop,
  headingBottomGradient,
  sub,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 sm:mb-16 px-5">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-chrome inline-block"
        >
          {headingTop}
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-chrome inline-block"
        >
          {headingBottomGradient}
        </motion.span>
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
