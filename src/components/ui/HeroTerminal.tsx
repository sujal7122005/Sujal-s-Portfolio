"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { indent: 0, text: 'const developer = {', color: 'text-[var(--accent)]' },
  { indent: 1, text: 'name: "Sujal Patel",', color: 'text-[var(--text-primary)]' },
  { indent: 1, text: 'role: "Full-Stack Engineer",', color: 'text-[var(--text-primary)]' },
  { indent: 1, text: 'stack: ["Next.js", "React", "Node", "TypeScript"],', color: 'text-[var(--text-primary)]' },
  { indent: 1, text: 'cgpa: 9.04,', color: 'text-[var(--text-primary)]' },
  { indent: 1, text: 'available: true,', color: 'text-green-400' },
  { indent: 0, text: '};', color: 'text-[var(--accent)]' },
  { indent: 0, text: '', color: '' },
  { indent: 0, text: 'async function buildSomethingGreat() {', color: 'text-[var(--accent)]' },
  { indent: 1, text: 'const idea = await getInspiration();', color: 'text-[var(--text-secondary)]' },
  { indent: 1, text: 'const product = await ship(idea);', color: 'text-[var(--text-secondary)]' },
  { indent: 1, text: 'return product; // 🚀', color: 'text-[var(--text-secondary)]' },
  { indent: 0, text: '}', color: 'text-[var(--accent)]' },
];

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 120);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="w-full max-w-[520px] mx-auto lg:mx-0">
      {/* Terminal window */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-[11px] text-[var(--text-dim)] font-[family-name:var(--font-mono)]">
            developer.ts
          </span>
        </div>

        {/* Code content */}
        <div className="p-5 font-[family-name:var(--font-mono)] text-[13px] leading-[1.8] min-h-[320px]">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={index < visibleLines ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex"
            >
              {/* Line number */}
              <span className="w-8 shrink-0 text-right pr-4 text-[var(--text-dim)] select-none text-[12px]">
                {index + 1}
              </span>
              {/* Code */}
              <span className={line.color}>
                {"  ".repeat(line.indent)}
                {line.text}
              </span>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          {visibleLines >= codeLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex"
            >
              <span className="w-8 shrink-0 text-right pr-4 text-[var(--text-dim)] select-none text-[12px]">
                {codeLines.length + 1}
              </span>
              <span className="animate-caret inline-block h-4 w-[7px] bg-[var(--accent)]" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
