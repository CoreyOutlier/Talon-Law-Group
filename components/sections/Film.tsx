"use client";

import { useRef } from "react";
import { useScrollProgress, ramp } from "@/lib/scrollfx";

/* ---------------------------------------------------------------------------
 * Film — the centerpiece.
 *
 * A pinned sequence of full-bleed frames that hard-cut as you scroll, each
 * carrying a single line. The page scrolls completely normally underneath:
 * no wheel hijacking, no trapped keyboard, no scroll-jacking. Native scroll
 * position drives the timeline and nothing else.
 * ------------------------------------------------------------------------- */

const FRAMES = [
  { src: "/media/shaheen/film-1.jpg", kicker: "00:60", line: "An hour after the crash,", accent: "they had a team on it." },
  { src: "/media/shaheen/film-2.jpg", kicker: "One call", line: "You get one call", accent: "to even that up." },
  { src: "/media/shaheen/film-3.jpg", kicker: "Talon", line: "Then it stops being", accent: "a fair fight." },
];

export function Film() {
  const section = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const beds = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);

  const n = FRAMES.length;

  useScrollProgress(
    section,
    (p) => {
      const seg = 1 / n;
      for (let i = 0; i < n; i++) {
        const start = i * seg;
        const end = start + seg;
        const pad = seg * 0.18;

        const opacity = ramp(
          p,
          [start - pad, start + pad, end - pad, end + pad],
          [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]
        );
        const local = Math.min(Math.max((p - start) / seg, 0), 1);

        const f = frames.current[i];
        if (f) {
          f.style.opacity = String(opacity);
          f.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        }
        const b = beds.current[i];
        if (b) b.style.transform = `scale(${1.14 - local * 0.12})`;
        const t = texts.current[i];
        if (t) t.style.transform = `translate3d(0, ${(0.5 - local) * 12}%, 0)`;
        const k = ticks.current[i];
        if (k) k.style.transform = `scaleX(${local})`;
      }
    },
    "pin"
  );

  return (
    <section ref={section} style={{ height: `${n * 115}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {FRAMES.map((f, i) => (
          <div
            key={f.src}
            ref={(el) => { frames.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div
              ref={(el) => { beds.current[i] = el; }}
              className="vignette absolute inset-0 will-change-transform"
            >
              <div className="absolute inset-0 bg-ink-2" />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${f.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
            </div>

            <div
              ref={(el) => { texts.current[i] = el; }}
              className="shell relative flex h-full flex-col justify-center will-change-transform"
            >
              <p className="eyebrow mb-8">{f.kicker}</p>
              <p className="display display-xl max-w-[17ch] text-[clamp(2.25rem,7.5vw,7rem)]">
                {f.line}
                <br />
                <span className="text-wine-2">{f.accent}</span>
              </p>
            </div>
          </div>
        ))}

        {/* Film-strip counter */}
        <div className="pointer-events-none absolute bottom-8 right-[var(--shell-x)] z-20 flex items-center gap-3">
          {FRAMES.map((f, i) => (
            <span key={f.src} className="relative block h-px w-10 bg-hairline">
              <span
                ref={(el) => { ticks.current[i] = el; }}
                className="absolute inset-0 block origin-left bg-wine-2"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
