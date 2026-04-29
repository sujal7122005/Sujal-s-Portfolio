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
        <div className="pointer-events-auto ml-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 p-1.5 backdrop-blur-md">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/60 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/10"
          >
            Download PDF
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
