"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Professional 3D scene for a software engineer portfolio:
 * A glowing wireframe icosahedron (polyhedron = complexity of engineering)
 * surrounded by orbiting data nodes connected by light beams,
 * with floating code-like particle streams.
 */
export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || prefersReducedMotion) {
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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.5, 7);

    const group = new THREE.Group();
    scene.add(group);

    // Main shape: wireframe icosahedron — represents engineering complexity
    const icoGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeometry);
    const icoMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FF3333"),
      transparent: true,
      opacity: 0.5,
    });
    const icoWireframe = new THREE.LineSegments(icoEdges, icoMaterial);
    group.add(icoWireframe);

    // Inner core: small glowing sphere
    const coreGeometry = new THREE.SphereGeometry(0.45, 24, 24);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7C3AED"),
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    // Core glow sphere
    const glowGeometry = new THREE.SphereGeometry(0.65, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF3333"),
      transparent: true,
      opacity: 0.08,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    group.add(glowSphere);

    // Outer ring — like a data orbit
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.015, 16, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF3333"),
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2.5;
    ring1.rotation.z = 0.3;
    group.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(3.2, 0.01, 16, 128);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7C3AED"),
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = -0.5;
    group.add(ring2);

    // Orbiting data nodes — small spheres on ring paths
    const nodeCount = 6;
    const nodeGeometry = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00FF88"),
      transparent: true,
      opacity: 0.85,
    });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      group.add(node);
      nodes.push(node);
    }

    // Floating particles — simulating data stream / code particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;
      particleSpeeds.push(Math.random() * 0.003 + 0.001);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#FF3333"),
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    let frameId = 0;
    const clock = new THREE.Clock();
    let isHovered = false;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = isHovered ? 1.8 : 1;

      // Rotate the main structure
      icoWireframe.rotation.x = t * 0.15 * speed;
      icoWireframe.rotation.y = t * 0.2 * speed;

      // Pulsing core
      const pulse = 1 + Math.sin(t * 2) * 0.08;
      core.scale.set(pulse, pulse, pulse);
      glowSphere.scale.set(pulse * 1.3, pulse * 1.3, pulse * 1.3);

      // Rotate rings
      ring1.rotation.z = 0.3 + t * 0.08 * speed;
      ring2.rotation.z = -0.5 - t * 0.06 * speed;

      // Orbit data nodes
      nodes.forEach((node, i) => {
        const angle = t * (0.3 + i * 0.08) * speed + (i * Math.PI * 2) / nodeCount;
        const radius = 2.8 + (i % 2) * 0.4;
        const tilt = i % 2 === 0 ? Math.PI / 2.5 : Math.PI / 1.8;
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle) * radius * Math.cos(tilt);
        node.position.z = Math.sin(angle) * radius * Math.sin(tilt) * 0.5;
        // Pulse the node opacity
        const mat = node.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.6 + Math.sin(t * 3 + i) * 0.35;
      });

      // Slowly drift particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= particleSpeeds[i];
        if (positions[i3 + 1] < -4) {
          positions[i3 + 1] = 4;
          positions[i3] = (Math.random() - 0.5) * 12;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };

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

      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[380px] w-full lg:h-[440px]"
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label="3D engineering sculpture — wireframe polyhedron with orbiting data nodes" />
      {/* Ambient glow behind the sculpture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,51,51,0.08),transparent_60%)]" />
    </div>
  );
}
