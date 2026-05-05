"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonBadgeProps {
  label: string;
  icon?: string;
  color?: "cyan" | "violet" | "green";
}

const colorClasses = {
  cyan: "hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)] hover:shadow-[0_0_14px_rgba(255,51,51,0.15)]",
  violet:
    "hover:border-[var(--accent-violet)]/50 hover:text-[var(--accent-violet)] hover:shadow-[0_0_14px_rgba(124,58,237,0.15)]",
  green:
    "hover:border-[var(--accent-green)]/50 hover:text-[var(--accent-green)] hover:shadow-[0_0_14px_rgba(0,255,136,0.15)]",
};

export function NeonBadge({ label, icon, color = "cyan" }: NeonBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] tracking-[0.08em] text-[var(--text-secondary)] transition-all duration-300",
        "font-[family-name:var(--font-jetbrains-mono)]",
        colorClasses[color],
      )}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 opacity-80"
        />
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-[9px] font-medium">
          {label[0]}
        </span>
      )}
      {label}
    </motion.span>
  );
}
