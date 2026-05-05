"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ABOUT_STATS } from "@/lib/constants";

const accentColors = ["var(--accent-cyan)", "var(--accent-violet)", "var(--accent-green)", "var(--accent-cyan)"];

export function About() {
  return (
    <section id="about" className="bg-[var(--bg-secondary)] px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto grid w-[min(94vw,1200px)] gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <SectionTitle label="// 01 ABOUT ME" heading="Who I Am" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative border-l-2 border-[var(--accent-cyan)]/30 pl-6"
          >
            {/* Glowing dot at top of border */}
            <span className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-cyan)]" />

            <p className="text-[var(--text-secondary)] text-base leading-relaxed sm:text-lg font-[family-name:var(--font-dm-sans)]">
              I&apos;m a Computer Engineering student at{" "}
              <span className="text-white">VGEC</span> with a{" "}
              <span className="text-[var(--accent-cyan)] font-medium">9.04 CGPA</span>,
              obsessed with building things that actually work at scale. I write
              TypeScript by day, think in systems by night, and lead a 20-member
              team at E-Cell VGEC.
            </p>
            <p className="mt-5 text-[var(--text-dim)] text-base leading-relaxed sm:text-lg font-[family-name:var(--font-dm-sans)]">
              I&apos;m looking for internship opportunities where I can contribute
              fast, learn faster, and ship software that matters.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {ABOUT_STATS.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <GlassCard hoverGlow={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "violet" : "green"} className="h-full p-6">
                <div
                  className="text-5xl leading-none font-[family-name:var(--font-bebas)]"
                  style={{ color: accentColors[index % accentColors.length] }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)] font-[family-name:var(--font-dm-sans)]">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
