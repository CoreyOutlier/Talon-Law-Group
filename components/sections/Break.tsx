"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/scrollfx";
import { LineReveal, Reveal } from "@/components/Motion";

/* Full-bleed environmental photograph with a slow parallax bed and one line of
   copy. A pause between chapters. */
export function Break({ src, eyebrow, lines, note, height = "78vh", position = "50% 50%" }: {
  src: string; eyebrow?: string; lines: string[]; note?: string; height?: string; position?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const bed = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    const b = bed.current;
    if (b) b.style.transform = `translate3d(0, ${(p - 0.5) * 16}%, 0) scale(1.18)`;
  });

  return (
    <section ref={section} className="dark relative overflow-hidden" style={{ height }}>
      <div ref={bed} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.18)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-cover" style={{ objectPosition: position }} loading="lazy" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
      <div className="shell relative flex h-full flex-col justify-end pb-14 md:pb-20">
        {eyebrow && <Reveal><p className="eyebrow mb-6">{eyebrow}</p></Reveal>}
        <LineReveal as="p" className="display display-xl max-w-[16ch] text-[clamp(2rem,5.5vw,5rem)] text-paper" lines={lines} />
        {note && <Reveal delay={0.2}><p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-paper/70">{note}</p></Reveal>}
      </div>
    </section>
  );
}
