import type { Metadata } from "next";
import Link from "next/link";
import { practiceAreas } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Motion";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Truck and car crashes, medical malpractice, wrongful death, premises liability, nursing home neglect, birth injury, pedestrian and bicycle collisions.",
};

export default function PracticeAreasIndex() {
  return (
    <>
      <PageHeader
        eyebrow="What we handle"
        lines={["Serious injury.", "Nothing smaller."]}
        lede="We take a limited number of cases so each one gets tried-file preparation. If your matter is not one we should handle, we will tell you and point you to someone who should."
      />

      <section className="shell pb-20 md:pb-28">
        <ul className="border-t border-hairline">
          {practiceAreas.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-b border-hairline">
              <Link href={`/practice-areas/${p.slug}`} className="group block py-9 md:py-12">
                <div className="grid gap-5 md:grid-cols-12 md:items-baseline">
                  <span className="figure text-[12px] text-steel-2 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-5">
                    <h2 className="display text-[clamp(1.25rem,2.4vw,2rem)] leading-tight text-mist/90 transition-colors duration-500 group-hover:text-wine-2">
                      {p.name}
                    </h2>
                    <p className="eyebrow mt-3 !text-steel-2">{p.kicker}</p>
                  </div>
                  <p className="max-w-[46ch] text-[15px] leading-relaxed text-mist/65 md:col-span-5">
                    {p.intro}
                  </p>
                  <span
                    className="hidden text-right text-steel-2 transition-all duration-500 group-hover:translate-x-1 group-hover:text-wine-2 md:col-span-1 md:block"
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
