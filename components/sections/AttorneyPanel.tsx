import Link from "next/link";
import { attorney } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

export function AttorneyPanel() {
  return (
    <section className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <Figure src={attorney.portrait} alt={`${attorney.name}, ${attorney.suffix}`} ratio="3 / 4" wipe="x" parallax={6} imgClassName="object-[50%_22%]" />
      </Reveal>
      <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
        <Reveal><p className="eyebrow mb-7">The attorney</p></Reveal>
        <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)]" lines={["Shaheen Wallace,", <em key="e" className="not-italic text-accent">Esq.</em>]} />
        <Reveal delay={0.15}><p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-fg-2 text-pretty">{attorney.lede}</p></Reveal>
        <Reveal delay={0.25}>
          <ul className="mt-10 grid gap-x-10 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
            {attorney.credentials.map((c) => (<li key={c.label}><p className="text-[14px] leading-snug text-fg">{c.label}</p><p className="mt-1 text-[12px] text-fg-3">{c.meta}</p></li>))}
          </ul>
        </Reveal>
        <Reveal delay={0.35}><Link href="/about" className="btn btn-ghost mt-10">Read the full profile</Link></Reveal>
      </div>
    </section>
  );
}
