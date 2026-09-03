"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
 * Figure — image slot that degrades gracefully.
 *
 * If the asset is not in /public yet, it renders a designed placeholder that
 * names the exact file to drop in. Nothing ever looks broken, and the site
 * documents its own asset requirements.
 * ------------------------------------------------------------------------- */
export function Figure({
  src,
  alt,
  className = "",
  imgClassName = "",
  ratio = "4 / 5",
  priority = false,
  note,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
  note?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  // An <img> that 404s before hydration never fires onError into React.
  // Re-check on mount so the placeholder still appears.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  // Frames arrive by uncovering, never by fading. Fires once, on entry.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("wipe");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("wipe-in");
        io.disconnect();
      },
      { rootMargin: "-8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-ink-2 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="pointer-events-none absolute inset-3 border border-hairline" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-wine) 0 1px, transparent 1px 14px)",
            }}
          />
          <div className="relative">
            <p className="eyebrow mb-2">Asset slot</p>
            <p className="font-mono text-[11px] leading-relaxed text-steel">{src}</p>
            {note && <p className="mt-2 max-w-[26ch] text-[11px] text-steel-2">{note}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
