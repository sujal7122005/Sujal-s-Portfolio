"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasCompleted = useRef(false);
  const rafId = useRef(0);

  const startAnimation = useCallback(() => {
    if (hasCompleted.current) return;

    const start = performance.now();

    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      setValue(target * eased);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        // Ensure we land exactly on the target value
        setValue(target);
        hasCompleted.current = true;
      }
    };

    rafId.current = requestAnimationFrame(tick);
  }, [duration, target]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Use IntersectionObserver that triggers once — even if user scrolls fast
    // through and the element has already passed viewport by the time we check,
    // we still complete the animation to the target value.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCompleted.current) {
          startAnimation();
          // Once triggered, stop observing — the animation will complete
          // to the final target value regardless of scroll position
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [startAnimation]);

  const displayDecimals = decimals ?? (target % 1 !== 0 ? 2 : 0);

  return (
    <span ref={ref}>
      {prefix}
      {displayDecimals > 0 ? value.toFixed(displayDecimals) : Math.round(value)}
      {suffix}
    </span>
  );
}
