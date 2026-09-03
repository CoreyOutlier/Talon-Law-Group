"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { practiceAreas } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
 * PracticeIndex — an editorial index, not a card grid.
 * Hovering a row cross-fades its image in the sticky plate. On touch it is a
 * clean, tappable list with no hidden state. Both read as intentional.
 * ------------------------------------------------------------------------- */
export function PracticeIndex() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-y border-hairline bg-ink-2">
      <div className="shell py-24 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><p className="eyebrow mb-6">What we handle</p></Reveal>
            <LineReveal
              as="h2"
              className="display text-[clamp(2.25rem,5.5vw,4.25rem)]"
              lines={["Serious injury.", "Nothing smaller."]}
            />
          </div>
          <Reveal delay={0.2}>
            <Link href="/practice-areas" className="btn btn-ghost">All practice areas</Link>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <Figure
                      src={`/media/practice/${practiceAreas[active].slug}.jpg`}
                      alt={practiceAreas[active].name}
                      ratio="4 / 5"
                      note="Optional. Falls back to this frame if absent."
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-2 to-transparent p-7 pt-20">
                  <p className="eyebrow">{practiceAreas[active].kicker}</p>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-mist/80">
                    {practiceAreas[active].intro}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="border-t border-hairline lg:col-span-7">
            {practiceAreas.map((p, i) => (
              <li key={p.slug} className="border-b border-hairline">
                <Link
                  href={`/practice-areas/${p.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center justify-between gap-6 py-6 md:py-8"
                >
                  <span className="flex items-baseline gap-5 md:gap-8">
                    <span className="figure text-[12px] text-steel-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display block text-[clamp(1.5rem,3.4vw,2.5rem)] leading-none text-mist/85 transition-colors duration-500 group-hover:text-wine">
                      {p.name}
                    </span>
                  </span>
                  <span
                    className="shrink-0 text-steel-2 transition-all duration-500 group-hover:translate-x-1 group-hover:text-wine"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
                <p className="-mt-2 mb-6 max-w-[46ch] pl-11 text-[13px] leading-relaxed text-steel lg:hidden">
                  {p.intro}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
