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
      <p className="text-[16px] font-[800] tracking-wide uppercase text-[var(--accent)] mb-3 font-[family-name:var(--font-sans)]">
        {label}
      </p>
      <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-[300] leading-[1.1] text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
        {heading}
      </h2>
    </motion.div>
  );
}
