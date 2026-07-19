"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CERTIFICATIONS } from "@/lib/constants";

export function Certifications() {
  return (
    <section id="certifications" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle label="Credentials" heading="Certifications" />

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div key={cert.id} variants={fadeUp}>
              <GlassCard className="p-5 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-[var(--accent)] font-[family-name:var(--font-sans)] text-[14px] font-[800] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-[var(--text-dim)] font-[family-name:var(--font-sans)] font-[700] uppercase">
                    {cert.year}
                  </span>
                </div>

                <h3 className="text-xl font-[800] text-[var(--text-primary)] mb-2 font-[family-name:var(--font-sans)]">
                  {cert.name}
                </h3>

                <p className="text-[13px] text-[var(--text-secondary)] mt-auto pt-3 border-t border-[var(--border)]">
                  {cert.issuer}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
