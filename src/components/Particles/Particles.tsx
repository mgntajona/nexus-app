"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/themes/ThemeProvider";
import type { ParticlePreset, ParticleShape } from "@/themes/tokens";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./Particles.module.css";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  driftPhase: number;
  driftSpeed: number;
  color: string;
  rotation: number;
};

function spawn(preset: ParticlePreset, width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: preset.minSize + Math.random() * (preset.maxSize - preset.minSize),
    speed: preset.speed * (0.6 + Math.random() * 0.8),
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.4 + Math.random() * 0.6,
    color: preset.colors[Math.floor(Math.random() * preset.colors.length)],
    rotation: Math.random() * Math.PI * 2,
  };
}

function draw(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  shape: ParticleShape,
  glow: number,
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.fillStyle = p.color;
  if (glow > 0) {
    ctx.shadowColor = p.color;
    ctx.shadowBlur = glow;
  }

  switch (shape) {
    case "petal":
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 1.7, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "ember":
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "spark":
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 2);
      ctx.lineTo(p.size * 0.6, 0);
      ctx.lineTo(0, p.size * 2);
      ctx.lineTo(-p.size * 0.6, 0);
      ctx.closePath();
      ctx.fill();
      break;
    case "dust":
    default:
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
  ctx.restore();
}

/**
 * A drifting particle field tuned by the active era's `particles` token.
 * Purely decorative (aria-hidden), sits behind content, and does nothing
 * at all when the visitor prefers reduced motion.
 */
export function Particles() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const preset = theme.particles;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: preset.count }, () => spawn(preset, width, height));
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed * dt;
        p.driftPhase += p.driftSpeed * dt;
        p.x += Math.sin(p.driftPhase) * preset.drift * dt;
        p.rotation += dt * 0.3;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        draw(ctx, p, preset.shape, preset.glow);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [theme, reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
