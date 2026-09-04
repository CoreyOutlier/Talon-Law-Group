import type { Metadata } from "next";
import { publishedResults, resultsDisclaimer } from "@/lib/site";
import { env } from "@/lib/env";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Case Results",
  description:
    "Documented recoveries obtained by Talon Law Group for seriously injured clients. Prior results do not guarantee a similar outcome.",
};

export default function Results() {
  return (
    <>
      <PageHeader
        eyebrow="The record"
        lines={["Results we", "can document."]}
        lede="We publish figures we can stand behind. Every recovery below is a real matter with a real file. Prior results never guarantee a future outcome — but they do tell you what a firm is willing to put its name on."
        photo={env.corridor}
      />

      <section className="shell pb-20 md:pb-28">
        {publishedResults.length > 0 ? (
          <ul className="border-t border-line">
            {publishedResults.map((r, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="group border-b border-line">
                <div className="grid gap-6 py-10 md:grid-cols-12 md:py-14">
                  <div className="md:col-span-4">
                    <p className="figure text-[clamp(2.75rem,7vw,5rem)] leading-none text-accent transition-transform duration-700 group-hover:translate-x-1"
                       style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
                      {r.amount}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-fg-3">{r.type}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="max-w-[52ch] text-[15px] leading-relaxed text-fg/70">{r.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="border-y border-line py-16 text-[15px] text-fg-3">
            Results are being compiled. Call us and we will discuss comparable matters directly.
          </p>
        )}

        <p className="mt-10 max-w-[80ch] text-[12px] leading-relaxed text-fg-3">
          {resultsDisclaimer}
        </p>
      </section>

      <CTA />
    </>
  );
}
