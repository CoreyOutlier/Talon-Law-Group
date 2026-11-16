import { markets, site } from "@/lib/site";
import { env } from "@/lib/env";
import { CaseIntake } from "@/components/CaseIntake";
import { Figure } from "@/components/Figure";
import { LineReveal, Live, Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section id="start" className="dark relative overflow-hidden">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <LineReveal as="h2" className="display display-xl max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)]" lines={["Tell us what", "happened."]} />
          <Reveal delay={0.25}>
            <div className="mt-10"><Figure src={env.desk} alt="" ratio="16 / 10" wipe="x" parallax={5} /></div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 space-y-3 border-t border-line pt-7">
              <a href={`tel:${site.phoneRaw}`} className="block"><p className="eyebrow flex items-center gap-2.5 !text-fg-3"><Live />Or call. Answered now, 24 hours</p><p className="figure link-draw mt-2 w-fit text-[clamp(1.75rem,3.5vw,2.5rem)] text-accent">{site.phone}</p></a>
              <div className="grid gap-5 pt-2 sm:grid-cols-2">
                {markets.filter((m) => m.address).map((m) => (
                  <address key={m.slug} className="not-italic text-[13px] leading-relaxed text-fg-3">
                    <span className="mb-1 block font-display text-[10px] uppercase tracking-[0.2em] text-fg-3">{m.city} Office</span>
                    {m.address!.street}<br />{m.address!.city}, {m.address!.region} {m.address!.postal}
                  </address>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="border border-line bg-ground-2 p-7 md:p-10"><CaseIntake /></div>
        </Reveal>
      </div>
    </section>
  );
}
