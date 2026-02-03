"use client";

import { useEffect, useRef, useCallback } from "react";

/*
 * HeroBeam — animated horizontal light beam effect.
 *
 * Thick, smooth, glowing bands of light converging from edges to a bright
 * central core. Volumetric look with bloom/glow rather than individual
 * thin filaments.
 *
 * Pure 2D canvas — no dependencies.
 */

// Fewer bands but much thicker and more blended
const BAND_COUNT = 28;

interface Band {
  amplitude: number;
  phase: number;
  speed: number;
  opacity: number;
  amp2: number;
  phase2: number;
  speed2: number;
  width: number;
  yOffset: number;
  blur: number;
}

function createBands(): Band[] {
  const bands: Band[] = [];
  for (let i = 0; i < BAND_COUNT; i++) {
    const t = i / BAND_COUNT;
    bands.push({
      amplitude: 20 + Math.random() * 100,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.3,
      opacity: 0.06 + Math.random() * 0.12,
      amp2: 10 + Math.random() * 40,
      phase2: Math.random() * Math.PI * 2,
      speed2: 0.08 + Math.random() * 0.2,
      width: 3 + Math.random() * 8,
      yOffset: (t - 0.5) * 40,
      blur: 4 + Math.random() * 16,
    });
  }
  return bands;
}

