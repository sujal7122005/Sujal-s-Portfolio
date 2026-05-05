"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: "cyan" | "violet" | "green" | "none";
  animated?: boolean;
}

const glowClasses: Record<NonNullable<GlassCardProps["hoverGlow"]>, string> = {
  cyan: "hover:border-white/40",
  violet:
    "hover:border-white/40",
  green: "hover:border-white/40",
  none: "",
};

const baseClassName =
  "rounded-none border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300";

export function GlassCard({
  children,
  className,
  hoverGlow = "cyan",
  animated = false,
}: GlassCardProps) {
  const mergedClassName = cn(baseClassName, glowClasses[hoverGlow], className);

  if (!animated) {
    return <div className={mergedClassName}>{children}</div>;
  }

  return (
    <motion.div
      className={mergedClassName}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
