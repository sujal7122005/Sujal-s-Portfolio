"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    const group = new THREE.Group();
    scene.add(group);

    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.42, 220, 24);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: "#f2f2f2",
      metalness: 0.75,
      roughness: 0.25,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);

    const ringGeometry = new THREE.TorusGeometry(2.6, 0.03, 16, 160);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#da291c",
      metalness: 0.9,
      roughness: 0.25,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.1;

    group.add(knot, ring);

    const starCount = 120;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 10;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 6;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const ambient = new THREE.AmbientLight(0xffffff, 0.28);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(4, 5, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-4, -2, 3);
    const rimLight = new THREE.DirectionalLight(0xda291c, 0.85);
    rimLight.position.set(-6, 2, -5);

    scene.add(ambient, keyLight, fillLight, rimLight);

    let frameId = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.35;
      knot.rotation.y = t * 0.45;
      ring.rotation.z = t * 0.15;
      ring.position.y = Math.sin(t * 0.8) * 0.08;
      stars.rotation.y = t * 0.05;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);

      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[360px] w-full border border-white/15 bg-[#181818]"
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label="3D sculpture" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
    </div>
  );
}
