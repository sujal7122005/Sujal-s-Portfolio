"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--bg-primary)] py-10">
      <div className="mx-auto flex w-[min(92vw,1200px)] flex-col gap-6 text-xs text-[var(--text-dim)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 font-[family-name:var(--font-dm-sans)]">
          <span className="text-base font-bold tracking-wider text-[var(--accent-cyan)] font-[family-name:var(--font-space-mono)]">
            SP
          </span>
          <span className="uppercase tracking-[0.2em] text-[var(--text-secondary)]">Sujal Patel</span>
          <span className="hidden text-white/20 md:inline">|</span>
          <span className="text-[var(--text-dim)]">
            Built with Next.js +{" "}
            <span className="inline-block animate-heart-pulse text-red-400">♡</span>
          </span>
        </div>

        <div className="flex items-center gap-6 font-[family-name:var(--font-dm-sans)]">
          <span className="text-[var(--text-dim)]">© 2026 Sujal Patel</span>
          <MagneticButton href="#hero" variant="ghost" className="text-[11px]">
            ↑ Back to top
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
