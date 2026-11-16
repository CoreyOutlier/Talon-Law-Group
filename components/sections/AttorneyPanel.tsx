import Link from "next/link";
import { attorney } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

export function AttorneyPanel() {
  return (
    <section className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <Figure src={attorney.portrait} alt={`${attorney.name}, ${attorney.suffix}`} ratio="3 / 4" wipe="x" parallax={6} imgClassName="object-[80%_50%]" />
      </Reveal>
      <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
        <LineReveal as="h2" className="display whitespace-nowrap text-[clamp(1.5rem,2.6vw,2.375rem)]" lines={[<span key="n">Shaheen Wallace, <em className="not-italic text-accent">Esq.</em></span>]} />
        <Reveal delay={0.15}><p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-fg-2 text-pretty">{attorney.homeLede}</p></Reveal>
        <Reveal delay={0.35}><Link href="/about" className="btn btn-ghost mt-10">Read the full profile</Link></Reveal>
      </div>
    </section>
  );
}
