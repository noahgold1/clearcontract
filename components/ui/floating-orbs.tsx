"use client";

import { motion } from "framer-motion";

interface Orb {
  size: number;
  color: string;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

const defaultOrbs: Orb[] = [
  {
    size: 520,
    color: "rgba(99,102,241,0.28)",
    top: "-10%",
    left: "-8%",
    duration: 22,
    delay: 0,
  },
  {
    size: 420,
    color: "rgba(168,85,247,0.22)",
    top: "30%",
    left: "60%",
    duration: 28,
    delay: 2,
  },
  {
    size: 380,
    color: "rgba(236,72,153,0.18)",
    top: "70%",
    left: "10%",
    duration: 32,
    delay: 4,
  },
];

export function FloatingOrbs({ orbs = defaultOrbs }: { orbs?: Orb[] }) {
  return (
    // Hidden on mobile — three large blurred divs animating continuously tank
    // FPS on low-end phones and the hero's indigo backdrop + grid pattern
    // already carry enough visual weight there.
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[90px]"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
