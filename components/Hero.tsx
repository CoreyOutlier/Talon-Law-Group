"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/lib/site";
import { useScrollProgress } from "@/lib/scrollfx";
import { Live, Magnetic } from "@/components/Motion";

/* The hero. One dark frame. On desktop the photograph holds the right of
   the screen, Shaheen fully in it head to shoe, and the words hold the
   left; the two meet in a soft blend so it still reads as one picture, not
   two columns. On phones the photograph takes the top of the screen with
   him fully in frame and the words follow underneath. Nothing sits on him
   at any width. The nav sits transparent over this frame. */

const HERO_PHOTO = "/media/photos/couch-wide-serious.jpg";
const LINES = ["Some people", "fight back", "for a living."];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const bed = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    if (bed.current) bed.current.style.transform = `translate3d(0, ${p * 14}%, 0)`;
    if (copy.current) {
      copy.current.style.transform = `translate3d(0, ${p * -8}%, 0)`;
      copy.current.style.opacity = String(Math.max(0, 1 - p * 1.6));
    }
  }, "leave");

  return (
    <section ref={section} className="dark grain-on relative overflow-hidden bg-ink text-paper lg:h-[100svh] lg:min-h-[700px]">
      {/* photograph: top of the screen on phones, the right of it on desktop */}
      <div className="relative h-[62svh] min-h-[440px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]">
        <div ref={bed} className="absolute inset-0 will-change-transform">
          <div className="drift absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_PHOTO}
              alt="Shaheen Wallace, Esq., in the firm's Pittsburgh office"
              className="h-full w-full object-cover object-[50%_42%] lg:object-[45%_50%]"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
        {/* phones: fade the foot of the photograph into the copy below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent lg:hidden" />
        {/* desktop: the photograph's left edge dissolves into the ink behind the words */}
        <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-ink via-ink/55 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-ink/70 to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/75 to-transparent" />
      </div>

      {/* words */}
      <div ref={copy} className="shell relative flex flex-col justify-end pb-12 pt-6 will-change-transform lg:h-full lg:max-w-none lg:pb-[max(3rem,7vh)] lg:pt-32">
        <div className="lg:w-[60%] xl:w-[56%]">
          <p className="hero-meta eyebrow mb-6 lg:mb-7">Order of Barristers · Trial practice since {site.founded}</p>
          <h1 className="display display-xl max-w-[13ch] text-[clamp(2.5rem,6.4vw,6.25rem)] text-paper">
            {LINES.map((l, i) => (
              <span key={i} className="line-mask">
                <span className={`hero-line block ${i === 2 ? "text-accent" : ""}`} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>{l}</span>
              </span>
            ))}
          </h1>

          <p className="hero-meta mt-7 max-w-[42ch] text-[1.0625rem] leading-relaxed text-paper/75 text-pretty md:text-[1.1875rem]">
            The insurance company assigned your crash to a professional the day it happened. You should have one too.
          </p>
          <div className="hero-meta mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "1.45s" }}>
            <Magnetic><Link href="/contact" className="btn btn-wine">Start your case</Link></Magnetic>
            <Magnetic><a href={`tel:${site.phoneRaw}`} className="btn border border-paper/60 text-paper transition-colors hover:bg-paper hover:text-ink">{site.phone}</a></Magnetic>
            <a href={`sms:${site.smsRaw}`} className="link-draw ml-2 font-display text-[11px] font-medium uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper">Text us</a>
          </div>

          <span className="hero-rule mt-10 hidden h-px w-full origin-left bg-paper/25 sm:block" />
          <div className="hero-meta mt-5 hidden flex-wrap items-center justify-between gap-4 font-display text-[10px] uppercase tracking-[0.26em] text-paper/55 sm:flex">
            <p className="flex items-center gap-3"><Live onDark /> Answered now · No fee unless we win · Free consultation</p>
            <p className="hidden md:block">{site.cities.join(" · ")}</p>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden>
        <span className="scroll-cue block h-10 w-px bg-paper/45" />
      </div>
    </section>
  );
}
