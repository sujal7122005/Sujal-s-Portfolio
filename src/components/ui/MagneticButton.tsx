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
    "border border-[var(--accent-cyan)]/50 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:border-[var(--accent-cyan)] hover:shadow-[0_0_20px_rgba(255,51,51,0.15)]",
  filled:
    "bg-[var(--accent-cyan)] text-white font-medium hover:bg-[#ff5555] hover:shadow-[0_0_25px_rgba(255,51,51,0.3)]",
  ghost: "text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const baseClassName =
  "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-[13px] uppercase tracking-[0.18em] transition-all duration-300 font-[family-name:var(--font-syne)]";

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
