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
        <p className="-mt-6 mb-10 max-w-2xl text-slate-300 text-sm leading-relaxed sm:text-base font-[family-name:var(--font-dm-sans)]">
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
                <span className="pointer-events-none absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-300/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
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

                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-300 font-[family-name:var(--font-jetbrains-mono)]">
                    {cert.year}
                  </span>
                </div>

                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-cyan-300/90 font-[family-name:var(--font-jetbrains-mono)]">
                  Credential {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-3 text-xl leading-snug text-slate-100 font-[family-name:var(--font-syne)]">
                  {cert.name}
                </h3>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 font-[family-name:var(--font-jetbrains-mono)]">
                    Issuer
                  </p>
                  <p className="mt-1 text-slate-300 text-sm font-[family-name:var(--font-dm-sans)]">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-200 font-[family-name:var(--font-dm-sans)]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(0,255,136,0.65)]" />
                  Completed certification
                </div>

                <p className="mt-1 text-slate-500 text-xs font-[family-name:var(--font-dm-sans)]">
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
