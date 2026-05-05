"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const labels = [
  "React",
  "Next",
  "Node",
  "TypeScript",
  "MongoDB",
  "Express",
  "Tailwind",
  "Python",
  "Git",
  "Cloud",
];

const rotationAxis = new THREE.Vector3(0, 1, 0);

export function TechGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: "#FF3333",
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const glowGeometry = new THREE.SphereGeometry(2.9, 24, 24);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#FF3333",
      transparent: true,
      opacity: 0.06,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);

    const basePositions = labels.map((_, index) => {
      const phi = Math.acos(-1 + (2 * (index + 1)) / labels.length);
      const theta = Math.sqrt(labels.length * Math.PI) * phi;
      return new THREE.Vector3().setFromSphericalCoords(3.3, phi, theta);
    });

    let frameId = 0;
    let speed = 0.003;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      globe.rotation.y += speed;
      glowSphere.rotation.y -= speed * 0.7;
      renderer.render(scene, camera);

      const width = container.clientWidth;
      const height = container.clientHeight;

      basePositions.forEach((position, index) => {
        const element = labelRefs.current[index];
        if (!element) {
          return;
        }

        const rotated = position.clone().applyAxisAngle(rotationAxis, globe.rotation.y);
        const projected = rotated.clone().project(camera);

        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;

        const depth = Math.max(0, Math.min(1, (rotated.z + 4) / 8));
        const scale = 0.7 + depth * 0.45;
        const opacity = 0.3 + depth * 0.7;

        element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        element.style.opacity = String(opacity);
      });

      frameId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      speed = 0.008;
    };

    const onLeave = () => {
      speed = 0.003;
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);

      geometry.dispose();
      material.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="relative mx-auto h-[280px] w-[280px]">
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,51,51,0.55),rgba(124,58,237,0.3),rgba(255,51,51,0.55))] blur-md" />
        <div className="absolute inset-6 animate-spin-slow rounded-full border border-red-400/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,51,51,0.3),rgba(2,8,23,0.2)_55%,transparent_80%)]" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[390px] w-full max-w-[420px]">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Rotating technology globe" />
      {labels.map((label, index) => (
        <span
          key={label}
          ref={(node) => {
            labelRefs.current[index] = node;
          }}
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/20 bg-slate-900/75 px-2 py-1 text-[11px] text-red-200 backdrop-blur-sm font-[family-name:var(--font-jetbrains-mono)]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
