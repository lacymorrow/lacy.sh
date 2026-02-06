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

// ─── Tuning constants ───────────────────────────────────────────────
// Tweak these to change the look and feel of the beam animation.

// Total number of light bands. More = denser/richer, fewer = sparser.
const BAND_COUNT = 28;

// --- Band shape ---

// Min vertical wave height (px). Raise for taller waves even on low-random bands.
const AMPLITUDE_MIN = 4;
// Random vertical wave height added on top of min. Controls peak variation.
const AMPLITUDE_RANGE = 100;
// How tightly bands cluster around the center line. Lower = tighter.
const Y_OFFSET_SPREAD = 5;
// Min stroke width of each band (px).
const BAND_WIDTH_MIN = 4;
// Random stroke width added on top of min.
const BAND_WIDTH_RANGE = 10;

// --- Band motion ---

// Min animation speed per band. Higher = faster wave movement.
const SPEED_MIN = 0.15;
// Random speed added on top of min.
const SPEED_RANGE = 0.3;
// Fraction of bands that use sin (vs cos) wave. 0–1. More sin = more asymmetric motion.
const SIN_PROBABILITY = 0.25;
// Spatial wave frequency. Higher = more wave cycles across the width.
const WAVE_FREQUENCY = 2.5;

// --- Band opacity ---

// Min opacity per band. Raise for brighter overall bands.
const BAND_OPACITY_MIN = 0.06;
// Random opacity added on top of min.
const BAND_OPACITY_RANGE = 0.12;
// Min blur radius (px) for the background glow pass.
const BAND_BLUR_MIN = 4;
// Random blur added on top of min.
const BAND_BLUR_RANGE = 16;

// --- Envelope & pinch ---

// How steeply waves concentrate toward the horizontal center. Higher = tighter focus.
const ENVELOPE_POWER = 5;
// How sharply bands converge to a single line at the edges. Higher = more pinch.
const PINCH_POWER = 0.8;

// --- Breathing (global slow pulse) ---

// Speed of the global breathing oscillation.
const BREATHE_SPEED = 0.3;
// Intensity of breathing. 0.06 = ±6% size fluctuation.
const BREATHE_AMOUNT = 0.06;

// --- Background glow ---

// Number of concentric elliptical glow layers behind the bands.
const GLOW_LAYERS = 6;
// Base horizontal radius (px) of the innermost glow ellipse.
const GLOW_RX_BASE = 160;
// Extra horizontal radius added per layer.
const GLOW_RX_PER_LAYER = 100;
// Base vertical radius (px) of the innermost glow ellipse.
const GLOW_RY_BASE = 50;
// Extra vertical radius added per layer.
const GLOW_RY_PER_LAYER = 40;
// Half-height (px) of the wide soft ambient horizontal band behind everything.
const AMBIENT_BAND_HALF_HEIGHT = 160;

// --- Core glow ---

// Base radius (px) of the bright central core glow.
const CORE_RADIUS = 80;
// How much the core pulses. 0.2 = ±20%.
const CORE_BREATHE_AMOUNT = 0.2;
// Base radius (px) of the wider secondary core glow.
const CORE2_RADIUS = 140;

// --- Horizontal flare ---

// Base opacity of the thin horizontal flare line through the center.
const FLARE_ALPHA_BASE = 0.06;
// Half-thickness (px) of the sharp center flare.
const FLARE_HALF_HEIGHT = 2;
// Half-thickness (px) of the soft wide flare band.
const FLARE_WIDE_HALF_HEIGHT = 10;

// --- Rendering ---

// Number of horizontal segments per band curve. More = smoother, costlier.
const SEGMENTS = 80;
// Stroke width multiplier for the blurred background pass (thicker = more bloom).
const BG_WIDTH_MULTIPLIER = 1.6;
// Stroke width multiplier for the sharp foreground pass.
const FG_WIDTH_MULTIPLIER = 0.6;

interface Band {
  amplitude: number;
  phase: number;
  speed: number;
  opacity: number;
  width: number;
  yOffset: number;
  blur: number;
  useSin: boolean;
}

