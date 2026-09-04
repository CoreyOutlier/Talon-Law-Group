import type { Metadata } from "next";
import { markets, site } from "@/lib/site";
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
          <div className="border border-line bg-ground-2 p-7 md:p-10">
            <CaseIntake />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:order-1">
          <div className="space-y-10">
            <div>
              <p className="eyebrow mb-4">Call, 24 hours</p>
              <a
                href={`tel:${site.phoneRaw}`}
                className="display link-draw block w-fit text-[clamp(1.875rem,4vw,2.75rem)] text-accent"
              >
                {site.phone}
              </a>
              <p className="mt-3 text-[13px] text-fg-3">{site.hours}</p>
            </div>

            <div className="border-t border-line pt-8">
              <p className="eyebrow mb-4">Text</p>
              <a href={`sms:${site.smsRaw}`} className="link-draw text-[16px] text-fg/85">
                {site.phone}
              </a>
            </div>

            <div className="border-t border-line pt-8">
              <p className="eyebrow mb-4">Email</p>
              <a href={`mailto:${site.email}`} className="link-draw text-[16px] text-fg/85">
                {site.email}
              </a>
            </div>

            <div className="border-t border-line pt-8">
              <p className="eyebrow mb-5">Offices</p>
              <ul className="space-y-6">
                {markets.map((m) => (
                  <li key={m.slug}>
                    <p className="text-[15px] text-fg/90">
                      {m.city}, {m.state}
                      {m.isHQ && <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-accent">Head office</span>}
                    </p>
                    {m.address ? (
                      <>
                        <address className="mt-1 not-italic text-[13px] leading-relaxed text-fg-3">
                          {m.address.street}
                          <br />
                          {m.address.city}, {m.address.region} {m.address.postal}
                        </address>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            `${m.address.street}, ${m.address.city}, ${m.address.region} ${m.address.postal}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link-draw mt-2 inline-block text-[12px] text-accent"
                        >
                          Directions
                        </a>
                      </>
                    ) : (
                      <p className="mt-1 text-[13px] leading-relaxed text-fg-3">
                        By phone, video or in-person by arrangement.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] text-fg-3">
                Also accepting matters in {site.alsoServing.join(", ")}.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
