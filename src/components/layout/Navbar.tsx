"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <>
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-[var(--bg-deep)] border-white/10 py-2" : "bg-transparent border-transparent py-4"
      )}>
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 text-[16px] font-[800] tracking-tight text-[var(--text-on-dark)] font-[family-name:var(--font-sans)] uppercase">
            <span className="flex items-center justify-center h-10 w-10 rounded-[6px] bg-[var(--accent)] text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </span>
            <span className="hidden sm:block mt-0.5">SUJAL PATEL</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] font-[700] uppercase tracking-wide text-[var(--text-on-dark)] hover:text-[var(--accent)] transition-colors">
                {item.label}
              </a>
            ))}
            <MagneticButton href="/resume" variant="filled" className="text-[14px] px-6 py-2 border-none">
              Resume
            </MagneticButton>
          </div>

          <button
            type="button"
            className="md:hidden flex items-center justify-center h-10 w-10 text-[var(--text-on-dark)] rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-deep)] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition hover:bg-[var(--accent)] hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-[40px] font-[800] uppercase tracking-[-1px] text-[var(--text-on-dark)] font-[family-name:var(--font-sans)] hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <MagneticButton href="/resume" variant="filled" className="mt-4 text-[18px]">
              Resume
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
