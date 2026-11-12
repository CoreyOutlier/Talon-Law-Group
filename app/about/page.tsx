import type { Metadata } from "next";
import { admissions, attorney, brand, markets, site } from "@/lib/site";
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
        lines={["Shaheen", <em key="e" className="not-italic text-accent">Wallace,</em>, "Esq."]}
        lede={attorney.lede}
      />

      <Ticker />

      <section className="dark border-b border-line">
        <div className="shell grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal><p className="eyebrow">The mission</p></Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.1}><p className="h2-soft max-w-[40ch] text-[clamp(1.5rem,2.8vw,2.5rem)] text-fg text-pretty">{brand.mission}</p></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-fg-2">{brand.oneMessage} {brand.name.short} The firm is named for the job.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="shell grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Figure
                src={attorney.portrait}
                alt={`${attorney.name}, ${attorney.suffix}`}
                ratio="4 / 5"
                imgClassName="object-[80%_50%]"
              />
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow mb-4">Admissions</p>
                <ul className="space-y-3 text-[13px] leading-snug text-fg/75">
                  {admissions.map((a) => (
                    <li key={a.court}>
                      {a.court}
                      <span className="mt-0.5 block text-[11px] text-fg-3">{a.meta}</span>
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mb-3 mt-7">Practising in</p>
                <ul className="space-y-1 text-[14px] text-fg/75">
                  {markets.map((m) => <li key={m.slug}>{m.city}, {m.state}</li>)}
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
                    ? "h2-soft text-[clamp(1.375rem,2.3vw,1.75rem)] text-fg"
                    : "mt-7 text-[1.0625rem] leading-relaxed text-fg/70 text-pretty"
                }
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="mt-14 border-t border-line pt-10">
              <p className="eyebrow mb-8">Credentials</p>
              <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {attorney.credentials.map((c) => (
                  <li key={c.label} className="border-l border-line pl-5">
                    <p className="text-[15px] leading-snug text-fg/90">{c.label}</p>
                    <p className="mt-1 text-[12px] text-fg-3">{c.meta}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <blockquote className="mt-14 border-l-2 border-accent pl-7">
              <p className="h2-soft text-[clamp(1.375rem,2.4vw,1.875rem)] text-fg">{attorney.quote}</p>
              <footer className="mt-5 text-[12px] uppercase tracking-[0.18em] text-fg-3">
                {attorney.name}, {attorney.suffix}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-14 border-t border-line pt-10">
              <p className="eyebrow mb-8">Off the clock</p>
              <ul className="divide-y divide-line border-y border-line">
                {attorney.human.map((h) => (
                  <li key={h.title} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                    <p className="display text-[1.0625rem] leading-tight md:col-span-3">{h.title}</p>
                    <p className="text-[15px] leading-relaxed text-fg/70 md:col-span-9">{h.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-14 border-t border-line pt-10">
              <p className="eyebrow mb-5">The firm's motto</p>
              <p className="display text-[clamp(1.5rem,3vw,2.5rem)]">{brand.motto.latin}</p>
              <p className="h2-soft mt-3 text-[clamp(1.125rem,1.8vw,1.375rem)] text-fg/70">{brand.motto.english}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
