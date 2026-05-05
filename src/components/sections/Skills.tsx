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
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-[var(--border-hover)] transition-colors duration-300"
            >
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--accent)] mb-5 font-[family-name:var(--font-mono)]">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-[12px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] font-[family-name:var(--font-mono)]"
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
