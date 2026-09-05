"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { publishedTestimonials } from "@/lib/site";
import { Reveal } from "@/components/Motion";
import { useScrollProgress } from "@/lib/scrollfx";

/* In their words. One review at a time, set large on a dark ground, each
   word arriving in turn as though it were being said. The whole record runs
   quietly up the right edge the entire time, a lamp follows the cursor
   across the type, and the opening mark drifts with the scroll. It rotates
   on a hold while in view, pauses under the cursor, and answers the arrow
   keys, the numerals, and a swipe. */

const HOLD = 7200;
const CRAWL_REPEAT = 4;
const pad = (n: number) => String(n).padStart(2, "0");

export function Voices() {
  const items = publishedTestimonials;
  const n = items.length;
  const section = useRef<HTMLElement>(null);
  const lamp = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const quotes = useRef<(HTMLQuoteElement | null)[]>([]);
  const [h, setH] = useState<number | null>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useScrollProgress(section, (p) => {
    if (mark.current) mark.current.style.transform = `translate3d(0, ${(0.5 - p) * 26}%, 0)`;
  });

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView || n < 2) return;
    const t = window.setTimeout(() => setI((k) => (k + 1) % n), HOLD);
    return () => window.clearTimeout(t);
  }, [i, paused, inView, reduced, n]);

  // the layer follows the height of the quote on screen
  useEffect(() => {
    const measure = () => { const el = quotes.current[i]; if (el) setH(el.offsetHeight); };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [i]);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  if (n === 0) return null;

  return (
    <section
      ref={section}
      className="voices dark grain-on relative overflow-hidden border-y border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !lamp.current || !section.current) return;
        const r = section.current.getBoundingClientRect();
        lamp.current.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
      }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        else if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      {/* a lamp that follows the cursor across the type */}
      <div ref={lamp} className="voices-lamp" aria-hidden />

      {/* the opening mark, oversized, drifting with the scroll */}
      <div
        ref={mark}
        aria-hidden
        className="pointer-events-none absolute -top-[3%] left-[calc(var(--shell-x)-0.1em)] select-none font-display text-[clamp(16rem,34vw,38rem)] leading-none text-fg/5 will-change-transform"
      >
        “
      </div>

      {/* the record, running quietly up the right edge */}
      <div aria-hidden className="voices-crawl pointer-events-none absolute inset-y-0 right-[var(--shell-x)] hidden w-[19rem] xl:block">
        <div className="voices-crawl-track" style={{ animationPlayState: inView ? "running" : "paused" }}>
          {Array.from({ length: CRAWL_REPEAT }).flatMap((_, r) =>
            items.map((q, k) => (
              <p key={`${r}-${k}`} className="h2-soft mb-12 text-[15px] leading-relaxed text-fg/15">
                “{q.quote}”
                <span className="mt-2 block font-display text-[10px] uppercase tracking-[0.2em]">{q.matter} · {q.source}</span>
              </p>
            ))
          )}
        </div>
      </div>

      <div className="shell relative py-24 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6 xl:pr-[22rem]">
          <Reveal><p className="eyebrow">In their words</p></Reveal>
          <Reveal delay={0.1}><p className="font-display text-[11px] uppercase tracking-[0.2em] text-fg-3">Verified client reviews · via Avvo</p></Reveal>
        </div>

        {/* every quote occupies the same grid cell; before hydration the layer is as tall as the
            longest quote, after it the layer eases to the height of the quote on screen */}
        <div className="relative mt-14 grid overflow-hidden md:mt-20" aria-live="polite" style={{ height: h ?? undefined, transition: "height .9s cubic-bezier(.16,1,.3,1)" }}>
          {items.map((q, k) => {
            const on = k === i;
            const words = q.quote.split(" ");
            const tail = 160 + words.length * 42;
            return (
              <blockquote
                key={k}
                ref={(el) => { quotes.current[k] = el; }}
                aria-hidden={!on}
                className="[grid-area:1/1] self-start"
                // the outgoing quote stays in the layer just long enough to fade, then leaves entirely
                style={{ pointerEvents: on ? "auto" : "none", visibility: on ? "visible" : "hidden", transition: on ? "visibility 0s" : "visibility 0s .4s" }}
              >
                <p className="h2-soft max-w-[22ch] text-[clamp(1.85rem,4.4vw,4rem)] text-fg">
                  {words.map((w, wi) => (
                    <span
                      key={wi}
                      className="voice-word"
                      style={{
                        opacity: on ? 1 : 0,
                        transform: on ? "none" : "translate3d(0, .45em, 0)",
                        transitionDelay: on ? `${140 + wi * 42}ms` : "0ms",
                        transitionDuration: on ? "1s" : ".35s",
                      }}
                    >
                      {w}{wi < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                  <span className="voice-word text-accent" style={{ opacity: on ? 1 : 0, transitionDelay: on ? `${tail}ms` : "0ms", transitionDuration: on ? "1s" : ".35s" }}>”</span>
                </p>
                <footer
                  className="mt-8 flex flex-wrap items-center gap-4 font-display text-[11px] uppercase tracking-[0.18em] text-fg-3 transition-opacity duration-700"
                  style={{ opacity: on ? 1 : 0, transitionDelay: on ? `${tail + 140}ms` : "0ms" }}
                >
                  <span className="text-fg">{q.author}</span>
                  <span aria-hidden className="h-px w-8 bg-line" />
                  <span>{q.matter} · via {q.source}</span>
                </footer>
              </blockquote>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 xl:pr-[22rem]">
          <div className="flex items-center gap-6 md:gap-9">
            <div className="flex items-center gap-5 md:gap-7" role="group" aria-label="Choose a review">
              {items.map((_, k) => {
                const on = k === i;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => go(k)}
                    aria-label={`Review ${k + 1}`}
                    aria-current={on}
                    className={`relative py-3 font-display text-[12px] tracking-[0.22em] transition-colors duration-500 ${on ? "text-fg" : "text-fg-3 hover:text-fg"}`}
                  >
                    {pad(k + 1)}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
                    <span
                      aria-hidden
                      key={on ? `on-${i}` : `off-${k}`}
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent ${on && !reduced ? "progress-run" : ""}`}
                      style={{
                        transform: k < i || (on && reduced) ? "scaleX(1)" : k > i ? "scaleX(0)" : undefined,
                        animationDuration: `${HOLD}ms`,
                        animationPlayState: paused || !inView ? "paused" : "running",
                      }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-3 transition-colors duration-300 hover:border-fg hover:text-fg">←</button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-3 transition-colors duration-300 hover:border-fg hover:text-fg">→</button>
            </div>
          </div>
          <Link href="/reviews" className="btn btn-ghost">All reviews</Link>
        </div>
      </div>
    </section>
  );
}
