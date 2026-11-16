import type { Metadata } from "next";
import Link from "next/link";
import { admissions, markets, site } from "@/lib/site";
import { cityPhoto } from "@/lib/env";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Locations — Pittsburgh, New York, Atlanta",
  description:
    "Talon Law Group represents seriously injured people in Pennsylvania, New York and Georgia, with offices in Pittsburgh and Garden City, New York.",
};

export default function Locations() {
  return (
    <>
      <PageHeader
        lines={["Where", "you are."]}
        lede="Talon Law Group is admitted to practice in Pennsylvania, New York, and Georgia. Wherever there is a serious injury that needs a serious team, Talon Law Group is there for you."
      />

      <section className="shell pb-20 md:pb-28">
        <ul className="border-t border-line">
          {markets.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.06} className="border-b border-line">
              <Link href={`/locations/${m.slug}`} className="group block py-10 md:py-14">
                <div className="grid gap-6 md:grid-cols-12 md:items-start">
                  <span className="figure text-[12px] text-fg-3 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="md:col-span-4">
                    <h2 className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-fg/90 transition-colors duration-500 group-hover:text-accent">
                      {m.city}
                    </h2>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-fg-3">{m.stateFull}</p>
                    {m.address && (
                      <address className="mt-6 not-italic text-[14px] leading-relaxed text-fg/70">
                        {m.address.street}
                        <br />
                        {m.address.city}, {m.address.region} {m.address.postal}
                      </address>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ground-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cityPhoto[m.slug] ?? m.photo}
                        alt={`${m.city}, ${m.stateFull}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.05]"
                        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                      />
                    </div>
                  </div>

                  <span
                    className="hidden text-right text-fg-3 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:block"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6">Admissions</p>
              <ul className="space-y-4">
                {admissions.map((adm) => (
                  <li key={adm.court} className="border-l border-line pl-5">
                    <p className="text-[14px] leading-snug text-fg/85">{adm.court}</p>
                    <p className="mt-1 text-[12px] text-fg-3">{adm.meta}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow mb-6">Admitted in</p>
              <ul className="space-y-2 text-[15px] text-fg/80">
                {site.states.map((j) => <li key={j}>{j}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
