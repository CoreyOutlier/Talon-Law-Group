"use client";

import { useEffect, useRef, useState } from "react";
import { promises } from "@/lib/site";
import { env } from "@/lib/env";
import { LineReveal, Reveal } from "@/components/Motion";

/* Why people call us. Three reasons as a live accordion: the open reason
   shows its copy, a hairline times the hold, and the photograph beside it
   changes to match. It advances on its own while in view, pauses under the
   cursor, and any reason can be opened directly. */

const HOLD = 5600;
const EASE = "cubic-bezier(.16,1,.3,1)";
const PLATES = [
  { src: "/media/photos/coffee-espresso.jpg", pos: "50% 30%", caption: "He answers his own phone. That is not a slogan; it is the operating model." },
  { src: env.desk, pos: "50% 50%", caption: "No retainer, no hourly bill. We are paid from the recovery, or not at all." },
  { src: env.corridor, pos: "50% 40%", caption: "Every file is built for the room most lawyers avoid." },
];

export function Promise() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % promises.length), HOLD);
    return () => window.clearTimeout(t);
  }, [active, paused, inView, reduced]);

  return (
    <section
      ref={section}
      className="shell py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow mb-7">Why people call us</p></Reveal>
          <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Most firms sell", "you volume."]} />
          <LineReveal as="p" delay={0.15} className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] text-accent" lines={["We sell you attention."]} />

          <Reveal delay={0.2}>
            <ol className="mt-14 border-t border-line">
              {promises.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.k} className="relative border-b border-line">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={on}
                      className="group flex w-full items-start gap-6 py-7 text-left md:gap-10"
                    >
                      <span className={`figure shrink-0 pt-1.5 text-[13px] transition-colors duration-500 ${on ? "text-accent" : "text-fg-3"}`}>{p.k}</span>
                      <span className="min-w-0 flex-1">
                        <span className={`display block text-[clamp(1.25rem,2.1vw,1.75rem)] leading-tight transition-colors duration-500 ${on ? "text-fg" : "text-fg-3 group-hover:text-fg"}`}>
                          {p.title}
                        </span>
                        <span className="grid transition-[grid-template-rows] duration-700" style={{ gridTemplateRows: on ? "1fr" : "0fr", transitionTimingFunction: EASE }}>
                          <span className="overflow-hidden">
                            <span className={`block max-w-[54ch] pt-4 text-[15px] leading-relaxed text-fg-2 text-pretty transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`}>
                              {p.body}
                            </span>
                          </span>
                        </span>
                      </span>
                      <span aria-hidden className={`mt-3 h-px w-8 shrink-0 origin-right bg-accent transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} style={{ transitionTimingFunction: EASE }} />
                    </button>
                    {on && !reduced && (
                      <span
                        key={`p-${active}`}
                        aria-hidden
                        className="progress-run absolute inset-x-0 bottom-[-1px] block h-px bg-accent"
                        style={{ animationDuration: `${HOLD}ms`, animationPlayState: paused || !inView ? "paused" : "running" }}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-32">
              <div className="relative overflow-hidden bg-ground-2" style={{ aspectRatio: "4 / 5" }}>
                {PLATES.map((pl, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={pl.src}
                    src={pl.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms]"
                    style={{ objectPosition: pl.pos, opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.06)", transitionTimingFunction: EASE }}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ))}
                <span className="absolute left-5 top-5 font-display text-[10px] uppercase tracking-[0.2em] text-paper/80 mix-blend-difference">
                  {String(active + 1).padStart(2, "0")} / {String(PLATES.length).padStart(2, "0")}
                </span>
              </div>
              <p key={`c-${active}`} className="mt-5 max-w-[36ch] text-[13px] leading-relaxed text-fg-3" style={{ animation: "heroFade .9s ease-out both" }}>
                {PLATES[active].caption}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
