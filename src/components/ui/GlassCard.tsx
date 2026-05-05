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
  cyan: "hover:border-[rgba(255,51,51,0.3)] hover:shadow-[0_0_30px_rgba(255,51,51,0.08)]",
  violet: "hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.08)]",
  green: "hover:border-[rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]",
  none: "",
};

const baseClassName =
  "rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300";

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
