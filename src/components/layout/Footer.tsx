"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#181818] py-10">
      <div className="mx-auto flex w-[min(92vw,1200px)] flex-col gap-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/Logo%20(2).png"
            alt="Sujal Patel Logo"
            width={26}
            height={26}
          />
          <span className="uppercase tracking-[0.2em]">Sujal Patel</span>
          <span className="hidden text-white/40 md:inline">|</span>
          <span className="text-white/50">Full Stack Developer</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© 2026 Sujal Patel</span>
          <MagneticButton href="#hero" variant="ghost" className="text-[11px]">
            Back to top
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
