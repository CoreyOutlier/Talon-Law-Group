"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { publishedTestimonials } from "@/lib/site";
import { Reveal } from "@/components/Motion";

/* In their words. One review at a time, set large in the soft register on a
   dark ground. Rotates on a timer while in view, pauses under the cursor;
   the rails at the foot select and show the hold. */

const HOLD = 6500;
const EASE = "cubic-bezier(.16,1,.3,1)";

export function Voices() {
  const items = publishedTestimonials;
  const section = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView || items.length < 2) return;
    const t = window.setTimeout(() => setI((k) => (k + 1) % items.length), HOLD);
    return () => window.clearTimeout(t);
  }, [i, paused, inView, reduced, items.length]);

  if (items.length === 0) return null;

  return (
    <section
      ref={section}
      className="dark relative overflow-hidden border-y border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shell py-24 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><p className="eyebrow">In their words</p></Reveal>
          <Reveal delay={0.1}><p className="font-display text-[11px] uppercase tracking-[0.2em] text-fg-3">Verified client reviews · via Avvo</p></Reveal>
        </div>

        <div className="relative mt-14 min-h-[17rem] md:mt-20 md:min-h-[19rem] lg:min-h-[21rem]" aria-live="polite">
          {items.map((q, k) => {
            const on = k === i;
            return (
              <blockquote
                key={k}
                aria-hidden={!on}
                className="absolute inset-0 transition-[opacity,transform] duration-[900ms]"
                style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(22px)", pointerEvents: on ? "auto" : "none", transitionTimingFunction: EASE }}
              >
                <p className="h2-soft max-w-[24ch] text-[clamp(1.75rem,4.2vw,3.75rem)] text-fg text-pretty">
                  <span className="text-accent">“</span>{q.quote}<span className="text-accent">”</span>
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-4 font-display text-[11px] uppercase tracking-[0.18em] text-fg-3">
                  <span className="text-fg">{q.author}</span>
                  <span aria-hidden className="h-px w-8 bg-line" />
                  <span>{q.matter} · via {q.source}</span>
                </footer>
              </blockquote>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8">
          <div className="flex items-center gap-3">
            {items.map((_, k) => (
              <button key={k} type="button" onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className="relative block h-6 w-12">
                <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                <span
                  key={k === i ? `on-${i}` : `off-${k}`}
                  className={`absolute inset-x-0 top-1/2 h-px origin-left bg-accent ${k === i && !reduced ? "progress-run" : ""}`}
                  style={{
                    transform: k < i || (k === i && reduced) ? "scaleX(1)" : k > i ? "scaleX(0)" : undefined,
                    animationDuration: `${HOLD}ms`,
                    animationPlayState: paused || !inView ? "paused" : "running",
                  }}
                />
              </button>
            ))}
            <span className="figure ml-2 text-[12px] text-fg-3">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
          <Link href="/reviews" className="btn btn-ghost">All reviews</Link>
        </div>
      </div>
    </section>
  );
}
