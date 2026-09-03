"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
 * Cursor — a wine lens ring that trails the pointer and opens over anything
 * interactive. Desktop pointers only; touch and reduced-motion never see it.
 * Runs on rAF with direct transform writes: no React re-renders, no jank.
 * ------------------------------------------------------------------------- */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("hide-native-cursor");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;

    const HOT = "a, button, input, textarea, select, [role='button'], [data-hot]";

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

      const el = (e.target as HTMLElement | null)?.closest?.(HOT);
      if (ring.current) ring.current.dataset.state = el ? "hot" : "";
    };

    const onLeave = () => { if (ring.current) ring.current.dataset.state = "hidden"; };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-lens" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
