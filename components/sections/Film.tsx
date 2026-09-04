"use client";

import { useRef } from "react";
import { photos } from "@/lib/site";
import { useScrollProgress, ramp } from "@/lib/scrollfx";

/* Pinned three-frame sequence. Native scroll drives it; nothing is hijacked. */
const LINES = [
  { kicker: "00:60", line: "An hour after the crash,", accent: "they had a team on it." },
  { kicker: "One call", line: "You get one call", accent: "to even that up." },
  { kicker: "Talon", line: "Then it stops being", accent: "a fair fight." },
];

export function Film() {
  const section = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const beds = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);
  const n = LINES.length;

  useScrollProgress(section, (p) => {
    const seg = 1 / n;
    for (let i = 0; i < n; i++) {
      const start = i * seg, end = start + seg, pad = seg * 0.18;
      const o = ramp(p, [start - pad, start + pad, end - pad, end + pad], [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]);
      const local = Math.min(Math.max((p - start) / seg, 0), 1);
      const f = frames.current[i]; if (f) { f.style.opacity = String(o); f.style.visibility = o < 0.01 ? "hidden" : "visible"; }
      const b = beds.current[i]; if (b) b.style.transform = `scale(${1.12 - local * 0.1})`;
      const t = texts.current[i]; if (t) t.style.transform = `translate3d(0, ${(0.5 - local) * 10}%, 0)`;
      const k = ticks.current[i]; if (k) k.style.transform = `scaleX(${local})`;
    }
  }, "pin");

  return (
    <section ref={section} style={{ height: `${n * 115}vh` }} className="dark relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {LINES.map((f, i) => (
          <div key={i} ref={(el) => { frames.current[i] = el; }} className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
            <div ref={(el) => { beds.current[i] = el; }} className="absolute inset-0 will-change-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos.film[i]} alt="" className="h-full w-full object-cover" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
            </div>
            <div ref={(el) => { texts.current[i] = el; }} className="shell relative flex h-full flex-col justify-end pb-[14vh] will-change-transform">
              <p className="eyebrow mb-7">{f.kicker}</p>
              <p className="display display-xl max-w-[18ch] text-[clamp(2.25rem,6.5vw,6rem)] text-paper">
                {f.line}<br /><span className="text-accent">{f.accent}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute bottom-8 right-[var(--shell-x)] z-20 flex items-center gap-3">
          {LINES.map((_, i) => (
            <span key={i} className="relative block h-px w-10 bg-paper/25">
              <span ref={(el) => { ticks.current[i] = el; }} className="absolute inset-0 block origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
