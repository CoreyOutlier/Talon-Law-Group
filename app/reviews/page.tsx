import type { Metadata } from "next";
import { publishedTestimonials, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: `What clients say about working with ${site.name} and Shaheen Wallace, Esq.`,
};

export default function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="In their words"
        lines={["What it is", "like to be", "represented."]}
        lede="Reviews published here come from independent platforms. We do not write them, we do not edit them, and we do not pay for them."
      />

      <section className="shell pb-20 md:pb-28">
        {publishedTestimonials.length > 0 ? (
          <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2">
            {publishedTestimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.07} className="flex flex-col justify-between bg-ink p-9 md:p-12">
                <blockquote className="display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-snug text-mist/90">
                  <span className="text-wine-2">“</span>{t.quote}<span className="text-wine-2">”</span>
                </blockquote>
                <footer className="mt-12 border-t border-hairline pt-6">
                  <p className="text-[14px] text-mist/85">{t.author}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-steel-2">
                    {t.matter} · via {t.source}
                  </p>
                </footer>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="border-y border-hairline py-16 text-[15px] text-steel">
            Reviews are being verified for publication. In the meantime, they can be read on
            independent directories.
          </p>
        )}

        <p className="mt-10 max-w-[80ch] text-[12px] leading-relaxed text-steel-2">
          Testimonials reflect the experience of individual clients and are not a guarantee,
          warranty or prediction regarding the outcome of any other matter.
        </p>
      </section>

      <CTA />
    </>
  );
}
