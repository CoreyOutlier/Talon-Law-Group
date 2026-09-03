"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useScrollProgress } from "@/lib/scrollfx";

/* ---------------------------------------------------------------------------
 * Hero — a film frame, not a landing page.
 *
 * One image, one line, nothing else. Everything transactional lives below the
 * fold or in the fixed chrome, so the first screen reads like the opening shot
 * of a commercial rather than a lead form with a photo behind it.
 * ------------------------------------------------------------------------- */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const bed = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState(false);

  useScrollProgress(
    section,
    (p) => {
      if (bed.current) bed.current.style.transform = `translate3d(0, ${p * 22}%, 0) scale(${1 + p * 0.12})`;
      const fade = String(Math.max(0, 1 - p * 1.45));
      if (copy.current) {
        copy.current.style.opacity = fade;
        copy.current.style.transform = `translate3d(0, ${p * -5}%, 0)`;
      }
      if (cue.current) cue.current.style.opacity = fade;
    },
    "leave"
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c?.saveData) return;
    if (c?.effectiveType && c.effectiveType !== "4g") return;
    const t = setTimeout(() => setPlayVideo(true), 500);
    return () => clearTimeout(t);
  }, []);

  const LINES = ["Some people", "fight back", "for a living."];

  return (
    <section ref={section} className="relative h-[100svh] overflow-hidden">
      {/* ---------- The frame ---------- */}
      <div ref={bed} className="vignette absolute inset-0 -z-10 will-change-transform">
        <div className="absolute inset-0 bg-ink-2" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(110% 80% at 72% 24%, rgba(142,17,72,.22) 0%, rgba(8,57,84,.14) 40%, transparent 72%)",
          }}
        />

        <div
          className="hero-still absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/shaheen/hero-poster.jpg)" }}
        />

        {playVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay muted loop playsInline preload="none"
            poster="/media/shaheen/hero-poster.jpg"
            aria-hidden
          >
            <source src="/media/video/hero.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
      </div>

      {/* ---------- The line ---------- */}
      <div
        ref={copy}
        className="shell relative flex h-full flex-col justify-end pb-[15vh] will-change-transform"
      >
        <h1 className="display display-xl max-w-[15ch] text-[clamp(2.5rem,9vw,8.5rem)]">
          {LINES.map((l, i) => (
            <span key={i} className="line-mask">
              <span
                className={`hero-line block ${i === 2 ? "text-wine-2" : ""}`}
                style={{ animationDelay: `${0.35 + i * 0.13}s` }}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-meta mt-10 flex items-end justify-between gap-8">
          <p className="max-w-[30ch] text-[11px] uppercase leading-[2] tracking-[0.26em] text-steel">
            {site.name}
            <br />
            Injury trial practice
          </p>
          <a
            href={`tel:${site.phoneRaw}`}
            className="hidden text-[11px] uppercase tracking-[0.26em] text-mist/60 transition-colors hover:text-wine-2 md:block"
          >
            {site.phone}
          </a>
        </div>

        <span className="hero-rule mt-8 block h-px w-full origin-left bg-hairline" />
      </div>

      <div
        ref={cue}
        aria-hidden
        className="hero-meta pointer-events-none absolute bottom-6 right-[var(--shell-x)] hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-steel md:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-hairline">
          <span className="scroll-tick absolute inset-x-0 top-0 block h-4 bg-wine-2" />
        </span>
      </div>
    </section>
  );
}
