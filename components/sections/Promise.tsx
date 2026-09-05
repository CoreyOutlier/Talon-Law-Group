"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Live, Reveal } from "@/components/Motion";

/* Why people call us. Not three reasons in a list: five moments in a case,
   and who handles each one here against how it usually goes. As each row
   arrives, the usual answer is struck through and ours is written in. The
   photograph beside it is the whole point: he answers his own phone. */

const EASE = "cubic-bezier(.16,1,.3,1)";

const ROWS = [
  { when: "You call", usual: "An intake screener", here: "Shaheen picks up" },
  { when: "The insurer calls", usual: "A case manager, 200 files", here: "The lawyer who tries it" },
  { when: "Trial prep begins", usual: "Only if it does not settle", here: "The first week" },
  { when: "You pay", usual: "A retainer or an hourly bill", here: "Nothing unless we win" },
  { when: "The courtroom", usual: "Whoever it gets referred to", here: "The lawyer you hired" },
];

export function Promise() {
  const list = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="shell py-24 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* the photograph, pinned beside the ledger on desktop, after it on phones */}
        <div className="order-last lg:order-first lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="relative">
                <Figure src="/media/photos/coffee-espresso.jpg" alt="Shaheen Wallace on the phone" ratio="4 / 5" wipe="x" parallax={5} imgClassName="object-[50%_30%]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 pt-28 md:p-7">
                  <p className="flex items-center gap-3 font-display text-[10px] uppercase tracking-[0.24em] text-paper/75"><Live onDark /> Answered now</p>
                  <p className="h2-soft mt-3 max-w-[24ch] text-[clamp(1.25rem,2vw,1.625rem)] text-paper text-pretty">He answers his own phone. That is not a slogan; it is the operating model.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* the ledger */}
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-7">Why people call us</p></Reveal>
          <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Most firms sell", "you volume."]} />
          <LineReveal as="p" delay={0.15} className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] text-accent" lines={["We sell you attention."]} />

          <Reveal delay={0.2}>
            <div className="mt-14 hidden grid-cols-[9rem_1fr_1fr] gap-x-8 border-b border-line pb-4 font-display text-[10px] uppercase tracking-[0.22em] text-fg-3 md:grid">
              <span>The moment</span><span>Elsewhere</span><span className="text-accent">Here</span>
            </div>
          </Reveal>

          <ol ref={list} className="mt-10 border-t border-line md:mt-0 md:border-t-0">
            {ROWS.map((r, i) => {
              const d = i * 200;
              return (
                <li
                  key={r.when}
                  className="grid gap-y-2 border-b border-line py-6 md:grid-cols-[9rem_1fr_1fr] md:items-start md:gap-x-8 md:py-7"
                  style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(14px)", transition: `opacity .9s ${EASE} ${d}ms, transform .9s ${EASE} ${d}ms` }}
                >
                  <p className="font-display text-[10px] uppercase tracking-[0.2em] text-fg-3 md:pt-1.5">{r.when}</p>
                  <p className="relative w-fit text-[15px] leading-snug text-fg-3 md:pt-0.5">
                    {r.usual}
                    {/* the usual answer, struck through as the row lands */}
                    <span aria-hidden className="absolute left-0 top-1/2 h-px w-full origin-left bg-fg-3" style={{ transform: seen ? "scaleX(1)" : "scaleX(0)", transition: `transform .7s ${EASE} ${d + 520}ms` }} />
                  </p>
                  <p
                    className="display text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-tight text-fg"
                    style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)", transition: `opacity .8s ${EASE} ${d + 780}ms, transform .8s ${EASE} ${d + 780}ms` }}
                  >
                    {r.here}
                  </p>
                </li>
              );
            })}
          </ol>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-wine">Start with a call</Link>
              <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost">{site.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
