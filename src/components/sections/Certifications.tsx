"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { scaleUp, staggerContainer } from "@/lib/animations";
import { CERTIFICATIONS } from "@/lib/constants";

const accentColors = ["var(--accent-cyan)", "var(--accent-violet)", "var(--accent-green)", "var(--accent-cyan)"];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-[var(--bg-secondary)] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 05 CERTIFICATIONS" heading="Credentials" />
        <p className="-mt-6 mb-10 max-w-2xl text-[var(--text-secondary)] text-sm leading-relaxed sm:text-base font-[family-name:var(--font-dm-sans)]">
          Certifications that strengthen my engineering fundamentals in web
          development, cloud, and practical hackathon execution.
        </p>

        <motion.div
          className="grid gap-4 sm:gap-5 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={scaleUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <GlassCard
                hoverGlow={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "violet" : "green"}
                className="group relative h-full overflow-hidden p-5 sm:p-6 md:p-7"
              >
                {/* Hover glow effect */}
                <span className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(255,51,51,0.12),transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                {/* Left accent bar */}
                <span
                  className="pointer-events-none absolute left-0 top-0 h-full w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to bottom, ${accentColors[index]}, transparent)` }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  {/* Icon */}
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      style={{ color: accentColors[index] }}
                    >
                      <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4l-5.3 2.7 1-5.8L3.5 9.2l5.9-.9L12 3z" />
                    </svg>
                  </div>

                  <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]">
                    {cert.year}
                  </span>
                </div>

                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]">
                  Credential {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 text-lg leading-snug text-white sm:text-xl font-[family-name:var(--font-syne)] font-semibold">
                  {cert.name}
                </h3>

                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]">
                    Issuer
                  </p>
                  <p className="mt-1 text-[var(--text-secondary)] text-sm font-[family-name:var(--font-dm-sans)]">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span
                    className="inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: accentColors[index] }}
                  />
                  Completed certification
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
