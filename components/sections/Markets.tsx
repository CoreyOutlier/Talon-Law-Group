import Link from "next/link";
import { markets, site } from "@/lib/site";
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
            <Link href={`/offices/${m.slug}`} className="group flex h-full flex-col p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="eyebrow !text-fg-3">{m.kicker}</span>
                {m.isHQ && <span className="border border-accent/40 px-2 py-1 font-display text-[9px] uppercase tracking-[0.16em] text-accent">Head office</span>}
              </div>
              <h3 className="display mt-8 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none text-fg transition-colors duration-500 group-hover:text-accent">{m.city}</h3>
              <p className="mt-2 font-display text-[11px] uppercase tracking-[0.2em] text-fg-3">{m.stateFull}</p>
              <p className="mt-6 flex-1 text-[14px] leading-relaxed text-fg-2">{m.lede}</p>
              <span className="mt-8 flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.16em] text-fg-3 transition-all duration-500 group-hover:gap-5 group-hover:text-accent">{m.city} injury law <span aria-hidden>→</span></span>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}><p className="mt-8 text-[12px] leading-relaxed text-fg-3">Also accepting matters in {site.alsoServing.join(", ")}.</p></Reveal>
    </section>
  );
}
