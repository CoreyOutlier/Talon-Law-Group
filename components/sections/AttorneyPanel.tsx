import Link from "next/link";
import { attorney } from "@/lib/site";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

export function AttorneyPanel() {
  return (
    <section className="relative border-y border-hairline bg-ink-2">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <Figure
              src={attorney.portrait}
              alt={`${attorney.name}, ${attorney.suffix}`}
              ratio="4 / 5"
              note="Vertical portrait, 1600×2000 or larger."
            />
            <div className="absolute -bottom-5 -right-5 hidden bg-wine px-6 py-5 md:block">
              <p className="figure text-[2rem] leading-none text-ink">10+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink/70">
                Years in practice
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal><p className="eyebrow mb-7">The attorney</p></Reveal>
          <LineReveal
            as="h2"
            className="display max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)]"
            lines={["Shaheen Wallace,", <em key="e" className="not-italic text-wine-2">Esq.</em>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-mist/75 text-pretty">
              {attorney.lede}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 grid gap-x-10 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-2">
              {attorney.credentials.map((c) => (
                <li key={c.label}>
                  <p className="text-[14px] leading-snug text-mist/85">{c.label}</p>
                  <p className="mt-1 text-[12px] text-steel">{c.meta}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.35}>
            <Link href="/about" className="btn btn-ghost mt-10">Read the full profile</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
