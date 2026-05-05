"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-5 sm:px-8">
      <div className="mx-auto max-w-[1200px] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="font-[600] text-[var(--text-primary)] font-[family-name:var(--font-display)]">
            SP<span className="text-[var(--accent)]">.</span>
          </span>
          <span>© 2026 Sujal Patel</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Built with Next.js + <span className="animate-heart-pulse inline-block text-red-400">♥</span></span>
        </div>
        <MagneticButton href="#hero" variant="ghost" className="text-[12px]">
          Back to top ↑
        </MagneticButton>
      </div>
    </footer>
  );
}
