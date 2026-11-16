"use client";

import Link from "next/link";
import { useState } from "react";
import { practiceAreas } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

/* Editorial index; hovering a row cross-fades its photograph in the sticky plate. */
export function PracticeIndex() {
  const [active, setActive] = useState(0);
  return (
    <section className="border-y border-line bg-ground-2">
      <div className="shell py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <LineReveal as="h2" className="display text-[clamp(2.5rem,6vw,5rem)]" lines={["What we do best."]} />
          </div>
          <Reveal delay={0.2}><Link href="/practice-areas" className="btn btn-ghost">All practice areas</Link></Reveal>
        </div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <div className="relative overflow-hidden bg-ground" style={{ aspectRatio: "4 / 5" }}>
                {practiceAreas.map((p, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.slug} src={p.photo} alt="" loading="lazy" decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700"
                    style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.05)", transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }} />
                ))}
              </div>
            </div>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {practiceAreas.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/practice-areas/${p.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                  className="group row-draw relative flex items-center justify-between gap-6 py-6 md:py-7">
                  <span className="flex items-baseline gap-5 md:gap-8">
                    <span className="figure text-[12px] text-fg-3 transition-colors duration-500 group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display block text-[clamp(1.125rem,2.2vw,1.75rem)] leading-tight text-fg transition-colors duration-500 group-hover:text-accent">{p.name}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-transparent text-fg-3 transition-all duration-500 group-hover:border-accent group-hover:text-accent" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
