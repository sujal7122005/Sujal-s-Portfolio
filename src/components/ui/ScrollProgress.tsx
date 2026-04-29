"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500 shadow-[0_0_18px_rgba(0,212,255,0.5)]"
      style={{ scaleX }}
    />
  );
}