function createBands(): Band[] {
  const bands: Band[] = [];
  for (let i = 0; i < BAND_COUNT; i++) {
    const t = i / BAND_COUNT;
    bands.push({
      amplitude:
        AMPLITUDE_MIN + Math.pow(Math.random(), 0.5) * AMPLITUDE_RANGE,
      phase: Math.random() * Math.PI * 2,
      speed: SPEED_MIN + Math.random() * SPEED_RANGE,
      opacity: BAND_OPACITY_MIN + Math.random() * BAND_OPACITY_RANGE,
      width: BAND_WIDTH_MIN + Math.pow(Math.random(), 0.5) * BAND_WIDTH_RANGE,
      yOffset: (t - 0.5) * Y_OFFSET_SPREAD,
      blur: BAND_BLUR_MIN + Math.random() * BAND_BLUR_RANGE,
      useSin: Math.random() < SIN_PROBABILITY,
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
    const breathe = 1 + Math.sin(t * BREATHE_SPEED) * BREATHE_AMOUNT;

    // Large soft background glow — elliptical
    for (let g = GLOW_LAYERS; g >= 1; g--) {
      const rx = (GLOW_RX_BASE + g * GLOW_RX_PER_LAYER) * breathe * dpr;
      const ry = (GLOW_RY_BASE + g * GLOW_RY_PER_LAYER) * breathe * dpr;
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
    const hGrad = ctx.createLinearGradient(
      0,
      cy - AMBIENT_BAND_HALF_HEIGHT * dpr,
      0,
      cy + AMBIENT_BAND_HALF_HEIGHT * dpr,
    );
    const hAlpha = 0.04 + Math.sin(t * 0.25) * 0.012;
    hGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
    hGrad.addColorStop(0.25, `rgba(139, 92, 246, ${hAlpha * 0.3})`);
    hGrad.addColorStop(0.5, `rgba(167, 139, 250, ${hAlpha})`);
    hGrad.addColorStop(0.75, `rgba(139, 92, 246, ${hAlpha * 0.3})`);
    hGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = hGrad;
    ctx.fillRect(
      0,
      cy - AMBIENT_BAND_HALF_HEIGHT * dpr,
      w,
      AMBIENT_BAND_HALF_HEIGHT * 2 * dpr,
    );

    ctx.globalCompositeOperation = "lighter";

    const bands = bandsRef.current;

    // --- Pass 1: thick blurred background bands for volume ---
    for (const b of bands) {
      ctx.save();
      ctx.shadowColor = "rgba(167, 139, 250, 0.4)";
      ctx.shadowBlur = b.blur * dpr;
      ctx.beginPath();

      for (let s = 0; s <= SEGMENTS; s++) {
        const pct = s / SEGMENTS;
        const x = pct * w;

        // Smooth distance from center using cosine — no kink at midpoint
        const cd = (pct - 0.5) * 2; // -1 to 1
        const cd2 = cd * cd; // 0 to 1, smooth parabola

        // Envelope: 1 at center, drops steeply — concentrates waves near middle
        const envelope = Math.pow(1 - cd2, ENVELOPE_POWER);

        let wave: number;
        if (b.useSin) {
          wave =
            Math.sin((pct - 0.5) * Math.PI * WAVE_FREQUENCY + b.phase + -t * b.speed) *
            b.amplitude *
            envelope;
        } else {
          const spatial = Math.cos((pct - 0.5) * Math.PI * WAVE_FREQUENCY);
          const temporal = Math.sin(b.phase + -t * b.speed);
          wave = spatial * temporal * b.amplitude * envelope;
        }

        // Pinch: bands converge to center line at edges
        const pinch = Math.pow(cd2, PINCH_POWER);
        const yBase = cy + b.yOffset * (1 - pinch);
        const y = yBase + wave * breathe;

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
      ctx.lineWidth = b.width * dpr * BG_WIDTH_MULTIPLIER;
      ctx.stroke();
      ctx.restore();
    }

    // --- Pass 2: sharper foreground bands for definition ---
    for (const b of bands) {
      ctx.beginPath();

      for (let s = 0; s <= SEGMENTS; s++) {
        const pct = s / SEGMENTS;
        const x = pct * w;

        const cd = (pct - 0.5) * 2;
        const cd2 = cd * cd;

        const envelope = Math.pow(1 - cd2, ENVELOPE_POWER);

        let wave: number;
        if (b.useSin) {
          wave =
            Math.sin((pct - 0.5) * Math.PI * WAVE_FREQUENCY + b.phase + -t * b.speed) *
            b.amplitude *
            envelope;
        } else {
          const spatial = Math.cos((pct - 0.5) * Math.PI * WAVE_FREQUENCY);
          const temporal = Math.sin(b.phase + -t * b.speed);
          wave = spatial * temporal * b.amplitude * envelope;
        }

        const pinch = Math.pow(cd2, PINCH_POWER);
        const yBase = cy + b.yOffset * (1 - pinch);
        const y = yBase + wave * breathe;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const lineGrad = ctx.createLinearGradient(0, cy, w, cy);
      const baseAlpha = b.opacity * (1 + Math.sin(t * 0.5 + b.phase) * 0.25);
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
      ctx.lineWidth = b.width * dpr * FG_WIDTH_MULTIPLIER;
      ctx.stroke();
    }

    // Bright central core glow — larger and more intense
    const coreBreath = 1 + Math.sin(t * 0.35) * CORE_BREATHE_AMOUNT;
    const coreR = CORE_RADIUS * coreBreath * dpr;
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    coreGrad.addColorStop(0.1, "rgba(230, 220, 255, 0.14)");
    coreGrad.addColorStop(0.3, "rgba(190, 170, 255, 0.06)");
    coreGrad.addColorStop(0.6, "rgba(167, 139, 250, 0.02)");
    coreGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(cx - coreR, cy - coreR, coreR * 2, coreR * 2);

    // Wider secondary core
    const core2R = CORE2_RADIUS * coreBreath * dpr;
    const core2Grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, core2R);
    core2Grad.addColorStop(0, "rgba(200, 180, 255, 0.06)");
    core2Grad.addColorStop(0.3, "rgba(167, 139, 250, 0.03)");
    core2Grad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = core2Grad;
    ctx.fillRect(cx - core2R, cy - core2R, core2R * 2, core2R * 2);

    // Horizontal flare — wider and softer
    const flareAlpha = FLARE_ALPHA_BASE + Math.sin(t * 0.4) * 0.02;
    const flareGrad = ctx.createLinearGradient(0, cy, w, cy);
    flareGrad.addColorStop(0, "rgba(167, 139, 250, 0)");
    flareGrad.addColorStop(0.12, `rgba(167, 139, 250, ${flareAlpha * 0.15})`);
    flareGrad.addColorStop(0.35, `rgba(200, 180, 255, ${flareAlpha * 0.5})`);
    flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
    flareGrad.addColorStop(0.65, `rgba(200, 180, 255, ${flareAlpha * 0.5})`);
    flareGrad.addColorStop(0.88, `rgba(167, 139, 250, ${flareAlpha * 0.15})`);
    flareGrad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = flareGrad;
    ctx.fillRect(
      0,
      cy - FLARE_HALF_HEIGHT * dpr,
      w,
      FLARE_HALF_HEIGHT * 2 * dpr,
    );

    // Soft wide flare band
    const f2Alpha = flareAlpha * 0.35;
    const f2Grad = ctx.createLinearGradient(0, cy, w, cy);
    f2Grad.addColorStop(0, "rgba(167, 139, 250, 0)");
    f2Grad.addColorStop(0.15, `rgba(167, 139, 250, ${f2Alpha * 0.2})`);
    f2Grad.addColorStop(0.5, `rgba(192, 168, 255, ${f2Alpha})`);
    f2Grad.addColorStop(0.85, `rgba(167, 139, 250, ${f2Alpha * 0.2})`);
    f2Grad.addColorStop(1, "rgba(167, 139, 250, 0)");
    ctx.fillStyle = f2Grad;
    ctx.fillRect(
      0,
      cy - FLARE_WIDE_HALF_HEIGHT * dpr,
      w,
      FLARE_WIDE_HALF_HEIGHT * 2 * dpr,
    );

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

  return <canvas ref={canvasRef} className="hero-beam" aria-hidden="true" />;
}
