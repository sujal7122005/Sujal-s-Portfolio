"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroTerminal } from "@/components/ui/HeroTerminal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { HERO_ROLES } from "@/lib/constants";

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

    const timeout = setTimeout(
      () => {
        if (!isDeleting && !isFullyTyped) {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        } else if (!isDeleting && isFullyTyped) {
          setIsDeleting(true);
        } else if (isDeleting && !isEmpty) {
          setTypedText(currentRole.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
        }
      },
      isFullyTyped && !isDeleting ? 1800 : isDeleting ? 35 : 70,
    );
    return () => clearTimeout(timeout);
  }, [isDeleting, roleIndex, typedText]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center px-5 sm:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-[1200px] grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
        {/* Left: Text content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-1.5 text-[12px] text-[var(--text-secondary)] font-[family-name:var(--font-mono)] mx-auto lg:mx-0">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Open to opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.5rem,7vw,5rem)] font-[900] leading-[1.05] tracking-tight font-[family-name:var(--font-display)]"
          >
            {letters.map((char, i) => (
              <span key={i} className={char !== " " ? "inline-block" : ""}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[15px] sm:text-[17px] font-[family-name:var(--font-mono)] text-[var(--text-secondary)] min-h-[1.8em]">
            {typedText}
            <span className="animate-caret inline-block h-[1.1em] w-[2px] ml-0.5 -mb-0.5 bg-[var(--accent)]" />
          </motion.p>

          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-base sm:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
            Computer Engineering at VGEC · <span className="text-[var(--text-primary)] font-semibold">9.04 CGPA</span>
            <br />
            Building full-stack products with clean architecture.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <MagneticButton href="#projects" variant="filled">
              View Projects →
            </MagneticButton>
            <MagneticButton href="/resume" variant="outline">
              Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right: Code terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <HeroTerminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="animate-scroll-hint block text-[var(--text-dim)] text-xl"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}
