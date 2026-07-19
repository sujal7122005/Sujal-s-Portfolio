"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SKILL_CATEGORIES } from "@/lib/constants";

export function Skills() {
  return (
    <section id="skills" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle label="Stack" heading="What I Build With" />

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--border-hover)] transition-colors duration-300"
            >
              <h3 className="text-[16px] font-[800] uppercase tracking-wide text-[var(--accent)] mb-5 font-[family-name:var(--font-sans)]">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="rounded-full bg-[var(--bg-elevated)] px-4 py-1.5 text-[14px] font-[700] text-[var(--text-primary)] transition-colors hover:bg-[var(--border)] font-[family-name:var(--font-sans)] uppercase"
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
