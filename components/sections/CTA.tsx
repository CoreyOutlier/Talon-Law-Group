import { site } from "@/lib/site";
import { CaseIntake } from "@/components/CaseIntake";
import { LineReveal, Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section id="start" className="relative overflow-hidden">
      <div className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow mb-7">No fee unless we win</p></Reveal>
          <LineReveal
            as="h2"
            className="display text-[clamp(2.5rem,6vw,4.75rem)]"
            lines={["Tell us what", "happened."]}
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[42ch] text-[1.0625rem] leading-relaxed text-mist/70">
              Five questions. Under ninety seconds. A lawyer reads every one and calls you
              back — usually within fifteen minutes during business hours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-4 border-t border-hairline pt-8">
              <a href={`tel:${site.phoneRaw}`} className="block">
                <p className="eyebrow !text-steel">Or call, 24 hours</p>
                <p className="display mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] text-wine link-draw w-fit">
                  {site.phone}
                </p>
              </a>
              <address className="not-italic text-[13px] leading-relaxed text-steel">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postal}
              </address>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="border border-hairline bg-ink-2 p-7 md:p-10">
            <CaseIntake />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
