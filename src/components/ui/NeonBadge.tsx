"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonBadgeProps {
  label: string;
  icon?: string;
  color?: "cyan" | "violet" | "green";
}

export function NeonBadge({ label, icon, color = "cyan" }: NeonBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[14px] font-[700] text-[var(--text-primary)] transition-all duration-300 font-[family-name:var(--font-sans)] uppercase"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4"
        />
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[var(--accent)] text-white text-[10px] font-bold">
          {label[0]}
        </span>
      )}
      {label}
    </motion.span>
  );
}
