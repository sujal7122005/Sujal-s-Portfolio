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
    "mx-auto flex h-16 w-[min(94vw,1200px)] items-center justify-between border-b border-white/15 px-2 transition-all duration-300 md:px-0",
    isScrolled
      ? "bg-[#181818]/90"
      : "bg-transparent",
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[#181818]">
        <nav className={containerClassName}>
          <a
            href="#hero"
            className="flex items-center gap-3 text-white"
            data-cursor-hover="true"
          >
            <Image
              src="/Logo%20(2).png"
              alt="Sujal Patel Logo"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-xs uppercase tracking-[0.32em]">Sujal Patel</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor-hover="true"
                className="text-[12px] uppercase tracking-[0.22em] text-white/75 transition-colors hover:text-white"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-white/20 text-white md:hidden"
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
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#181818] md:hidden"
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
                  className="text-2xl uppercase tracking-[0.2em] text-white"
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
