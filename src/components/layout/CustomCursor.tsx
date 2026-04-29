"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) {
      return;
    }

    const dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: dotPos.x, y: dotPos.y };

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const pointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest("a, button, [data-cursor-hover='true']")));
    };

    const pointerDown = () => {
      setClicked(true);
      window.setTimeout(() => setClicked(false), 130);
    };

    const pointerUp = () => {
      setClicked(false);
    };

    const animate = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.35;
      dotPos.y += (mouse.y - dotPos.y) * 0.35;
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.body.classList.add("custom-cursor-enabled");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", pointerOver);
    window.addEventListener("mousedown", pointerDown);
    window.addEventListener("mouseup", pointerUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", pointerOver);
      window.removeEventListener("mousedown", pointerDown);
      window.removeEventListener("mouseup", pointerUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={cn(
          "custom-cursor-layer pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-cyan-300",
          "shadow-[0_0_14px_rgba(0,212,255,0.95)] transition-transform duration-75",
          clicked && "scale-75",
        )}
      />
      <div
        ref={ringRef}
        className={cn(
          "custom-cursor-layer pointer-events-none fixed left-0 top-0 z-[9997] h-8 w-8 rounded-full border border-white/35",
          "transition-[width,height,background-color,border-color,transform] duration-150",
          hovered && "h-12 w-12 border-cyan-300/70 bg-cyan-300/10",
          clicked && "scale-90",
        )}
      />
    </>
  );
}
