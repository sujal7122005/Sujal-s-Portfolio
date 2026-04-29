"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersection<T extends Element>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { root = null, rootMargin = "0px", threshold = 0.2 } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [root, rootMargin, threshold]);

  return { ref, isIntersecting };
}
