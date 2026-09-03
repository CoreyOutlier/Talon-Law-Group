import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { CaseIntake } from "@/components/CaseIntake";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Contact",
  description: `Speak with Shaheen Wallace, Esq. Free consultation. ${site.phone}. ${site.address.street}, ${site.address.city}, ${site.address.region}.`,
};

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="No fee unless we win"
        lines={["Tell us what", "happened."]}
        lede="Five questions, under ninety seconds. A lawyer reads every submission and calls back — usually within fifteen minutes during business hours."
      />

      <section className="shell grid gap-14 pb-24 md:pb-36 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7 lg:order-2">
          <div className="border border-hairline bg-ink-2 p-7 md:p-10">
            <CaseIntake />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:order-1">
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Call, 24 hours</p>
              <a
                href={`tel:${site.phoneRaw}`}
                className="display link-draw block w-fit text-[clamp(1.875rem,4vw,2.75rem)] text-brass"
              >
                {site.phone}
              </a>
              <p className="mt-3 text-[13px] text-slate">{site.hours}</p>
            </div>

            <div className="border-t border-hairline pt-8">
              <p className="eyebrow mb-4">Text</p>
              <a href={`sms:${site.smsRaw}`} className="link-draw text-[16px] text-bone/85">
                {site.phone}
              </a>
            </div>

            <div className="border-t border-hairline pt-8">
              <p className="eyebrow mb-4">Email</p>
              <a href={`mailto:${site.email}`} className="link-draw text-[16px] text-bone/85">
                {site.email}
              </a>
            </div>

            <div className="border-t border-hairline pt-8">
              <p className="eyebrow mb-4">Office</p>
              <address className="not-italic text-[15px] leading-relaxed text-bone/85">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postal}
              </address>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="link-draw mt-3 inline-block text-[13px] text-brass"
              >
                Directions
              </a>
            </div>

            <div className="border-t border-hairline pt-8">
              <p className="eyebrow mb-4">Serving</p>
              <ul className="space-y-1 text-[15px] text-bone/85">
                {site.jurisdictions.map((j) => <li key={j}>{j}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
