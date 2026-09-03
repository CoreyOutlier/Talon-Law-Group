"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { publishedResults, resultsDisclaimer, site } from "@/lib/site";

/* ---------------------------------------------------------------------------
 * Proof — the numbers, full height, one at a time.
 *
 * On a personal injury site this is the single most persuasive screen there
 * is, so it gets the same weight as the hero: enormous figures that roll up
 * as they arrive, a hairline that draws under each, nothing competing.
 * ------------------------------------------------------------------------- */
export function Proof() {
  return (
    <section className="relative border-y border-hairline">
      <div className="shell py-24 md:py-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <div>
            <p className="eyebrow mb-7">The record</p>
            <h2 className="display display-xl max-w-[18ch] text-[clamp(2rem,5.5vw,4.75rem)]">
              Numbers we can
              <br />
              <span className="text-wine-2">document.</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-mist/55">
            We publish results we can stand behind. If a firm shows you a wall of figures
            with no case behind them, ask which ones they tried.
          </p>
        </div>

        <ul>
          {publishedResults.map((r, i) => (
            <Figure key={`${r.amount}-${i}`} result={r} index={i} />
          ))}
        </ul>

        <div className="mt-20 grid gap-10 border-t border-hairline pt-12 sm:grid-cols-3">
          <Stat value={`${new Date().getFullYear() - Number(site.founded)}+`} label="Years in practice" />
          <Stat value="3" label="Cities" />
          <Stat value="24/7" label="Line answered" />
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-8">
          <Link href="/results" className="btn btn-ghost">All case results</Link>
          <p className="max-w-[52ch] text-[11px] leading-relaxed text-steel-2">{resultsDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}

/* --- One figure: rolls up on arrival, hairline draws beneath it --- */
function Figure({ result, index }: { result: (typeof publishedResults)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { rootMargin: "-20% 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Roll the digits up to the real figure. Formatting is preserved exactly.
  useEffect(() => {
    if (!seen || !num.current) return;
    const target = Number(result.amount.replace(/[^0-9]/g, ""));
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      num.current.textContent = result.amount;
      return;
    }
    const start = performance.now();
    const dur = 1900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 5);
      if (num.current) {
        num.current.textContent = "$" + Math.round(target * eased).toLocaleString("en-US");
      }
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, result.amount]);

  return (
    <li ref={ref} className="group relative border-t border-hairline first:border-t-0">
      <div className="grid gap-4 py-10 md:grid-cols-12 md:items-end md:gap-8 md:py-16">
        <div className="md:col-span-7">
          <span
            ref={num}
            className={`figure block text-[clamp(3rem,11vw,9rem)] leading-[0.86] tabular-nums text-wine-2 transition-opacity duration-700 ${
              seen ? "opacity-100" : "opacity-0"
            }`}
          >
            $0
          </span>
        </div>

        <div className="md:col-span-5 md:pb-3">
          <p
            className={`text-[11px] uppercase tracking-[0.2em] text-mist/80 transition-all duration-1000 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            {result.type}
          </p>
          <p
            className={`mt-4 max-w-[46ch] text-[15px] leading-relaxed text-mist/55 transition-all duration-1000 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          >
            {result.detail}
          </p>
        </div>
      </div>

      {/* hairline that draws itself as the figure lands */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-wine-2 transition-transform duration-[1600ms] ${
          seen ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)", transitionDelay: `${index * 60}ms` }}
      />
    </li>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="figure text-[clamp(2rem,4vw,3.25rem)] leading-none text-mist">{value}</p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-steel">{label}</p>
    </div>
  );
}
