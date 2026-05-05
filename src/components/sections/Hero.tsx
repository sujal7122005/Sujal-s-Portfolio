"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, letterReveal, staggerContainer } from "@/lib/animations";
import { HERO_ROLES } from "@/lib/constants";

const HeroSculpture = dynamic(
  () =>
    import("@/components/three/HeroSculpture").then(
      (mod) => mod.HeroSculpture,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] w-full items-center justify-center lg:h-[440px]">
        <div className="h-40 w-40 animate-pulse rounded-full bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/10" />
      </div>
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
      isFullyTyped && !isDeleting ? 1400 : isDeleting ? 40 : 80,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDeleting, roleIndex, typedText]);

  const marqueeItems = [
    "Software Engineering",
    "System Design",
    "Full-Stack Development",
    "Clean Architecture",
    "Performance Optimization",
    "Problem Solving",
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--bg-primary)] px-4 pt-24 pb-20 sm:px-6 lg:pt-28 lg:pb-24"
    >
      {/* Ambient glow backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-[500px] w-[500px] bg-[var(--accent-cyan)]/[0.06] blur-[180px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] bg-[var(--accent-violet)]/[0.08] blur-[160px]" />
      </div>

      <div className="relative mx-auto grid w-[min(94vw,1280px)] items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center lg:text-left"
        >
          {/* Greeting line */}
          <motion.p
            variants={fadeUp}
            className="text-[12px] uppercase tracking-[0.3em] text-[var(--accent-cyan)] font-[family-name:var(--font-jetbrains-mono)]"
          >
            &gt; Hello World, I&apos;m
          </motion.p>

          {/* Name — letter by letter reveal */}
          <motion.h1
            className="flex flex-wrap justify-center text-[clamp(3rem,9vw,7rem)] leading-[0.95] text-white font-[family-name:var(--font-bebas)] lg:justify-start"
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

          {/* Typewriter subtitle */}
          <motion.h2
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="min-h-[2.5rem] text-[14px] uppercase tracking-[0.2em] font-[family-name:var(--font-syne)]"
          >
            <span className="bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="inline-block h-5 w-[2px] translate-y-0.5 animate-caret bg-[var(--accent-cyan)]" />
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{ delay: 1 }}
            className="mx-auto max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:mx-0"
          >
            Computer Engineering student at VGEC with a <span className="text-white font-medium">9.04 CGPA</span>, building
            full-stack products with clean architecture and meaningful user
            impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href="#projects" variant="filled">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="/resume" variant="outline">
              View Resume
            </MagneticButton>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] lg:justify-start"
          >
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)]/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
            </span>
            Available for SDE / Full-Stack Internships
          </motion.div>
        </motion.div>

        {/* 3D Sculpture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <HeroSculpture />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 text-[var(--text-dim)]"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-jetbrains-mono)]">scroll</span>
          <span className="animate-scroll-bounce text-lg">↓</span>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] bg-gradient-to-r from-[var(--accent-cyan)]/10 via-[var(--accent-violet)]/10 to-[var(--accent-cyan)]/10">
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {marqueeItems.map((item) => (
              <span key={item} className="hero-marquee-item">
                ◆ {item}
              </span>
            ))}
            {marqueeItems.map((item) => (
              <span key={`${item}-repeat`} className="hero-marquee-item">
                ◆ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
