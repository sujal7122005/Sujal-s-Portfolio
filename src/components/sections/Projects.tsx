"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "@/lib/constants";

const accentBackground = {
  cyan: "from-white/5 to-transparent",
  violet: "from-white/5 to-transparent",
  green: "from-white/5 to-transparent",
};

export function Projects() {
  return (
    <section
      id="projects"
      className="bg-[var(--bg-secondary)] px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 03 PROJECTS" heading="Things I've Built" />

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <GlassCard
                hoverGlow={project.accent}
                className="group relative overflow-hidden p-6 md:p-8"
              >
                <span className="pointer-events-none absolute right-6 top-3 text-[5.5rem] leading-none text-white/5 font-[family-name:var(--font-bebas)]">
                  {String(project.id).padStart(2, "0")}
                </span>

                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                      [{String(project.id).padStart(2, "0")}] {project.tagline}
                    </p>
                    <h3 className="mt-3 text-3xl text-white sm:text-4xl font-[family-name:var(--font-syne)]">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-white/70 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-5 space-y-2 text-white/70 text-sm sm:text-base">
                      {project.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--brand-red)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <MagneticButton href={project.sourceUrl} variant="outline">
                        View Source
                      </MagneticButton>
                      {project.liveUrl && (
                        <MagneticButton href={project.liveUrl} variant="filled">
                          Live Demo
                        </MagneticButton>
                      )}
                      <span className="ml-1 text-xl text-white/50 transition-transform duration-300 group-hover:translate-x-2">
                        ----
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -4, x: 4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative min-h-[230px] rounded-none border border-[var(--border)] bg-gradient-to-br ${accentBackground[project.accent]} p-6`}
                  >
                    <div className="absolute inset-0 rounded-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_55%)]" />
                    <p className="relative text-[11px] uppercase tracking-[0.2em] text-white/60">
                      FEATURED PROJECT
                    </p>
                    <h4 className="relative mt-6 text-4xl text-white/85 sm:text-5xl font-[family-name:var(--font-bebas)]">
                      {project.name}
                    </h4>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
