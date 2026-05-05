"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: "cyan" | "violet" | "green" | "none";
  animated?: boolean;
}

export function GlassCard({ children, className, hoverGlow = "cyan" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300",
        hoverGlow !== "none" && "hover:border-[var(--border-hover)] hover:bg-[#1a1a1a]",
        className,
      )}
    >
      {children}
    </div>
  );
}
