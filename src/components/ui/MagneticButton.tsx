"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  variant: "outline" | "filled" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClassName: Record<MagneticButtonProps["variant"], string> = {
  outline:
    "border border-cyan-300/60 text-cyan-100 hover:bg-cyan-300/10 hover:shadow-[0_0_24px_rgba(0,212,255,0.22)]",
  filled:
    "bg-cyan-300 text-slate-950 hover:bg-cyan-200 hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]",
  ghost: "border border-white/15 text-slate-200 hover:border-cyan-300/40 hover:text-cyan-100",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const baseClassName =
  "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-300 font-[family-name:var(--font-syne)]";

export function MagneticButton({
  children,
  variant,
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticEffect();

  if (href) {
    return (
      <motion.a
        data-cursor-hover="true"
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ x, y }}
        className={cn(
          baseClassName,
          variantClassName[variant],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
        aria-disabled={disabled}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      data-cursor-hover="true"
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      disabled={disabled}
      className={cn(
        baseClassName,
        variantClassName[variant],
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
