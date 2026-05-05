"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "@/lib/constants";

export function Projects() {
  return (
    <section id="projects" className="px-5 sm:px-8 py-24 md:py-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle label="Projects" heading="Things I've Built" />

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp}>
              <GlassCard className="group p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[var(--accent)] font-[family-name:var(--font-mono)] text-[13px] font-medium">
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <span className="text-[var(--text-dim)] text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-wider">
                        {project.tagline}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl sm:text-3xl font-[700] text-[var(--text-primary)] mb-3 font-[family-name:var(--font-display)]">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-5 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-dim)] font-[family-name:var(--font-mono)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-6">
                      {project.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[14px] text-[var(--text-secondary)]">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      <MagneticButton href={project.sourceUrl} variant="outline">
                        Source Code ↗
                      </MagneticButton>
                      {project.liveUrl && (
                        <MagneticButton href={project.liveUrl} variant="filled">
                          Live Demo ↗
                        </MagneticButton>
                      )}
                    </div>
                  </div>

                  {/* Project number watermark — desktop only */}
                  <div className="hidden lg:flex items-start justify-end">
                    <span className="text-[8rem] font-[900] leading-none text-[var(--bg-secondary)] font-[family-name:var(--font-display)] select-none group-hover:text-[var(--bg-card)] transition-colors duration-500">
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