export default function HeroBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const bandsRef = useRef<Band[]>(createBands());
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (lastFrameRef.current === 0) lastFrameRef.current = timestamp;
    const dt = Math.min((timestamp - lastFrameRef.current) / 1000, 0.05);
    lastFrameRef.current = timestamp;
    timeRef.current += dt;

    const t = timeRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, w, h);

    // Global breathing
    const breathe = 1 + Math.sin(t * 0.3) * 0.06;

    // Large soft background glow — elliptical
    for (let g = 6; g >= 1; g--) {
      const rx = (160 + g * 100) * breathe * dpr;
      const ry = (50 + g * 40) * breathe * dpr;
      const alpha = (0.06 / g) * (1 + Math.sin(t * 0.4 + g) * 0.3);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(rx / ry, 1);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, ry);
      grad.addColorStop(0, `rgba(167, 139, 250, ${alpha * 1.2})`);
      grad.addColorStop(0.3, `rgba(139, 92, 246, ${alpha * 0.6})`);
      grad.addColorStop(0.6, `rgba(109, 40, 217, ${alpha * 0.2})`);
      grad.addColorStop(1, "rgba(109, 40, 217, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, ry, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Wide soft ambient horizontal band
    const hGrad = ctx.createLinearGradient(0, cy - 160 * dpr, 0, cy + 160 * dpr);
    const hAlpha = 0.04 + Math.sin(t * 0.25) * 0.012;
    hGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
    hGrad.addColorStop(0.25, `rgba(139, 92, 246, ${hAlpha * 0.3})`);
    hGrad.addColorStop(0.5, `rgba(167, 139, 250, ${hAlpha})`);
    hGrad.addColorStop(0.75, `rgba(139, 92, 246, ${hAlpha * 0.3})`);
    hGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, cy - 160 * dpr, w, 320 * dpr);

    ctx.globalCompositeOperation = "lighter";

    const bands = bandsRef.current;
    const segments = 80;

    // --- Pass 1: thick blurred background bands for volume ---
    for (const b of bands) {
      ctx.save();
      ctx.shadowColor = "rgba(167, 139, 250, 0.4)";
      ctx.shadowBlur = b.blur * dpr;
      ctx.beginPath();

      for (let s = 0; s <= segments; s++) {
        const pct = s / segments;
        const x = pct * w;

        // Smooth distance from center using cosine — no kink at midpoint
        const cd = (pct - 0.5) * 2; // -1 to 1
        const cd2 = cd * cd; // 0 to 1, smooth parabola

        // Envelope: 1 at center, drops steeply — concentrates waves near middle
        const envelope = Math.pow(1 - cd2, 4);

        const wave1 =
          Math.sin(pct * Math.PI * 2.5 + b.phase + -t * b.speed) *
          b.amplitude *
          envelope;

        const wave2 =
          Math.sin(pct * Math.PI * 4 + b.phase2 + -t * b.speed2) *
          b.amp2 *
          envelope;

        // Pinch: bands converge to center line at edges
        const pinch = Math.pow(cd2, 0.8);
        const yBase = cy + b.yOffset * (1 - pinch);
        const y = yBase + (wave1 + wave2) * breathe;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const lineGrad = ctx.createLinearGradient(0, cy, w, cy);
      const baseAlpha =
        b.opacity * 0.7 * (1 + Math.sin(t * 0.5 + b.phase) * 0.2);
      lineGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
      lineGrad.addColorStop(0.08, `rgba(167, 139, 250, ${baseAlpha * 0.1})`);
      lineGrad.addColorStop(0.25, `rgba(180, 160, 255, ${baseAlpha * 0.5})`);
      lineGrad.addColorStop(0.45, `rgba(210, 195, 255, ${baseAlpha * 0.85})`);
      lineGrad.addColorStop(0.5, `rgba(235, 225, 255, ${baseAlpha})`);
      lineGrad.addColorStop(0.55, `rgba(210, 195, 255, ${baseAlpha * 0.85})`);
      lineGrad.addColorStop(0.75, `rgba(180, 160, 255, ${baseAlpha * 0.5})`);
      lineGrad.addColorStop(0.92, `rgba(167, 139, 250, ${baseAlpha * 0.1})`);
      lineGrad.addColorStop(1, "rgba(167, 139, 250, 0)");

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = b.width * dpr * 1.6;
      ctx.stroke();
      ctx.restore();
    }

    // --- Pass 2: sharper foreground bands for definition ---
    for (const b of bands) {
      ctx.beginPath();

      for (let s = 0; s <= segments; s++) {
        const pct = s / segments;
        const x = pct * w;

        const cd = (pct - 0.5) * 2;
        const cd2 = cd * cd;

        const envelope = Math.pow(1 - cd2, 4);

        const wave1 =
          Math.sin(pct * Math.PI * 2.5 + b.phase + -t * b.speed) *
          b.amplitude *
          envelope;

        const wave2 =
          Math.sin(pct * Math.PI * 4 + b.phase2 + -t * b.speed2) *
          b.amp2 *
          envelope;

        const pinch = Math.pow(cd2, 0.8);
        const yBase = cy + b.yOffset * (1 - pinch);
        const y = yBase + (wave1 + wave2) * breathe;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const lineGrad = ctx.createLinearGradient(0, cy, w, cy);
      const baseAlpha =
        b.opacity * (1 + Math.sin(t * 0.5 + b.phase) * 0.25);
      lineGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
      lineGrad.addColorStop(0.06, `rgba(167, 139, 250, ${baseAlpha * 0.12})`);
      lineGrad.addColorStop(0.2, `rgba(185, 165, 255, ${baseAlpha * 0.5})`);
      lineGrad.addColorStop(0.4, `rgba(210, 195, 255, ${baseAlpha * 0.85})`);
      lineGrad.addColorStop(0.5, `rgba(240, 230, 255, ${baseAlpha})`);
      lineGrad.addColorStop(0.6, `rgba(210, 195, 255, ${baseAlpha * 0.85})`);
      lineGrad.addColorStop(0.8, `rgba(185, 165, 255, ${baseAlpha * 0.5})`);
      lineGrad.addColorStop(0.94, `rgba(167, 139, 250, ${baseAlpha * 0.12})`);
      lineGrad.addColorStop(1, "rgba(167, 139, 250, 0)");

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = b.width * dpr * 0.6;
      ctx.stroke();
    }

    // Bright central core glow — larger and more intense
    const coreBreath = 1 + Math.sin(t * 0.35) * 0.2;
    const coreR = 80 * coreBreath * dpr;
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    coreGrad.addColorStop(0.1, "rgba(230, 220, 255, 0.14)");
    coreGrad.addColorStop(0.3, "rgba(190, 170, 255, 0.06)");
    coreGrad.addColorStop(0.6, "rgba(167, 139, 250, 0.02)");
    coreGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(cx - coreR, cy - coreR, coreR * 2, coreR * 2);

    // Wider secondary core
    const core2R = 140 * coreBreath * dpr;
    const core2Grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, core2R);
    core2Grad.addColorStop(0, "rgba(200, 180, 255, 0.06)");
    core2Grad.addColorStop(0.3, "rgba(167, 139, 250, 0.03)");
    core2Grad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = core2Grad;
    ctx.fillRect(cx - core2R, cy - core2R, core2R * 2, core2R * 2);

    // Horizontal flare — wider and softer
    const flareAlpha = 0.06 + Math.sin(t * 0.4) * 0.02;
    const flareGrad = ctx.createLinearGradient(0, cy, w, cy);
    flareGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
    flareGrad.addColorStop(0.12, `rgba(167, 139, 250, ${flareAlpha * 0.15})`);
    flareGrad.addColorStop(0.35, `rgba(200, 180, 255, ${flareAlpha * 0.5})`);
    flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
    flareGrad.addColorStop(0.65, `rgba(200, 180, 255, ${flareAlpha * 0.5})`);
    flareGrad.addColorStop(0.88, `rgba(167, 139, 250, ${flareAlpha * 0.15})`);
    flareGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, cy - 2 * dpr, w, 4 * dpr);

    // Soft wide flare band
    const f2Alpha = flareAlpha * 0.35;
    const f2Grad = ctx.createLinearGradient(0, cy, w, cy);
    f2Grad.addColorStop(0, "rgba(167, 139, 250, 0)");
    f2Grad.addColorStop(0.15, `rgba(167, 139, 250, ${f2Alpha * 0.2})`);
    f2Grad.addColorStop(0.5, `rgba(192, 168, 255, ${f2Alpha})`);
    f2Grad.addColorStop(0.85, `rgba(167, 139, 250, ${f2Alpha * 0.2})`);
    f2Grad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = f2Grad;
    ctx.fillRect(0, cy - 10 * dpr, w, 20 * dpr);

    ctx.globalCompositeOperation = "source-over";

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-beam"
      aria-hidden="true"
    />
  );
}
