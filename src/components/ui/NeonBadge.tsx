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
  cyan: "hover:border-cyan-300/60 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.26)]",
  violet:
    "hover:border-violet-300/60 hover:text-violet-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.26)]",
  green:
    "hover:border-emerald-300/60 hover:text-emerald-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.26)]",
};

export function NeonBadge({ label, icon, color = "cyan" }: NeonBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex animate-terminal-flicker items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 transition-all",
        "font-[family-name:var(--font-jetbrains-mono)]",
        colorClasses[color],
      )}
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 opacity-90"
        />
      ) : (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px]">
          {label[0]}
        </span>
      )}
      {label}
    </motion.span>
  );
}
