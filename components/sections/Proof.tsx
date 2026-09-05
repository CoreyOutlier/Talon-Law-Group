"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { publishedResults, resultsDisclaimer } from "@/lib/site";

/* The record. Three recoveries, one at a time, each taking the whole stage.
   The plates are sticky, so every result slides over the last as the page
   scrolls, and the figure counts up from zero the moment its plate settles. */

const TONES = ["#0B0B0C", "#101013", "#151519"];

export function Proof() {
  const n = publishedResults.length;
  if (n === 0) return null;

  return (
    <section className="dark relative">
      <div className="shell flex flex-wrap items-end justify-between gap-8 pb-12 pt-24 md:pt-32">
        <div>
          <p className="eyebrow mb-6">The record</p>
          <h2 className="display max-w-[20ch] text-[clamp(1.75rem,3.6vw,3rem)]">
            Numbers we can <span className="text-accent">document.</span>
          </h2>
        </div>
        <p className="max-w-[36ch] text-[14px] leading-relaxed text-fg-3">
          Every figure below is a real matter with a real file. If a firm shows you a wall of numbers with no case behind them, ask which ones they tried.
        </p>
      </div>

      <ol className="relative">
        {publishedResults.map((r, i) => (
          <Plate key={i} result={r} index={i} total={n} />
        ))}
      </ol>

      <div className="relative z-10 border-t border-line bg-ground">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-10">
          <Link href="/results" className="btn btn-ghost">All case results</Link>
          <p className="max-w-[62ch] text-[11px] leading-relaxed text-fg-3">{resultsDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}

function Plate({ result, index, total }: { result: (typeof publishedResults)[number]; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || !num.current) return;
    const target = Number(result.amount.replace(/[^0-9]/g, ""));
    if (!target) { num.current.textContent = result.amount; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { num.current.textContent = result.amount; return; }
    const start = performance.now(), dur = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 5);
      if (num.current) num.current.textContent = "$" + Math.round(target * e).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, result.amount]);

  const label = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <li
      ref={ref}
      className="sticky top-0 border-t border-line"
      style={{ background: TONES[index % TONES.length], zIndex: index + 1 }}
    >
      <div className="shell grid min-h-[100svh] content-start gap-10 pb-24 pt-36 md:pt-44 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-8 flex items-center gap-4">
            <span className="figure text-fg-3">{label}</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            <span>{result.type}</span>
          </p>
          <span
            ref={num}
            className="figure block text-[clamp(3.5rem,13vw,11.5rem)] leading-[0.86] tabular-nums text-accent transition-opacity duration-700"
            style={{ opacity: seen ? 1 : 0 }}
          >
            $0
          </span>
        </div>
        <div className="lg:col-span-4 lg:pb-3">
          <p
            className="max-w-[40ch] text-[15px] leading-relaxed text-fg-2 transition-all duration-1000"
            style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(12px)", transitionDelay: "260ms" }}
          >
            {result.detail}
          </p>
          <p
            className="mt-6 font-display text-[10px] uppercase tracking-[0.2em] text-fg-3 transition-opacity duration-1000"
            style={{ opacity: seen ? 1 : 0, transitionDelay: "420ms" }}
          >
            Documented recovery · Talon Law Group
          </p>
        </div>
      </div>
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-[1800ms] ${seen ? "scale-x-100" : "scale-x-0"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
      />
    </li>
  );
}
