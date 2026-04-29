"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "@/lib/constants";

const accentBackground = {
  cyan: "from-cyan-400/20 to-cyan-200/5",
  violet: "from-violet-400/20 to-violet-200/5",
  green: "from-emerald-400/20 to-emerald-200/5",
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
                    <p className="text-xs tracking-[0.2em] text-cyan-300 font-[family-name:var(--font-jetbrains-mono)]">
                      [{String(project.id).padStart(2, "0")}] {project.tagline}
                    </p>
                    <h3 className="mt-3 text-3xl text-slate-100 sm:text-4xl font-[family-name:var(--font-syne)]">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-slate-300 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300 font-[family-name:var(--font-jetbrains-mono)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-5 space-y-2 text-slate-300 text-sm sm:text-base font-[family-name:var(--font-dm-sans)]">
                      {project.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-cyan-300" />
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
                      <span className="ml-1 text-xl text-cyan-200 transition-transform duration-300 group-hover:translate-x-2">
                        ----
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -4, x: 4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative min-h-[230px] rounded-2xl border border-white/10 bg-gradient-to-br ${accentBackground[project.accent]} p-6`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_55%)]" />
                    <p className="relative text-xs tracking-[0.18em] text-slate-300 font-[family-name:var(--font-jetbrains-mono)]">
                      FEATURED PROJECT
                    </p>
                    <h4 className="relative mt-6 text-4xl text-slate-100/85 sm:text-5xl font-[family-name:var(--font-bebas)]">
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
