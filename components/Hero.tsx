"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { Magnetic } from "./Motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
 * Hero — cinematic, but honest about performance.
 *
 * • Poster paints first. Video only loads on connections that can take it.
 * • No autoplay video on save-data or slow networks; poster stands alone.
 * • Headline enters as masked lines. Nothing bounces.
 * ------------------------------------------------------------------------- */
export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [hasPoster, setHasPoster] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Only paint the poster once we know it exists — no broken frame, ever.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled && img.naturalWidth > 0) setHasPoster(true); };
    img.src = "/media/shaheen/hero-poster.jpg";
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c?.saveData) return;
    if (c?.effectiveType && !["4g"].includes(c.effectiveType)) return;
    const t = setTimeout(() => setPlayVideo(true), 400);
    return () => clearTimeout(t);
  }, [reduced]);

  const lines = ["They have a", "team on this", "within hours."];

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Media bed */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {/* Designed ground. Visible on its own until the poster is dropped in,
            and it still reads as intentional art direction underneath it. */}
        <div className="absolute inset-0 bg-ink-2" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 18%, rgba(201,162,39,.16) 0%, rgba(201,162,39,.05) 34%, transparent 66%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, var(--color-brass) 0 1px, transparent 1px 46px)",
          }}
        />

        {hasPoster && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/media/shaheen/hero-poster.jpg)" }}
          />
        )}

        {playVideo && hasPoster && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/media/shaheen/hero-poster.jpg"
            aria-hidden
          >
            <source src="/media/video/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic grading — keeps the headline legible over any frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/35 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="shell relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="eyebrow mb-7"
        >
          Pittsburgh · Serving {site.jurisdictions.join(" · ")}
        </motion.p>

        <h1 className="display max-w-[16ch] text-[clamp(2.9rem,9.5vw,8.5rem)]">
          {lines.map((l, i) => (
            <span key={i} className="line-mask">
              <motion.span
                initial={reduced ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 + i * 0.09, duration: 1.15, ease: EASE }}
              >
                {i === 2 ? (
                  <>
                    within <em className="not-italic text-brass">hours.</em>
                  </>
                ) : (
                  l
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: EASE }}
          className="mt-9 flex flex-col gap-9 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone/70 text-pretty md:text-[1.1875rem]">
            The insurance company assigned your crash to a professional the day it happened.
            You should have one too. Talon Law Group is a trial practice built for the
            cases carriers hoped you would handle alone.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link href="/contact" className="btn btn-brass w-full sm:w-auto">
                Start your case
              </Link>
            </Magnetic>
            <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost w-full sm:w-auto">
              {site.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6 text-[11px] uppercase tracking-[0.18em] text-slate"
        >
          <span>No fee unless we win</span>
          <span className="hidden h-3 w-px bg-hairline sm:block" />
          <span>Order of Barristers</span>
          <span className="hidden h-3 w-px bg-hairline sm:block" />
          <span>Trial practice since {site.founded}</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-6 right-[var(--shell-x)] hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-slate md:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-brass"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
