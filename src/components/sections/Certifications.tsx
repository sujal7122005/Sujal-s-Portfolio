"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { scaleUp, staggerContainer } from "@/lib/animations";
import { CERTIFICATIONS } from "@/lib/constants";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-[var(--bg-secondary)] px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 05 CERTIFICATIONS" heading="Credentials" />
        <p className="-mt-6 mb-10 max-w-2xl text-white/70 text-sm leading-relaxed sm:text-base">
          Certifications that strengthen my engineering fundamentals in web
          development, cloud, and practical hackathon execution.
        </p>

        <motion.div
          className="grid gap-5 lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={scaleUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <GlassCard
                hoverGlow="cyan"
                className="group relative h-full overflow-hidden p-6 md:p-7"
              >
                <span className="pointer-events-none absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--brand-red)]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-white/20 bg-white/5 text-white/80">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4l-5.3 2.7 1-5.8L3.5 9.2l5.9-.9L12 3z" />
                    </svg>
                  </div>

                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {cert.year}
                  </span>
                </div>

                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  Credential {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 text-xl leading-snug text-white">
                  {cert.name}
                </h3>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Issuer
                  </p>
                  <p className="mt-1 text-white/70 text-sm">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[var(--brand-red)]" />
                  Completed certification
                </div>

                <p className="mt-1 text-white/40 text-xs">
                  Certificate available on request.
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
