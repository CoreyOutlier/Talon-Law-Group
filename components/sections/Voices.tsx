import Link from "next/link";
import { publishedTestimonials } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

export function Voices() {
  if (publishedTestimonials.length === 0) return null;

  return (
    <section className="border-y border-hairline bg-ink-2">
      <div className="shell py-24 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><p className="eyebrow mb-6">In their words</p></Reveal>
            <LineReveal
              as="h2"
              className="display max-w-[18ch] text-[clamp(2rem,4.75vw,3.75rem)]"
              lines={["Clients who", "were heard."]}
            />
          </div>
          <Reveal delay={0.2}>
            <Link href="/reviews" className="btn btn-ghost">All reviews</Link>
          </Reveal>
        </div>

        <div className="grid gap-px bg-hairline md:grid-cols-3">
          {publishedTestimonials.slice(0, 3).map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="flex flex-col justify-between bg-ink-2 p-8 md:p-10">
              <blockquote className="h2-soft text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-mist/90">
                <span className="text-wine-2">“</span>
                {t.quote}
                <span className="text-wine-2">”</span>
              </blockquote>
              <footer className="mt-8 border-t border-hairline pt-5">
                <p className="text-[13px] text-mist/80">{t.author}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-steel-2">
                  {t.matter} · via {t.source}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
