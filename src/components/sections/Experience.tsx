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
      className="bg-[var(--bg-primary)] px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 04 EXPERIENCE" heading="My Journey" />

        <div className="relative mt-12 space-y-8">
          <motion.div
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-transparent via-white/40 to-transparent md:left-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {TIMELINE_ITEMS.map((item, index) => {
            const right = index % 2 === 1;
            const variants = right ? slideRight : slideLeft;

            return (
              <motion.div
                key={`${item.period}-${item.title}`}
                className={cn(
                  "relative pl-12 md:w-1/2 md:pl-0",
                  right ? "md:ml-auto md:pl-10" : "md:pr-10",
                )}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span
                  className={cn(
                    "absolute top-8 h-3 w-3 rounded-full border border-white/60 bg-[var(--brand-red)]",
                    right ? "left-[10px] md:-left-[6px]" : "left-[10px] md:-right-[6px]",
                  )}
                />

                <GlassCard hoverGlow="cyan" className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-white/60 text-sm">
                    {item.organization}
                  </p>

                  {item.subtitle && (
                    <p className="mt-2 text-white/70 text-sm">
                      {item.subtitle}
                    </p>
                  )}

                  {item.bullets && (
                    <ul className="mt-4 space-y-2 text-white/70 text-sm">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--brand-red)]" />
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
