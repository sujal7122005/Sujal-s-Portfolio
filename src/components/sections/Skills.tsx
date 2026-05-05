"use client";

import { motion } from "framer-motion";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SKILL_CATEGORIES } from "@/lib/constants";

const colorCycle = ["cyan", "violet", "green"] as const;

export function Skills() {
  return (
    <section id="skills" className="bg-[var(--bg-primary)] px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 02 TECH STACK" heading="What I Build With" />

        <motion.div
          className="grid gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
            >
              <h3 className="mb-4 text-[12px] uppercase tracking-[0.25em] text-[var(--accent-cyan)]/70 font-[family-name:var(--font-jetbrains-mono)]">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill) => (
                  <NeonBadge
                    key={skill.label}
                    label={skill.label}
                    icon={skill.icon}
                    color={colorCycle[index % colorCycle.length]}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
