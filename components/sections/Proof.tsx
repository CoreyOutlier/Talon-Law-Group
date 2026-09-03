import Link from "next/link";
import { publishedResults, resultsDisclaimer, site } from "@/lib/site";
import { Counter, LineReveal, Reveal } from "@/components/Motion";

export function Proof() {
  return (
    <section className="shell py-24 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow mb-7">The record</p></Reveal>
          <LineReveal
            as="h2"
            className="display text-[clamp(2.25rem,5.5vw,4.25rem)]"
            lines={["Numbers we", "can document."]}
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[44ch] text-[15px] leading-relaxed text-mist/65">
              We publish results we can stand behind. If a firm shows you a wall of figures
              with no case behind them, ask which ones they tried.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {publishedResults.length > 0 && (
            <ul className="divide-y divide-hairline border-y border-hairline">
              {publishedResults.map((r, i) => (
                <Reveal as="li" key={`${r.amount}-${i}`} delay={i * 0.07} className="py-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <p className="figure text-[clamp(2.5rem,6vw,4rem)] leading-none text-wine">
                      {r.amount}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-steel">{r.type}</p>
                  </div>
                  <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-mist/65">
                    {r.detail}
                  </p>
                </Reveal>
              ))}
            </ul>
          )}

          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-hairline pt-10 sm:grid-cols-3">
              <Stat
                value={<Counter to={new Date().getFullYear() - Number(site.founded)} suffix="+" />}
                label="Years in practice"
              />
              <Stat value={<Counter to={3} />} label="States served" />
              <Stat value="24/7" label="Line answered" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="/results" className="btn btn-ghost">See case results</Link>
              <p className="max-w-[46ch] text-[11px] leading-relaxed text-steel-2">
                {resultsDisclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="figure text-[clamp(2rem,4vw,3rem)] leading-none text-mist">{value}</p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-steel">{label}</p>
    </div>
  );
}
