"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-deep)] py-12 px-8 mt-auto">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[16px] text-[var(--text-dim)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[18px] font-[800] tracking-tight text-[var(--text-on-dark)] font-[family-name:var(--font-sans)] uppercase">
            <span className="flex items-center justify-center h-8 w-8 rounded-[4px] bg-[var(--accent)] text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </span>
            SP
          </div>
          <p className="mt-4 max-w-sm text-[var(--text-dim)]">
            Built with Next.js &middot; © 2026 Sujal Patel
          </p>
        </div>
        <MagneticButton href="#hero" variant="ghost" className="text-[16px] text-[var(--text-on-dark)] border-t border-[var(--text-dim)] md:border-none pt-4 md:pt-0 w-full md:w-auto flex justify-start md:justify-center">
          Back to top ↑
        </MagneticButton>
      </div>
    </footer>
  );
}
