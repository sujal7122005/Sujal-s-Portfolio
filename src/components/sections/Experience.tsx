"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TIMELINE_ITEMS } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle label="Experience" heading="My Journey" />

        <motion.div
          className="relative space-y-6 pl-8 md:pl-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical line — mobile left, desktop center */}
          <div className="absolute top-0 bottom-0 left-3 md:left-1/2 md:-translate-x-px w-px bg-[var(--border)]" />

          {TIMELINE_ITEMS.map((item, index) => {
            const isRight = index % 2 === 1;

            return (
              <motion.div
                key={`${item.period}-${item.title}`}
                variants={fadeUp}
                className={`relative md:w-[calc(50%-24px)] ${isRight ? "md:ml-auto" : ""}`}
              >
                {/* Dot */}
                <span className={`absolute top-7 -left-[25px] md:top-7 h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)] ${isRight ? "md:-left-[37px]" : "md:-right-[37px] md:left-auto"}`} />

                <GlassCard className="p-5 sm:p-6">
                  <p className="text-[14px] font-[800] uppercase tracking-wide text-[var(--accent)] mb-1 font-[family-name:var(--font-sans)]">
                    {item.period}
                  </p>
                  <h3 className="text-xl font-[800] text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-dim)] mt-0.5">
                    {item.organization}
                  </p>

                  {item.subtitle && (
                    <p className="mt-2 text-[14px] text-[var(--text-primary)] font-medium">
                      {item.subtitle}
                    </p>
                  )}

                  {item.bullets && (
                    <ul className="mt-3 space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[var(--text-dim)]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
