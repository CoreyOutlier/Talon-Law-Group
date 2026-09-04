"use client";

import { useRef } from "react";
import { photos } from "@/lib/site";
import { useScrollProgress } from "@/lib/scrollfx";

/* A horizontal contact sheet that the page scroll drives sideways. */
export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollProgress(section, (p) => {
    const t = track.current; if (!t) return;
    const max = t.scrollWidth - window.innerWidth;
    t.style.transform = `translate3d(${-p * Math.max(max, 0)}px, 0, 0)`;
  }, "pin");

  return (
    <section ref={section} className="relative border-y border-line bg-ground-2" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell mb-8 flex w-full items-end justify-between">
          <p className="eyebrow">Pittsburgh · the loft · the courthouse</p>
          <p className="hidden font-display text-[10px] uppercase tracking-[0.25em] text-fg-3 md:block">Scroll →</p>
        </div>
        <div className="w-full overflow-hidden">
        <div ref={track} className="flex w-max items-end gap-5 pl-[var(--shell-x)] pr-[var(--shell-x)] will-change-transform md:gap-8">
          {photos.gallery.map((src, i) => {
            const tall = /standing|chair-pen|chair-left|coffee-table/.test(src);
            return (
              <div key={src} className={`shrink-0 overflow-hidden bg-ground ${tall ? "w-[58vw] md:w-[24vw]" : "w-[80vw] md:w-[36vw]"} ${i % 3 === 1 ? "mb-10 md:mb-16" : ""}`} style={{ aspectRatio: tall ? "3 / 4" : "3 / 2" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.6s] hover:scale-[1.04]" />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
