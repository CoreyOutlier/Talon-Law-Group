"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/scrollfx";

/* Image slot with a mask-wipe entrance, an optional scroll parallax on the
   photograph inside the frame, and a designed fallback. */
export function Figure({ src, alt, className = "", imgClassName = "", ratio = "4 / 5", priority = false, note, wipe = "y", parallax = 0 }: {
  src: string; alt: string; className?: string; imgClassName?: string; ratio?: string; priority?: boolean; note?: string; wipe?: "y" | "x" | "none";
  /** Percent of travel the photograph makes inside its frame while it crosses the screen. 0 disables. */
  parallax?: number;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const none = useRef<HTMLDivElement>(null);

  useScrollProgress(parallax ? wrapRef : none, (p) => {
    if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${(p - 0.5) * 2 * parallax}%, 0) scale(${1 + parallax / 50})`;
  });

  useEffect(() => { const el = imgRef.current; if (el && el.complete && el.naturalWidth === 0) setFailed(true); }, []);
  useEffect(() => {
    const el = wrapRef.current; if (!el || wipe === "none") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const base = wipe === "x" ? "wipe-x" : "wipe", on = wipe === "x" ? "wipe-x-in" : "wipe-in";
    el.classList.add(base);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add(on); io.disconnect(); } }, { rootMargin: "-8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [wipe]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-ground-2 ${className}`} style={{ aspectRatio: ratio }}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={imgRef} src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async"
          onError={() => setFailed(true)} className={`h-full w-full object-cover ${parallax ? "will-change-transform" : ""} ${imgClassName}`} />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="pointer-events-none absolute inset-3 border border-line" />
          <div><p className="eyebrow mb-2">Asset slot</p><p className="font-mono text-[11px] text-fg-3">{src}</p>{note && <p className="mt-2 max-w-[26ch] text-[11px] text-fg-3">{note}</p>}</div>
        </div>
      )}
    </div>
  );
}
