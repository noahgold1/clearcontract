"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.05,
  as = "span",
}: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Component = motion[as] as typeof motion.span;

  return (
    <Component
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

export function CharacterReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={
        {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: delay,
            },
          },
        } satisfies Variants
      }
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={
                {
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      type: "spring" as const,
                      damping: 15,
                      stiffness: 200,
                    },
                  },
                } satisfies Variants
              }
            >
              {char}
            </motion.span>
          ))}
          {wi < text.split(" ").length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}
