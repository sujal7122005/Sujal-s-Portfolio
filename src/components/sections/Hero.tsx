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
      <div className="h-[360px] w-full animate-pulse border border-white/15 bg-[#181818]" />
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

  const marqueeItems = [
    "Selected Work",
    "Product Systems",
    "Frontend Engineering",
    "Interaction Design",
    "Full-Stack Delivery",
    "Performance Focus",
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--bg-primary)] px-4 pt-28 pb-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] bg-[var(--brand-red)]/20 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] bg-white/10 blur-[140px]" />
        <div className="absolute inset-0 hero-grid-overlay" />
      </div>

      <div className="relative mx-auto grid w-[min(94vw,1280px)] items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-7"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.28em] text-white/60"
          >
            Sujal Patel | Full Stack Developer
          </motion.p>

          <motion.h1
            className="flex flex-wrap text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-white font-[family-name:var(--font-bebas)]"
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
            className="min-h-[2.25rem] text-[12px] uppercase tracking-[0.22em] text-white/70"
          >
            {typedText}
            <span className="inline-block h-6 w-[2px] translate-y-1 animate-caret bg-[var(--brand-red)]" />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 1 }}
            className="max-w-xl text-base text-white/70 sm:text-lg"
          >
            Computer Engineering student at VGEC with a 9.04 CGPA, building
            full-stack products with clean architecture and meaningful user
            impact.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="filled">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="/resume" variant="outline">
              View Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60"
          >
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-red)]/80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-red)]" />
            </span>
            Available for SDE / Full-Stack Internships
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <HeroSculpture />
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/50">
            Signature motion sculpture
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[var(--brand-red)]">
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {marqueeItems.map((item) => (
              <span key={item} className="hero-marquee-item">
                {item}
              </span>
            ))}
            {marqueeItems.map((item) => (
              <span key={`${item}-repeat`} className="hero-marquee-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
