"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const { ref, isIntersecting } = useIntersection<HTMLSpanElement>({
    threshold: 0.4,
  });

  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isIntersecting || hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    const start = performance.now();

    let rafId = 0;
    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      setValue(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [duration, isIntersecting, target]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
}
