import { site } from "@/lib/site";
import { env } from "@/lib/env";
import { CaseIntake } from "@/components/CaseIntake";
import { Figure } from "@/components/Figure";
import { LineReveal, Live, Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section id="start" className="dark relative overflow-hidden">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow mb-7">No fee unless we win</p></Reveal>
          <LineReveal as="h2" className="display display-xl max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)]" lines={["Tell us what", "happened."]} />
          <Reveal delay={0.2}><p className="mt-7 max-w-[42ch] text-[1.0625rem] leading-relaxed text-fg-2">Five questions. Under ninety seconds. A lawyer reads every one and calls you back — usually within fifteen minutes during business hours.</p></Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10"><Figure src={env.desk} alt="" ratio="16 / 10" wipe="x" parallax={5} /></div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 space-y-3 border-t border-line pt-7">
              <a href={`tel:${site.phoneRaw}`} className="block"><p className="eyebrow flex items-center gap-2.5 !text-fg-3"><Live />Or call. Answered now, 24 hours</p><p className="figure link-draw mt-2 w-fit text-[clamp(1.75rem,3.5vw,2.5rem)] text-accent">{site.phone}</p></a>
              <address className="not-italic text-[13px] leading-relaxed text-fg-3">{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postal}</address>
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
