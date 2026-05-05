"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label: string;
  heading: string;
  align?: "left" | "center";
}

export function SectionTitle({
  label,
  heading,
  align = "left",
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-[family-name:var(--font-dm-sans)]">
        {label}
      </p>
      <h2 className="text-3xl leading-tight text-white sm:text-4xl lg:text-5xl font-[family-name:var(--font-bebas)]">
        {heading}
      </h2>
    </motion.div>
  );
}
