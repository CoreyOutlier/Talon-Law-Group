import type { Metadata } from "next";
import { publishedTestimonials, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";
import { Voices } from "@/components/sections/Voices";

/* Reviews. One long review carried in full on a dark band, the way it was
   written; then every other review as an editorial ledger, set at a size
   that fits its length, with the client's name and where it was published.
   Nothing is paraphrased. Names are shortened. */

const WORDS = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

export const metadata: Metadata = {
  title: "Client Reviews",
  description: `What clients say about working with ${site.name} and Shaheen Wallace, Esq. Published on Google and Avvo by the clients themselves.`,
};

function Stars() {
  return (
    <span aria-label="Five stars" className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => <span key={i} aria-hidden className="block h-1.5 w-1.5 rotate-45 bg-accent" />)}
    </span>
  );
}

export default function Reviews() {
  const featured = publishedTestimonials.find((t) => t.featured);
  const rest = publishedTestimonials.filter((t) => t !== featured);
  const n = publishedTestimonials.length;
  const sources = Array.from(new Set(publishedTestimonials.map((t) => t.source)));

  return (
    <>
      <PageHeader
        eyebrow="In their words"
        lines={[`${WORDS[n] ? WORDS[n][0].toUpperCase() + WORDS[n].slice(1) : n} people.`, "Their words,", "not ours."]}
        lede={`Every review here was written by the client and published on ${sources.join(" or ")}. We do not write them, edit them, or pay for them. Names are shortened. Nothing else is.`}
        photo="/media/photos/couch-laugh.jpg"
      />

      {featured && (
        <section className="dark grain-on relative border-y border-line">
          <div className="shell py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-3">
                <Reveal>
                  <p className="eyebrow mb-6">The one we would show a jury</p>
                  <Stars />
                  <p className="display mt-6 text-[1.25rem]">{featured.author}</p>
                  <p className="mt-2 font-display text-[11px] uppercase tracking-[0.18em] text-fg-3">{featured.matter} · {featured.source}</p>
                  <p className="mt-8 max-w-[26ch] text-[13px] leading-relaxed text-fg-3">Turned away by the firms on the radio. The whole review, as he wrote it.</p>
                </Reveal>
              </div>
              <blockquote className="lg:col-span-9">
                <span aria-hidden className="display block text-[clamp(5rem,10vw,9rem)] leading-[0.6] text-accent">“</span>
                {featured.quote.split("\n\n").map((para, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <p className={`${i === 0 ? "h2-soft text-[clamp(1.5rem,2.8vw,2.375rem)] text-fg" : "mt-7 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed text-fg-2"} max-w-[60ch] text-pretty`}>{para}</p>
                  </Reveal>
                ))}
              </blockquote>
            </div>
          </div>
        </section>
      )}

      <section className="shell py-20 md:py-28">
        <ol className="border-t border-line">
          {rest.map((t, i) => {
            const long = t.quote.length > 260;
            const short = t.quote.length < 110;
            return (
              <Reveal as="li" key={i} delay={0.04 * (i % 4)} className="grid gap-5 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-12">
                <div className="flex items-start justify-between md:col-span-3 md:block">
                  <div>
                    <p className="figure text-[12px] text-fg-3">{String(i + 1).padStart(2, "0")}</p>
                    <p className="display mt-4 text-[1.125rem] leading-tight">{t.author}</p>
                    <p className="mt-2 font-display text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.matter}</p>
                    <p className="mt-1 font-display text-[10px] uppercase tracking-[0.18em] text-fg-3">{t.source}</p>
                  </div>
                  <div className="md:mt-5"><Stars /></div>
                </div>
                <blockquote className={`md:col-span-9 ${long ? "lg:col-span-8" : "lg:col-span-7"}`}>
                  <p className={`h2-soft max-w-[52ch] text-pretty text-fg ${short ? "text-[clamp(1.5rem,2.8vw,2.5rem)]" : long ? "text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-relaxed text-fg/85" : "text-[clamp(1.25rem,2.1vw,1.75rem)]"}`}>
                    <span className="text-accent">“</span>{t.quote}<span className="text-accent">”</span>
                  </p>
                </blockquote>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-10 max-w-[80ch] text-[12px] leading-relaxed text-fg-3">
          Testimonials reflect the experience of individual clients and are not a guarantee, warranty or prediction regarding the outcome of any other matter.
        </p>
      </section>

      <Voices />
      <CTA />
    </>
  );
}
