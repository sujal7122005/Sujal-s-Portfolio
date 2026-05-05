"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ABOUT_STATS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="bg-[var(--bg-secondary)] px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid w-[min(94vw,1200px)] gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <SectionTitle label="// 01 ABOUT ME" heading="Who I Am" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="border-l-2 border-white/25 pl-6"
          >
            <p className="text-white/70 text-base leading-relaxed sm:text-lg">
              I am a Computer Engineering student at VGEC with a 9.04 CGPA,
              obsessed with building things that actually work at scale. I write
              TypeScript by day, think in systems by night, and lead a 20-member
              team at E-Cell VGEC.
            </p>
            <p className="mt-5 text-white/55 text-base leading-relaxed sm:text-lg">
              I am looking for internship opportunities where I can contribute
              fast, learn faster, and ship software that matters.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {ABOUT_STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <GlassCard hoverGlow="cyan" className="h-full p-6">
                <div className="text-white text-5xl leading-none font-[family-name:var(--font-bebas)]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-white/60">
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
