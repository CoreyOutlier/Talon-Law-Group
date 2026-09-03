"use client";

import { useEffect, useRef, type RefObject } from "react";

/* ---------------------------------------------------------------------------
 * Scroll effects, done directly.
 *
 * Scroll-linked motion is driven here by writing transforms straight to the
 * element inside a rAF loop, rather than routing scroll through React or an
 * animation library. Two reasons:
 *
 *   1. Correctness — binding library MotionValues into `style` across a
 *      hydration boundary is where this page previously crashed.
 *   2. Speed — no reconciliation, no keyframe machinery, one write per frame
 *      on the compositor-only properties (transform, opacity).
 *
 * `mode` decides how progress is measured:
 *   "cover" — 0 as the element's top reaches the viewport bottom, 1 as its
 *             bottom leaves the viewport top. For drift and parallax.
 *   "pin"   — 0 when a tall section's top hits the viewport top, 1 when its
 *             bottom hits the viewport bottom. For pinned sequences.
 *   "leave" — 0 at rest, 1 once the element has scrolled fully past the top.
 *             For hero exits.
 * ------------------------------------------------------------------------- */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  mode: "cover" | "pin" | "leave" = "cover"
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(0);
      return;
    }

    let raf = 0;
    let queued = false;
    let last = -1;

    const measure = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let p: number;

      if (mode === "pin") {
        const span = Math.max(r.height - vh, 1);
        p = -r.top / span;
      } else if (mode === "leave") {
        p = -r.top / Math.max(r.height, 1);
      } else {
        p = (vh - r.top) / Math.max(vh + r.height, 1);
      }

      p = p < 0 ? 0 : p > 1 ? 1 : p;
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        cb.current(p);
      }
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, mode]);
}

/** Linear interpolation between two numbers. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map t through a set of stops, clamped at both ends. */
export function ramp(t: number, stops: number[], values: number[]) {
  if (t <= stops[0]) return values[0];
  const n = stops.length - 1;
  if (t >= stops[n]) return values[n];
  for (let i = 0; i < n; i++) {
    if (t <= stops[i + 1]) {
      const span = stops[i + 1] - stops[i] || 1;
      return lerp(values[i], values[i + 1], (t - stops[i]) / span);
    }
  }
  return values[n];
}
