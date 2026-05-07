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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-[var(--bg-primary)]/90 backdrop-blur-md" : "bg-transparent",
      )}>
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <a href="#hero" className="text-[15px] font-[700] tracking-tight text-[var(--text-primary)] font-[family-name:var(--font-display)]">
            SP<span className="text-[var(--accent)]">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium">
                {item.label}
              </a>
            ))}
            <MagneticButton href="/resume" variant="filled" className="text-[12px] px-4 py-2">
              Resume
            </MagneticButton>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-[var(--text-secondary)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>

        {/* Professional gradient separator */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border) 15%, var(--accent) 50%, var(--border) 85%, transparent 100%)",
          }}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center border border-[var(--brand-red)] text-[var(--brand-red)] transition hover:bg-[var(--brand-red)] hover:text-white"
            >
              <svg
                width="18"
                height="18"
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
                className="text-2xl font-[600] text-[var(--text-primary)] font-[family-name:var(--font-display)]"
              >
                {item.label}
              </motion.a>
            ))}
            <MagneticButton href="/resume" variant="filled">Resume</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
