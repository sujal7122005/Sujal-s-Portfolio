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

const variants: Record<MagneticButtonProps["variant"], string> = {
  outline: "border border-[var(--border-hover)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  filled: "bg-[var(--accent)] text-white hover:brightness-110",
  ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
};

function isExternal(href: string) {
  return href.startsWith("http");
}

const base = "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-200 font-[family-name:var(--font-sans)]";

export function MagneticButton({
  children, variant, href, onClick, className, type = "button", disabled = false,
}: MagneticButtonProps) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticEffect();

  const cls = cn(base, variants[variant], disabled && "opacity-50 pointer-events-none", className);

  if (href) {
    return (
      <motion.a
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ x, y }}
        className={cls}
        target={isExternal(href) ? "_blank" : undefined}
        rel={isExternal(href) ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      disabled={disabled}
      className={cls}
    >
      {children}
    </motion.button>
  );
}
