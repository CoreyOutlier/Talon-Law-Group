import Link from "next/link";
import { env } from "@/lib/env";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

/* The position, stated once. Replaces the photo strip: one line on why a
   trial-ready file is worth more, three entries in the ledger, one image. */

const LEDGER = [
  { k: "01", title: "Every file built as a trial file.", body: "From the first call, not the month before trial. Insurers read the difference in the first letter." },
  { k: "02", title: "One lawyer, start to finish.", body: "The lawyer you meet is the lawyer who negotiates your case and the one standing up in the courtroom." },
  { k: "03", title: "Paid only when you are.", body: "No retainer. No hourly bill. A percentage of what we recover, and nothing if we recover nothing." },
];

export function Standard() {
  return (
    <section className="dark border-y border-line">
      <div className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-8">The standard</p></Reveal>
          <LineReveal
            as="h2"
            className="display display-xl max-w-[14ch] text-[clamp(2.25rem,5.5vw,5rem)]"
            lines={["Built to try.", <span key="a" className="text-accent">Priced accordingly.</span>]}
          />
          <Reveal delay={0.2}>
            <p className="h2-soft mt-10 max-w-[34ch] text-[clamp(1.25rem,2vw,1.625rem)] text-fg-2 text-pretty">
              Insurers value a claim by the lawyer holding it. A file that is ready for a jury from the first week is worth more on the day it settles. That is not a slogan. It is the pricing model.
            </p>
          </Reveal>
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {LEDGER.map((l, i) => (
              <Reveal as="li" key={l.k} delay={0.1 + i * 0.09} className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                <span className="figure text-[13px] text-accent md:col-span-1">{l.k}</span>
                <p className="display text-[1.0625rem] leading-tight md:col-span-5">{l.title}</p>
                <p className="text-[14px] leading-relaxed text-fg-3 md:col-span-6">{l.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}><Link href="/about" className="btn btn-ghost mt-12">How we work</Link></Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.15}>
            <Figure src={env.loft} alt="" ratio="4 / 5" wipe="x" parallax={6} />
            <p className="mt-5 max-w-[34ch] text-[12px] leading-relaxed text-fg-3">The room where the file gets built. Quiet on purpose.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
