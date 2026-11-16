import type { Metadata } from "next";
import Link from "next/link";
import { practiceAreas } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Truck and car crashes, wrongful death, slip and fall, nursing home neglect and abuse, pedestrian and bicycle collisions, hit and run.",
};

export default function PracticeAreasIndex() {
  return (
    <>
      <PageHeader
        lines={["What we", "do best."]}
        lede="Helping people who have been hurt is all we do and we do it well."
      />

      <section className="shell pb-20 md:pb-28">
        <ul className="border-t border-line">
          {practiceAreas.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-b border-line">
              <Link href={`/practice-areas/${p.slug}`} className="group block py-9 md:py-12">
                <div className="grid gap-5 md:grid-cols-12 md:items-baseline">
                  <span className="figure text-[12px] text-fg-3 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-fg/90 transition-colors duration-500 group-hover:text-accent md:col-span-10">
                    {p.name}
                  </h2>
                  <span
                    className="hidden text-right text-fg-3 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:block"
                    style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTA />
    </>
  );
}
