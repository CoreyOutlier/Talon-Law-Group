import type { Metadata } from "next";
import Link from "next/link";
import { admissions, basisNote, markets, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Offices — Pittsburgh, New York, Los Angeles",
  description:
    "Talon Law Group represents seriously injured people in Pittsburgh, New York and Los Angeles, and accepts matters in Georgia.",
};

export default function Offices() {
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        lines={["Three cities.", "One standard."]}
        lede="Injury law is local law. The deadline that ends your case in Los Angeles does not exist in Pennsylvania, and the notice that saves it in New York has no counterpart anywhere else. Each office page sets out the rules that actually decide cases in that jurisdiction."
      />

      <section className="shell pb-20 md:pb-28">
        <ul className="border-t border-hairline">
          {markets.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.06} className="border-b border-hairline">
              <Link href={`/offices/${m.slug}`} className="group block py-10 md:py-14">
                <div className="grid gap-6 md:grid-cols-12 md:items-start">
                  <span className="figure text-[12px] text-steel-2 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="md:col-span-4">
                    <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-mist/90 transition-colors duration-500 group-hover:text-wine">
                      {m.city}
                    </h2>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-steel">
                      {m.stateFull}
                      {m.isHQ && <span className="text-wine"> · Head office</span>}
                    </p>
                  </div>

                  <div className="md:col-span-6">
                    <p className="max-w-[52ch] text-[15px] leading-relaxed text-mist/65">{m.lede}</p>
                    {m.address && (
                      <address className="mt-5 not-italic text-[13px] leading-relaxed text-steel">
                        {m.address.street}
                        <br />
                        {m.address.city}, {m.address.region} {m.address.postal}
                      </address>
                    )}
                  </div>

                  <span
                    className="hidden text-right text-steel-2 transition-all duration-500 group-hover:translate-x-1 group-hover:text-wine md:col-span-1 md:block"
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
          <div className="mt-16 grid gap-12 border-t border-hairline pt-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6">Admissions</p>
              <ul className="space-y-4">
                {admissions.map((adm) => (
                  <li key={adm.court} className="border-l border-hairline pl-5">
                    <p className="text-[14px] leading-snug text-mist/85">{adm.court}</p>
                    <p className="mt-1 text-[12px] text-steel">{adm.meta}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow mb-6">Also accepting matters in</p>
              <ul className="space-y-2 text-[15px] text-mist/80">
                {site.alsoServing.map((j) => <li key={j}>{j}</li>)}
              </ul>
              <p className="mt-8 max-w-[60ch] text-[12px] leading-relaxed text-steel-2">
                {basisNote(markets[1])}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
