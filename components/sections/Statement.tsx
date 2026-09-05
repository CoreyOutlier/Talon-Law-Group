"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/scrollfx";
import { Figure } from "@/components/Figure";

/* One idea in the soft register, then a strip of photographs drifting at
   three different rates. The page taking a breath. */
export function Statement({ words, accentFrom = 999, eyebrow, footnote, strip }: {
  words: string[]; accentFrom?: number; eyebrow?: string; footnote?: string; strip?: readonly string[];
}) {
  const section = useRef<HTMLElement>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);
  const line = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);
  const RATES = [-10, 7, -16];

  useScrollProgress(section, (p) => {
    // the statement slides a few percent across the screen as it passes; the page breathing
    if (line.current) line.current.style.transform = `translate3d(${(0.5 - p) * 5}%, 0, 0)`;
    RATES.forEach((r, i) => { const el = cols.current[i]; if (el) el.style.transform = `translate3d(0, ${(p - 0.5) * 2 * r}%, 0)`; });
  });
  useEffect(() => {
    const el = section.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { rootMargin: "-15% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <section ref={section} className="shell py-[16vh]">
      {eyebrow && <p className={`eyebrow mb-10 stmt-item ${shown ? "is-in" : ""}`}>{eyebrow}</p>}
      <p ref={line} className="h2-soft max-w-[22ch] text-[clamp(2rem,5.6vw,4.75rem)] will-change-transform">
        {words.map((w, i) => (
          <span key={i} className={`stmt-item inline-block ${shown ? "is-in" : ""} ${i >= accentFrom ? "text-accent" : ""}`}
            style={{ transitionDelay: `${100 + i * 90}ms`, marginRight: "0.24em" }}>{w}</span>
        ))}
      </p>
      {footnote && <p className={`stmt-item mt-10 max-w-[52ch] text-[15px] leading-relaxed text-fg-2 ${shown ? "is-in" : ""}`} style={{ transitionDelay: `${200 + words.length * 90}ms` }}>{footnote}</p>}

      {strip && (
        <div className="mt-20 grid grid-cols-3 gap-4 md:gap-8">
          {strip.map((src, i) => (
            <div key={src} ref={(el) => { cols.current[i] = el; }} className={`will-change-transform ${i === 1 ? "mt-16 md:mt-28" : i === 2 ? "mt-6 md:mt-10" : ""}`}>
              <Figure src={src} alt="" ratio={i === 0 ? "5 / 4" : "4 / 5"} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
