"use client";

import Link from "next/link";
import { useRef } from "react";
import { photos, site } from "@/lib/site";
import { useScrollProgress } from "@/lib/scrollfx";

/* Split editorial hero: type on paper, one photograph at full height. */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    if (photo.current) photo.current.style.transform = `translate3d(0, ${p * 14}%, 0) scale(${1 + p * 0.06})`;
    if (copy.current) { copy.current.style.transform = `translate3d(0, ${p * -6}%, 0)`; copy.current.style.opacity = String(Math.max(0, 1 - p * 1.3)); }
  }, "leave");

  const LINES = ["Some people", "fight back", "for a living."];

  return (
    <section ref={section} className="relative overflow-hidden bg-paper text-ink">
      <div className="shell grid min-h-[100svh] grid-cols-1 lg:grid-cols-12">
        {/* copy */}
        <div ref={copy} className="order-2 flex flex-col justify-center py-14 will-change-transform lg:order-1 lg:col-span-7 lg:pb-16 lg:pr-12 lg:pt-32">
          <p className="hero-meta eyebrow mb-8">{site.cities.join(" · ")}</p>
          <h1 className="display display-xl text-[clamp(2.75rem,7.2vw,6.75rem)]">
            {LINES.map((l, i) => (
              <span key={i} className="line-mask">
                <span className={`hero-line block ${i === 2 ? "text-wine" : ""}`} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-meta mt-9 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink/70 text-pretty md:text-[1.1875rem]">
            The insurance company assigned your crash to a professional the day it happened. You should have one too.
          </p>
          <div className="hero-meta mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-wine">Start your case</Link>
            <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost">{site.phone}</a>
          </div>
          <span className="hero-rule mt-12 block h-px w-full origin-left bg-[#D9D3C8]" />
          <p className="hero-meta mt-5 font-display text-[10px] uppercase tracking-[0.26em] text-ink/50">
            No fee unless we win · Order of Barristers · Trial practice since {site.founded}
          </p>
        </div>

        {/* photograph */}
        <div className="order-1 relative -mx-[var(--shell-x)] h-[62svh] overflow-hidden lg:order-2 lg:col-span-5 lg:mx-0 lg:-mr-[var(--shell-x)] lg:h-auto lg:min-h-[100svh]">
          <div ref={photo} className="hero-photo absolute inset-0 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.hero} alt="Shaheen Wallace on the courthouse steps" className="h-full w-full object-cover object-[50%_20%]" decoding="async" fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
