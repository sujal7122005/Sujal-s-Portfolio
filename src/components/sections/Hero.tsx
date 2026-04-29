"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticleField } from "@/components/ui/ParticleField";
import { fadeUp, letterReveal, staggerContainer } from "@/lib/animations";
import { HERO_ROLES } from "@/lib/constants";

const TechGlobe = dynamic(
  () => import("@/components/three/TechGlobe").then((mod) => mod.TechGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="h-[390px] w-full max-w-[420px] animate-pulse rounded-full border border-cyan-300/20 bg-cyan-300/5" />
    ),
  },
);

const heroName = "SUJAL PATEL";

export function Hero() {
  const letters = useMemo(() => heroName.split(""), []);

  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = HERO_ROLES[roleIndex].label;
    const isFullyTyped = typedText === currentRole;
    const isEmpty = typedText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isFullyTyped) {
          setTypedText(currentRole.slice(0, typedText.length + 1));
          return;
        }

        if (!isDeleting && isFullyTyped) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isEmpty) {
          setTypedText(currentRole.slice(0, typedText.length - 1));
          return;
        }

        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      },
      isFullyTyped && !isDeleting ? 1100 : isDeleting ? 45 : 90,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDeleting, roleIndex, typedText]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-primary)] px-4 pt-28 pb-16 sm:px-6"
    >
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(0,212,255,0.12),transparent_50%),radial-gradient(circle_at_24%_80%,rgba(124,58,237,0.12),transparent_55%)]" />

      <div className="relative mx-auto grid w-[min(94vw,1280px)] items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-cyan-300 text-sm sm:text-base font-[family-name:var(--font-jetbrains-mono)]"
          >
            {"> Hello World, I'm"}
          </motion.p>

          <motion.h1
            className="flex flex-wrap text-6xl leading-[0.95] text-slate-100 sm:text-7xl lg:text-[7.5rem] font-[family-name:var(--font-bebas)]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } },
            }}
          >
            {letters.map((char, index) => (
              <motion.span key={`${char}-${index}`} variants={letterReveal}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="min-h-[2.25rem] bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-2xl text-transparent sm:text-3xl font-[family-name:var(--font-syne)]"
          >
            {typedText}
            <span className="inline-block h-7 w-[2px] translate-y-1 animate-caret bg-cyan-300" />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 1 }}
            className="max-w-xl text-base text-slate-300 sm:text-lg font-[family-name:var(--font-dm-sans)]"
          >
            Computer Engineering student at VGEC with a 9.04 CGPA, building
            full-stack products with clean architecture and meaningful user
            impact.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="filled">
              Explore My Work
            </MagneticButton>
            <MagneticButton
              href="/resume"
              variant="outline"
            >
              View Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-2 text-sm text-slate-300 tracking-[0.1em] font-[family-name:var(--font-jetbrains-mono)]"
          >
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/90" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
            Available for SDE / Full-Stack Internships
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative mx-auto w-full max-w-[440px]"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan-300/8 blur-3xl" />
          <TechGlobe />
        </motion.div>
      </div>

      <a
        href="#about"
        data-cursor-hover="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cyan-300 text-xl"
        aria-label="Scroll to About"
      >
        v
      </a>
    </section>
  );
}
