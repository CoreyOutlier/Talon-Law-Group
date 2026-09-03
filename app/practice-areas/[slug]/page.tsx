import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { practiceAreas, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { Figure } from "@/components/Figure";
import { CTA } from "@/components/sections/CTA";

export function generateStaticParams() {
  return practiceAreas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((p) => p.slug === slug);
  if (!area) return {};
  return {
    title: `${area.name} Lawyer — Pittsburgh`,
    description: area.intro,
    alternates: { canonical: `${site.domain}/practice-areas/${area.slug}` },
  };
}

export default async function PracticeArea({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = practiceAreas.find((p) => p.slug === slug);
  if (!area) notFound();

  const idx = practiceAreas.findIndex((p) => p.slug === slug);
  const next = practiceAreas[(idx + 1) % practiceAreas.length];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHeader eyebrow={area.kicker} lines={[area.name]} lede={area.intro} />

      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-center gap-4 border-y border-hairline py-5">
            <span className="h-1.5 w-1.5 rotate-45 bg-wine" aria-hidden />
            <p className="text-[13px] uppercase tracking-[0.14em] text-wine-2">{area.urgency}</p>
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {area.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p
                  className={
                    i === 0
                      ? "display text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug text-mist/90"
                      : "mt-7 text-[1.0625rem] leading-relaxed text-mist/70 text-pretty"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}

            {area.faqs.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-16 border-t border-hairline pt-10">
                  <p className="eyebrow mb-8">Questions we get</p>
                  <dl className="divide-y divide-hairline border-y border-hairline">
                    {area.faqs.map((f) => (
                      <div key={f.q} className="py-7">
                        <dt className="display text-[1.25rem] leading-snug text-mist">{f.q}</dt>
                        <dd className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-mist/65">
                          {f.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <div className="lg:sticky lg:top-28">
                <Figure
                  src={`/media/practice/${area.slug}.jpg`}
                  alt={area.name}
                  ratio="3 / 4"
                  note="Optional supporting image."
                />
                <div className="mt-8 border border-hairline p-7">
                  <p className="eyebrow mb-4">Talk it through</p>
                  <p className="text-[14px] leading-relaxed text-mist/70">
                    Free, confidential, no obligation. You will speak with the attorney.
                  </p>
                  <a href={`tel:${site.phoneRaw}`} className="btn btn-wine mt-6 w-full">
                    {site.phone}
                  </a>
                  <Link href="/contact" className="btn btn-ghost mt-3 w-full">
                    Start your case
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal delay={0.2}>
          <Link
            href={`/practice-areas/${next.slug}`}
            className="group mt-24 flex items-center justify-between gap-6 border-t border-hairline pt-10"
          >
            <span>
              <span className="eyebrow !text-steel-2">Next</span>
              <span className="display mt-3 block text-[clamp(1.75rem,4vw,3rem)] leading-none text-mist/85 transition-colors duration-500 group-hover:text-wine-2">
                {next.name}
              </span>
            </span>
            <span
              className="text-steel-2 transition-all duration-500 group-hover:translate-x-2 group-hover:text-wine-2"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
              aria-hidden
            >
              →
            </span>
          </Link>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
