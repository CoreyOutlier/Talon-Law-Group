import Link from "next/link";
import { markets, site } from "@/lib/site";
import { cityPhoto } from "@/lib/env";
import { LineReveal, Reveal } from "@/components/Motion";

export function Markets() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div><Reveal><p className="eyebrow mb-6">Where we work</p></Reveal>
          <LineReveal as="h2" className="display max-w-[20ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Three cities.", "One standard."]} /></div>
        <Reveal delay={0.2}><Link href="/offices" className="btn btn-ghost">All offices</Link></Reveal>
      </div>
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {markets.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.09} className="bg-ground">
            <Link href={`/offices/${m.slug}`} className="group flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-ground-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cityPhoto[m.slug] ?? m.photo} alt={`${m.city}, ${m.stateFull}`} loading="lazy" decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.06]"
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                  <span className="eyebrow !text-paper/80">{m.kicker}</span>
                  {m.isHQ && <span className="border border-paper/40 px-2 py-1 font-display text-[9px] uppercase tracking-[0.16em] text-paper">Head office</span>}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <h3 className="display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none text-fg transition-colors duration-500 group-hover:text-accent">{m.city}</h3>
                <p className="mt-2 font-display text-[11px] uppercase tracking-[0.2em] text-fg-3">{m.stateFull}</p>
                <p className="mt-6 flex-1 text-[14px] leading-relaxed text-fg-2">{m.lede}</p>
                <span className="mt-8 flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.16em] text-fg-3 transition-all duration-500 group-hover:gap-5 group-hover:text-accent">{m.city} injury law <span aria-hidden>→</span></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}><p className="mt-8 text-[12px] leading-relaxed text-fg-3">Also accepting matters in {site.alsoServing.join(", ")}.</p></Reveal>
    </section>
  );
}
