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
  cyan: "hover:border-white/40",
  violet:
    "hover:border-white/40",
  green:
    "hover:border-white/40",
};

export function NeonBadge({ label, icon, color = "cyan" }: NeonBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70 transition-all",
        "font-[family-name:var(--font-dm-sans)]",
        colorClasses[color],
      )}
      whileHover={{ scale: 1.03, y: -1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={12}
          height={12}
          className="h-3 w-3 opacity-80"
        />
      ) : (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/25 text-[9px]">
          {label[0]}
        </span>
      )}
      {label}
    </motion.span>
  );
}
