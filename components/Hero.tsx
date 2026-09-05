"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/site";
import { useScrollProgress } from "@/lib/scrollfx";
import { Live, Magnetic } from "@/components/Motion";

/* Full-bleed cinematic hero. One photograph edge to edge, a slow drift, the
   headline rising out of its mask, and three ways to reach the firm before
   anyone has scrolled. The nav sits transparent over this frame.

   On portrait screens the frame is anchored so the face sits in the upper
   third and the copy stays in the lower half, clear of it. */

const HERO_PHOTO = "/media/photos/couch-wide-serious.jpg";
const LINES = ["Some people", "fight back", "for a living."];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const bed = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    if (bed.current) bed.current.style.transform = `translate3d(0, ${p * 18}%, 0)`;
    if (copy.current) {
      copy.current.style.transform = `translate3d(0, ${p * -10}%, 0)`;
      copy.current.style.opacity = String(Math.max(0, 1 - p * 1.6));
    }
  }, "leave");

  return (
    <section ref={section} className="dark grain-on relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      {/* photograph */}
      <div ref={bed} className="absolute inset-0 will-change-transform">
        <div className="drift absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_PHOTO}
            alt="Shaheen Wallace, Esq."
            className="h-full w-full object-cover object-[58%_18%] md:object-[62%_42%]"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-ink/5" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/60 to-transparent md:h-[58%] md:via-ink/45" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink/70 to-transparent" />
      </div>

      {/* copy */}
      <div ref={copy} className="shell relative flex h-full flex-col justify-end pb-[max(2.5rem,6vh)] pt-32 will-change-transform md:pb-[max(3rem,7vh)]">
        <p className="hero-meta eyebrow mb-6 md:mb-7">Order of Barristers · Trial practice since {site.founded}</p>
        <h1 className="display display-xl max-w-[12ch] text-[clamp(2.5rem,8.2vw,7.75rem)] text-paper">
          {LINES.map((l, i) => (
            <span key={i} className="line-mask">
              <span className={`hero-line block ${i === 2 ? "text-accent" : ""}`} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>{l}</span>
            </span>
          ))}
        </h1>

        <div className="mt-7 grid gap-6 md:mt-8 md:gap-8 lg:grid-cols-12 lg:items-end">
          <p className="hero-meta max-w-[44ch] text-[1rem] leading-relaxed text-paper/75 text-pretty md:text-[1.1875rem] lg:col-span-6">
            The insurance company assigned your crash to a professional the day it happened. You should have one too.
          </p>
          <div className="hero-meta flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end" style={{ animationDelay: "1.45s" }}>
            <Magnetic><Link href="/contact" className="btn btn-wine">Start your case</Link></Magnetic>
            <Magnetic><a href={`tel:${site.phoneRaw}`} className="btn border border-paper/60 text-paper transition-colors hover:bg-paper hover:text-ink">{site.phone}</a></Magnetic>
            <a href={`sms:${site.smsRaw}`} className="link-draw ml-2 font-display text-[11px] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper">Text us</a>
          </div>
        </div>

        <span className="hero-rule mt-10 hidden h-px w-full origin-left bg-paper/25 sm:block" />
        <div className="hero-meta mt-5 hidden flex-wrap items-center justify-between gap-4 font-display text-[10px] uppercase tracking-[0.26em] text-paper/55 sm:flex">
          <p className="flex items-center gap-3"><Live onDark /> Answered now · No fee unless we win · Free consultation</p>
          <p>{site.cities.join(" · ")}</p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden>
        <span className="scroll-cue block h-10 w-px bg-paper/45" />
      </div>
    </section>
  );
}
