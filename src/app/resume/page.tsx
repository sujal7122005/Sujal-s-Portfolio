import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Sujal Patel",
  description: "Resume of Sujal Patel",
};

export default function ResumePage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[var(--bg-primary)]">
      <iframe
        src="/resume.pdf#view=Fit"
        title="Sujal Patel Resume"
        className="absolute inset-0 h-full w-full border-0"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-3 sm:p-4">
        <div className="pointer-events-auto ml-auto flex w-fit items-center gap-2 border border-white/15 bg-[#181818]/90 p-1.5">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-none bg-[var(--brand-red)] px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-white transition hover:bg-[var(--brand-red-active)]"
          >
            Download PDF
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-none border border-white/40 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-white transition hover:border-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
