"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { slideLeft, slideRight } from "@/lib/animations";
import { TIMELINE_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-[var(--bg-primary)] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 04 EXPERIENCE" heading="My Journey" />

        <div className="relative mt-12 space-y-8">
          {/* Timeline center line */}
          <motion.div
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-[var(--accent-cyan)]/60 via-[var(--accent-violet)]/40 to-transparent md:left-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {TIMELINE_ITEMS.map((item, index) => {
            const right = index % 2 === 1;
            const variants = right ? slideRight : slideLeft;

            return (
              <motion.div
                key={`${item.period}-${item.title}`}
                className={cn(
                  "relative pl-14 md:w-1/2 md:pl-0",
                  right ? "md:ml-auto md:pl-10" : "md:pr-10",
                )}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Timeline dot */}
                <span
                  className={cn(
                    "absolute top-8 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent-cyan)]/50 bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]",
                    right ? "left-[13px] md:-left-[7px]" : "left-[13px] md:-right-[7px]",
                  )}
                />

                <GlassCard hoverGlow="cyan" className="p-5 sm:p-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent-cyan)]/70 font-[family-name:var(--font-jetbrains-mono)]">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-lg text-white sm:text-xl font-[family-name:var(--font-syne)] font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[var(--text-secondary)] text-sm font-[family-name:var(--font-dm-sans)]">
                    {item.organization}
                  </p>

                  {item.subtitle && (
                    <p className="mt-2 text-[var(--accent-cyan)] text-sm font-medium font-[family-name:var(--font-dm-sans)]">
                      {item.subtitle}
                    </p>
                  )}

                  {item.bullets && (
                    <ul className="mt-4 space-y-2 text-[var(--text-secondary)] text-sm font-[family-name:var(--font-dm-sans)]">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
