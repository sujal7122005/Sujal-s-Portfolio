"use client";

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const containerClassName = cn(
    "mx-auto mt-5 w-[min(94vw,920px)] rounded-full border px-4 py-2 transition-all duration-300 md:px-6",
    "backdrop-blur-xl",
    isScrolled
      ? "border-white/15 bg-slate-950/75 shadow-[0_0_30px_rgba(0,212,255,0.12)]"
      : "border-white/8 bg-slate-950/40",
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className={containerClassName}>
          <div className="flex items-center justify-between gap-4">
            <a
              href="#hero"
              className="text-cyan-300 text-lg tracking-[0.2em] font-[family-name:var(--font-space-mono)]"
              data-cursor-hover="true"
            >
              SP
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor-hover="true"
                  className="group relative text-sm text-slate-200/90 transition-colors hover:text-cyan-200 font-[family-name:var(--font-dm-sans)]"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticButton
                href="/resume"
                variant="outline"
                className="text-xs"
              >
                Download CV
              </MagneticButton>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-100 md:hidden"
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
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/95 md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  data-cursor-hover="true"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.3 }}
                  className="text-2xl text-slate-100 font-[family-name:var(--font-syne)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
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
