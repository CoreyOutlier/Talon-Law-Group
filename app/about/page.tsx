import type { Metadata } from "next";
import { attorney, site } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";
import { Ticker } from "@/components/sections/Ticker";

export const metadata: Metadata = {
  title: "Shaheen Wallace, Esq. — Trial Attorney",
  description:
    "Shaheen Z. Wallace is the founder of Talon Law Group, a Pittsburgh trial practice serving injured people across Pennsylvania, New York and Georgia.",
};

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Founder & trial attorney"
        lines={["Shaheen", <em key="e" className="not-italic text-brass">Wallace,</em>, "Esq."]}
        lede={attorney.lede}
      />

      <Ticker />

      <section className="shell grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Figure
                src={attorney.portrait}
                alt={`${attorney.name}, ${attorney.suffix}`}
                ratio="4 / 5"
                note="Vertical portrait, 1600×2000 or larger."
              />
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="eyebrow mb-4">Admitted & serving</p>
                <ul className="space-y-1 text-[14px] text-bone/75">
                  {site.jurisdictions.map((j) => <li key={j}>{j}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {attorney.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={
                  i === 0
                    ? "text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug text-bone/90 display"
                    : "mt-7 text-[1.0625rem] leading-relaxed text-bone/70 text-pretty"
                }
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="mt-14 border-t border-hairline pt-10">
              <p className="eyebrow mb-8">Credentials</p>
              <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {attorney.credentials.map((c) => (
                  <li key={c.label} className="border-l border-hairline pl-5">
                    <p className="text-[15px] leading-snug text-bone/90">{c.label}</p>
                    <p className="mt-1 text-[12px] text-slate">{c.meta}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <blockquote className="mt-14 border-l-2 border-brass pl-7">
              <p className="display text-[clamp(1.5rem,2.8vw,2.125rem)] leading-snug text-bone">
                Insurance companies price a case by the lawyer holding it. That is the
                entire business. My job is to make that calculation expensive.
              </p>
              <footer className="mt-5 text-[12px] uppercase tracking-[0.18em] text-slate">
                {attorney.name}, {attorney.suffix}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
