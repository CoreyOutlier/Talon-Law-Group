"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Live, Reveal } from "@/components/Motion";

/* Insurance companies are not your friend. His words, Nov 13, 2026. The
   photograph beside it is the point: he answers his own phone. */

export function Promise() {
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
          <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Insurance companies", "are not your friend."]} />
          <LineReveal as="p" delay={0.15} className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] text-accent" lines={["We're not theirs either."]} />

          <Reveal delay={0.2}>
            <p className="h2-soft mt-12 max-w-[40ch] text-[clamp(1.25rem,2vw,1.625rem)] text-fg-2 text-pretty">
              Don't let insurance companies with cute slogans fool you. They care about one thing only and that's not paying fairly on claims so they can keep more money in their pocket. We are here to get you what you are owed.
            </p>
          </Reveal>

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
