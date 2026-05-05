"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label: string;
  heading: string;
  align?: "left" | "center";
}

export function SectionTitle({ label, heading, align = "left" }: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] mb-4 font-[family-name:var(--font-mono)]">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-[800] leading-[1.1] tracking-tight text-[var(--text-primary)] font-[family-name:var(--font-display)]">
        {heading}
      </h2>
    </motion.div>
  );
}
