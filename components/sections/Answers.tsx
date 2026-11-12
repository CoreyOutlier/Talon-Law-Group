"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { faqClips, site } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

/* Questions, answered. Shaheen's avatar clips in place of a written FAQ.
   A grid of posters; one plays at a time, inline, with sound, in the tile
   it belongs to. The question is the title; the clip is the answer. On the
   home page the first few; on /faq all of them. */

const EASE = "cubic-bezier(.16,1,.3,1)";

export function Answers({ limit, dark = true, heading = ["Questions,", "answered."] }: { limit?: number; dark?: boolean; heading?: string[] }) {
  const clips = limit ? faqClips.slice(0, limit) : faqClips;
  const [playing, setPlaying] = useState<string | null>(null);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});

  // one at a time
  useEffect(() => {
    for (const [slug, v] of Object.entries(videos.current)) {
      if (!v) continue;
      if (slug === playing) { v.play().catch(() => setPlaying(null)); } else { v.pause(); v.currentTime = 0; }
    }
  }, [playing]);

  if (clips.length === 0) return null;

  return (
    <section className={`${dark ? "dark" : ""} relative border-y border-line`}>
      <div className="shell py-24 md:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow mb-6">Straight answers</p></Reveal>
            <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={heading} />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-fg-2">
              The questions people ask on the first call, answered by Shaheen in under half a minute each. No form, no fine print. If yours is not here, call. He picks up.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((c, i) => {
            const on = playing === c.slug;
            return (
              <Reveal as="li" key={c.slug} delay={0.05 * i} className="group relative bg-ground">
                <button
                  type="button"
                  onClick={() => setPlaying(on ? null : c.slug)}
                  aria-label={on ? `Pause: ${c.question}` : `Play: ${c.question}`}
                  className="relative block w-full overflow-hidden text-left"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <video
                    ref={(el) => { videos.current[c.slug] = el; }}
                    src={c.src}
                    poster={c.poster}
                    preload="none"
                    playsInline
                    onEnded={() => setPlaying(null)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: EASE }}
                  />
                  {/* scrim and play mark */}
                  <span aria-hidden className={`absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-700 ${on ? "opacity-0" : "opacity-100"}`} />
                  <span aria-hidden className={`absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-paper/60 text-paper transition-all duration-500 ${on ? "scale-75 opacity-0" : "opacity-100 group-hover:border-paper group-hover:bg-paper/10"}`}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className={`absolute inset-x-5 bottom-5 transition-opacity duration-500 ${on ? "opacity-0" : "opacity-100"}`}>
                    <span className="block font-display text-[10px] uppercase tracking-[0.22em] text-paper/70">{String(i + 1).padStart(2, "0")} · {c.duration}</span>
                    <span className="display mt-2 block text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-tight text-paper">{c.question}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[62ch] text-[11px] leading-relaxed text-fg-3">
            These clips use a computer-generated likeness and voice of Shaheen Wallace, recorded from his own words. They are general information, not legal advice, and no attorney-client relationship is formed by watching them.
          </p>
          {limit ? (
            <Link href="/faq" className="btn btn-ghost">All questions</Link>
          ) : (
            <a href={`tel:${site.phoneRaw}`} className="btn btn-wine">Ask your own · {site.phone}</a>
          )}
        </div>
      </div>
    </section>
  );
}
