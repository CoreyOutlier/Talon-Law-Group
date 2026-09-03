"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/scrollfx";

/* ---------------------------------------------------------------------------
 * Statement — one idea, held in enormous whitespace.
 *
 * Words arrive one at a time and the block drifts against the scroll, so it
 * reads as shot rather than laid out. This is the page taking a breath
 * between chapters.
 * ------------------------------------------------------------------------- */
export function Statement({
  words,
  accentFrom = 999,
  eyebrow,
  footnote,
}: {
  words: string[];
  accentFrom?: number;
  eyebrow?: string;
  footnote?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useScrollProgress(section, (p) => {
    if (inner.current) inner.current.style.transform = `translate3d(0, ${(0.5 - p) * 10}%, 0)`;
  });

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: "-15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} className="shell py-[20vh]">
      <div ref={inner} className="will-change-transform">
        {eyebrow && (
          <p className={`eyebrow mb-12 stmt-item ${shown ? "is-in" : ""}`} style={{ transitionDelay: "0ms" }}>
            {eyebrow}
          </p>
        )}

        <p className="display display-xl max-w-[15ch] text-[clamp(2.5rem,8.5vw,7.5rem)]">
          {words.map((w, i) => (
            <span
              key={i}
              className={`stmt-item inline-block ${shown ? "is-in" : ""} ${i >= accentFrom ? "text-wine-2" : ""}`}
              style={{ transitionDelay: `${120 + i * 110}ms`, marginRight: "0.24em" }}
            >
              {w}
            </span>
          ))}
        </p>

        {footnote && (
          <p
            className={`stmt-item mt-14 max-w-[48ch] text-[15px] leading-relaxed text-mist/55 ${shown ? "is-in" : ""}`}
            style={{ transitionDelay: `${240 + words.length * 110}ms` }}
          >
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
