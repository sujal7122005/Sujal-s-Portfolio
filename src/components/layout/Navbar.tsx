"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#020817]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 w-[min(94vw,1200px)] items-center justify-between px-2 md:px-0">
          <a
            href="#hero"
            className="flex items-center gap-3 text-white"
            data-cursor-hover="true"
          >
            <span className="text-lg font-bold tracking-wider text-[var(--accent-cyan)] font-[family-name:var(--font-space-mono)]">
              SP
            </span>
            <span className="hidden text-xs uppercase tracking-[0.28em] text-white/70 sm:inline font-[family-name:var(--font-dm-sans)]">
              Sujal Patel
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor-hover="true"
                className="relative text-[12px] uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 hover:text-[var(--accent-cyan)] font-[family-name:var(--font-dm-sans)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton href="/resume" variant="outline" className="text-[11px]">
              Download CV
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-[var(--accent-cyan)]/30 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="relative block h-4 w-4">
              <span
                className={cn(
                  "absolute left-0 top-[2px] h-0.5 w-4 bg-current transition-transform duration-300",
                  isMenuOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-0.5 w-4 bg-current transition-opacity duration-300",
                  isMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[12px] h-0.5 w-4 bg-current transition-transform duration-300",
                  isMenuOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#020817]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  data-cursor-hover="true"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.4 }}
                  className="text-2xl uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-[var(--accent-cyan)] font-[family-name:var(--font-syne)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4"
              >
                <MagneticButton
                  href="/resume"
                  variant="filled"
                >
                  Download CV
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
