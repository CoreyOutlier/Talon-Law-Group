import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { markets, practiceAreas, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = markets.find((x) => x.slug === slug);
  if (!m) return {};
  return {
    title: `${m.city} Personal Injury Lawyer`,
    description: m.lede,
    alternates: { canonical: `${site.domain}/offices/${m.slug}` },
  };
}

export default async function Office({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = markets.find((x) => x.slug === slug);
  if (!m) notFound();

  const idx = markets.findIndex((x) => x.slug === slug);
  const next = markets[(idx + 1) % markets.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${site.name} — ${m.city}`,
    url: `${site.domain}/offices/${m.slug}`,
    telephone: site.phone,
    areaServed: { "@type": "City", name: `${m.city}, ${m.state}` },
    ...(m.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: m.address.street,
        addressLocality: m.address.city,
        addressRegion: m.address.region,
        postalCode: m.address.postal,
        addressCountry: "US",
      },
    }),
    ...(m.geo && {
      geo: { "@type": "GeoCoordinates", latitude: m.geo.lat, longitude: m.geo.lng },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <PageHeader
        eyebrow={`${m.kicker} · ${m.stateFull}`}
        lines={[m.city, <em key="e" className="not-italic text-wine-2">injury law.</em>]}
        lede={m.lede}
      />

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {m.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
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

            {/* The local rules. This is the section that earns the click. */}
            <Reveal delay={0.15}>
              <div className="mt-16 border-t border-hairline pt-10">
                <p className="eyebrow mb-3">The rules that decide {m.city} cases</p>
                <p className="mb-8 max-w-[56ch] text-[14px] leading-relaxed text-steel">
                  Injury law is local law. These are the {m.stateFull} provisions that most
                  often determine whether a claim is worth what it should be — or worth
                  nothing at all.
                </p>
                <dl className="divide-y divide-hairline border-y border-hairline">
                  {m.rules.map((r) => (
                    <div key={r.label} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                      <dt className="display text-[1.1875rem] leading-snug text-wine-2 md:col-span-4">
                        {r.label}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-mist/65 md:col-span-8">
                        {r.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-14 border-t border-hairline pt-10">
                <p className="eyebrow mb-6">Courts we appear in</p>
                <ul className="space-y-3">
                  {m.courts.map((c) => (
                    <li key={c} className="flex gap-4 text-[15px] text-mist/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-wine" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-14 border-t border-hairline pt-10">
                <p className="eyebrow mb-6">Serving</p>
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-mist/70">
                  {m.areas.join(", ")}.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.12}>
              <div className="lg:sticky lg:top-28">
                <div className="border border-hairline p-7">
                  <p className="eyebrow mb-4">{m.isHQ ? "Office" : "Contact"}</p>
                  {m.address ? (
                    <address className="not-italic text-[15px] leading-relaxed text-mist/85">
                      {m.address.street}
                      <br />
                      {m.address.city}, {m.address.region} {m.address.postal}
                    </address>
                  ) : (
                    <p className="text-[15px] leading-relaxed text-mist/85">
                      Consultations by phone, video or in person by arrangement across{" "}
                      {m.city}.
                    </p>
                  )}

                  <a href={`tel:${site.phoneRaw}`} className="btn btn-wine mt-6 w-full">
                    {site.phone}
                  </a>
                  <Link href="/contact" className="btn btn-ghost mt-3 w-full">
                    Start your case
                  </Link>
                  <p className="mt-5 text-[12px] leading-relaxed text-steel">{site.hours}</p>
                </div>

                <div className="mt-8 border border-hairline p-7">
                  <p className="eyebrow mb-4">Practice areas</p>
                  <ul className="space-y-2">
                    {practiceAreas.slice(0, 6).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/practice-areas/${p.slug}`}
                          className="link-draw text-[14px] text-mist/70"
                        >
                          {p.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal delay={0.15}>
          <Link
            href={`/offices/${next.slug}`}
            className="group mt-24 flex items-center justify-between gap-6 border-t border-hairline pt-10"
          >
            <span>
              <span className="eyebrow !text-steel-2">Next office</span>
              <span className="display mt-3 block text-[clamp(1.75rem,4vw,3rem)] leading-none text-mist/85 transition-colors duration-500 group-hover:text-wine-2">
                {next.city}
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
