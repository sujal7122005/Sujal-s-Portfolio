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
    "border border-white/60 text-white hover:bg-white/5",
  filled:
    "bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red-active)]",
  ghost: "text-white/70 hover:text-white",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const baseClassName =
  "group inline-flex items-center justify-center gap-2 rounded-none px-8 py-3 text-[13px] uppercase tracking-[0.22em] transition-all duration-300 font-[family-name:var(--font-dm-sans)]";

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
