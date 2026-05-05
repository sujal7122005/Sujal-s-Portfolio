"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ABOUT_STATS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <SectionTitle label="About" heading="Who I Am" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            <p className="text-[var(--text-secondary)] text-base sm:text-[17px] leading-relaxed">
              I&apos;m a Computer Engineering student at <span className="text-[var(--text-primary)] font-medium">VGEC</span>, focused on building software that solves real problems. I write TypeScript, design systems, and ship production-ready applications.
            </p>
            <p className="text-[var(--text-secondary)] text-base sm:text-[17px] leading-relaxed">
              As the lead of a 20-member team at E-Cell VGEC, I&apos;ve organized events for 200+ attendees while maintaining a <span className="text-[var(--accent)] font-semibold">9.04 CGPA</span>.
            </p>
            <p className="text-[var(--text-dim)] text-base leading-relaxed">
              Looking for internship opportunities where I can contribute fast and ship software that matters.
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
          {ABOUT_STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <GlassCard className="p-6 h-full">
                <div className="text-4xl sm:text-5xl font-[800] tracking-tight text-[var(--text-primary)] font-[family-name:var(--font-display)]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-[13px] text-[var(--text-dim)] font-medium uppercase tracking-wide">
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
