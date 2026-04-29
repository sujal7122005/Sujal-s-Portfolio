"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-8">
      <div className="mx-auto flex w-[min(92vw,1200px)] flex-col gap-4 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-cyan-300 tracking-[0.2em] font-[family-name:var(--font-space-mono)]">
            SP
          </span>
          <span className="font-[family-name:var(--font-dm-sans)]">
            Copyright 2026 Sujal Patel. Built with Next.js +
            <span className="ml-1 inline-block animate-heart-pulse text-cyan-300">love</span>
          </span>
        </div>

        <MagneticButton href="#hero" variant="ghost" className="w-fit">
          Back to top
        </MagneticButton>
      </div>
    </footer>
  );
}
