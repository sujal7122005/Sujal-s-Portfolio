"use client";

import type { MouseEventHandler } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMagneticEffectOptions {
  strength?: number;
  stiffness?: number;
  damping?: number;
}

export function useMagneticEffect(options?: UseMagneticEffectOptions) {
  const { strength = 4, stiffness = 200, damping = 20 } = options ?? {};

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const x = useSpring(motionX, { stiffness, damping });
  const y = useSpring(motionY, { stiffness, damping });

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (event.clientX - centerX) / strength;
    const offsetY = (event.clientY - centerY) / strength;

    motionX.set(offsetX);
    motionY.set(offsetY);
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = () => {
    motionX.set(0);
    motionY.set(0);
  };

  return { x, y, onMouseMove, onMouseLeave };
}
