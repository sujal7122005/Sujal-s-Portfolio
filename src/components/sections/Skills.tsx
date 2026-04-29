"use client";

import { motion } from "framer-motion";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SKILL_CATEGORIES } from "@/lib/constants";

const colorCycle = ["cyan", "violet", "green"] as const;

export function Skills() {
  return (
    <section id="skills" className="bg-[var(--bg-primary)] px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 02 TECH STACK" heading="What I Build With" />

        <motion.div
          className="grid gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300 font-[family-name:var(--font-jetbrains-mono)]">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
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
