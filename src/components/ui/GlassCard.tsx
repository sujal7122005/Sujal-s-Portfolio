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
  cyan: "hover:border-cyan-300/35 hover:shadow-[0_0_30px_rgba(0,212,255,0.12)]",
  violet:
    "hover:border-violet-300/35 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
  green: "hover:border-emerald-300/35 hover:shadow-[0_0_30px_rgba(0,255,136,0.14)]",
  none: "",
};

const baseClassName =
  "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300";

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
