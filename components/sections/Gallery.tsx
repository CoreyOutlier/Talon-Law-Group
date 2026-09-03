"use client";

import { useRef } from "react";
import { Figure } from "@/components/Figure";
import { useScrollProgress } from "@/lib/scrollfx";

/* ---------------------------------------------------------------------------
 * Gallery — a contact sheet that breathes.
 * Three columns moving at different rates against the scroll. The offset rates
 * are what make it read as depth rather than a grid of photos.
 * ------------------------------------------------------------------------- */

const COLUMNS: { src: string; ratio: string; alt: string }[][] = [
  [
    { src: "/media/shaheen/gallery-1.jpg", ratio: "3 / 4", alt: "Shaheen Wallace" },
    { src: "/media/shaheen/gallery-2.jpg", ratio: "3 / 4", alt: "Talon Law Group" },
  ],
  [
    { src: "/media/shaheen/gallery-3.jpg", ratio: "3 / 4", alt: "Shaheen Wallace" },
    { src: "/media/shaheen/gallery-4.jpg", ratio: "3 / 4", alt: "Shaheen Wallace" },
    { src: "/media/shaheen/gallery-5.jpg", ratio: "3 / 4", alt: "Talon Law Group" },
  ],
  [
    { src: "/media/shaheen/gallery-6.jpg", ratio: "3 / 4", alt: "Shaheen Wallace" },
    { src: "/media/shaheen/gallery-7.jpg", ratio: "3 / 4", alt: "Talon Law Group" },
  ],
];

const RATES = [-13, 9, -20];

export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);

  useScrollProgress(section, (p) => {
    for (let i = 0; i < RATES.length; i++) {
      const el = cols.current[i];
      if (el) el.style.transform = `translate3d(0, ${(p - 0.5) * 2 * RATES[i]}%, 0)`;
    }
  });

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-y border-hairline bg-ink-2 py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              ref={(el) => { cols.current[ci] = el; }}
              className={`flex flex-col gap-3 will-change-transform md:gap-5 ${ci === 2 ? "hidden md:flex" : ""}`}
            >
              {col.map((item) => (
                <Figure
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  ratio={item.ratio}
                  imgClassName="transition-transform duration-[1.6s] hover:scale-[1.05]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
