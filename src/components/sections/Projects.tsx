"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "@/lib/constants";

const accentColor = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  green: "var(--accent-green)",
};

const accentGradient = {
  cyan: "from-[rgba(255,51,51,0.08)] to-transparent",
  violet: "from-[rgba(124,58,237,0.08)] to-transparent",
  green: "from-[rgba(0,255,136,0.08)] to-transparent",
};

export function Projects() {
  return (
    <section
      id="projects"
      className="bg-[var(--bg-secondary)] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto w-[min(94vw,1200px)]">
        <SectionTitle label="// 03 PROJECTS" heading="Things I've Built" />

        <motion.div
          className="space-y-6 lg:space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <GlassCard
                hoverGlow={project.accent}
                className="group relative overflow-hidden p-5 sm:p-6 md:p-8"
              >
                {/* Background watermark number */}
                <span
                  className="pointer-events-none absolute right-4 top-2 text-[6rem] leading-none font-[family-name:var(--font-bebas)]"
                  style={{ color: accentColor[project.accent], opacity: 0.06 }}
                >
                  {String(project.id).padStart(2, "0")}
                </span>

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center lg:gap-8">
                  <div>
                    {/* Project number + tagline */}
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]">
                      [{String(project.id).padStart(2, "0")}] {project.tagline}
                    </p>

                    {/* Project name */}
                    <h3 className="mt-3 text-2xl text-white sm:text-3xl lg:text-4xl font-[family-name:var(--font-syne)] font-semibold">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base font-[family-name:var(--font-dm-sans)]">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.1em] font-[family-name:var(--font-jetbrains-mono)]"
                          style={{ color: accentColor[project.accent] + "cc" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="mt-5 space-y-2 text-[var(--text-secondary)] text-sm sm:text-base font-[family-name:var(--font-dm-sans)]">
                      {project.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: accentColor[project.accent] }}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action buttons */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <MagneticButton href={project.sourceUrl} variant="outline">
                        View Source ↗
                      </MagneticButton>
                      {project.liveUrl && (
                        <MagneticButton href={project.liveUrl} variant="filled">
                          Live Demo ↗
                        </MagneticButton>
                      )}
                      <span className="ml-1 text-xl text-white/20 transition-all duration-300 group-hover:translate-x-3 group-hover:text-white/40">
                        →→→
                      </span>
                    </div>
                  </div>

                  {/* Project visual placeholder */}
                  <motion.div
                    whileHover={{ y: -6, x: 4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className={`relative hidden min-h-[230px] rounded-2xl border border-white/[0.06] bg-gradient-to-br ${accentGradient[project.accent]} p-6 lg:block`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
                    <p className="relative text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)] font-[family-name:var(--font-jetbrains-mono)]">
                      FEATURED PROJECT
                    </p>
                    <h4
                      className="relative mt-6 text-4xl sm:text-5xl font-[family-name:var(--font-bebas)]"
                      style={{ color: accentColor[project.accent], opacity: 0.6 }}
                    >
                      {project.name}
                    </h4>
                    {/* Decorative corner lines */}
                    <div className="absolute top-4 right-4 h-8 w-8 border-t border-r" style={{ borderColor: accentColor[project.accent] + "30" }} />
                    <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l" style={{ borderColor: accentColor[project.accent] + "30" }} />
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
