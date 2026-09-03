import Link from "next/link";
import { markets, site } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

/* ---------------------------------------------------------------------------
 * Markets — three cities as the positioning statement.
 * Pittsburgh alone reads local. Pittsburgh, New York and Los Angeles reads
 * like a trial practice with reach. That is the point of this section.
 * ------------------------------------------------------------------------- */
export function Markets() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal><p className="eyebrow mb-6">Where we work</p></Reveal>
          <LineReveal
            as="h2"
            className="display max-w-[20ch] text-[clamp(2rem,4.75vw,3.75rem)]"
            lines={["Three cities.", "One standard."]}
          />
        </div>
        <Reveal delay={0.2}>
          <Link href="/offices" className="btn btn-ghost">All offices</Link>
        </Reveal>
      </div>

      <div className="grid gap-px bg-hairline md:grid-cols-3">
        {markets.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.09} className="bg-ink">
            <Link href={`/offices/${m.slug}`} className="group flex h-full flex-col p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="eyebrow !text-steel-2">{m.kicker}</span>
                {m.isHQ && (
                  <span className="border border-wine/40 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-wine-2">
                    Head office
                  </span>
                )}
              </div>

              <h3 className="display mt-8 text-[clamp(2rem,4vw,3rem)] leading-none text-mist transition-colors duration-500 group-hover:text-wine-2">
                {m.city}
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-steel">
                {m.stateFull}
              </p>

              <p className="mt-6 flex-1 text-[14px] leading-relaxed text-mist/60">{m.lede}</p>

              <span
                className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-steel transition-all duration-500 group-hover:gap-5 group-hover:text-wine-2"
                style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
              >
                {m.city} injury law <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[74ch] text-[12px] leading-relaxed text-steel-2">
          Also accepting matters in {site.alsoServing.join(", ")}.
        </p>
      </Reveal>
    </section>
  );
}
