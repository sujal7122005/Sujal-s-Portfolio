"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const CONNECTION_DISTANCE = 120;
const REPULSE_DISTANCE = 80;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let particles: Particle[] = [];

    const mouse = { x: -9999, y: -9999 };

    const particleCount = () => (window.innerWidth < 768 ? 40 : 90);

    const createParticles = () => {
      particles = Array.from({ length: particleCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.4 + 0.8,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouse.y;
        const mouseDistance = Math.hypot(dxMouse, dyMouse);

        if (mouseDistance < REPULSE_DISTANCE) {
          const force = (REPULSE_DISTANCE - mouseDistance) / REPULSE_DISTANCE;
          particle.vx += (dxMouse / (mouseDistance || 1)) * force * 0.18;
          particle.vy += (dyMouse / (mouseDistance || 1)) * force * 0.18;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.35)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.22;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ willChange: "transform" }}
      aria-hidden
    />
  );
}
