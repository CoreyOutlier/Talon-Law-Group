"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { publishedResults, resultsDisclaimer } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

/* The record.

   Home page: a compact ledger. Three rows, each an index, a figure that
   counts up from zero in sequence, the case type and one line. One screen.

   Results page: the full-height plates. Each recovery takes the whole stage
   and slides over the last as the page scrolls. */

const TONES = ["#0B0B0C", "#101013", "#151519"];

function useSeen<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function useCountUp(el: React.RefObject<HTMLSpanElement | null>, amount: string, go: boolean, delay = 0, dur = 1900) {
  useEffect(() => {
    if (!go || !el.current) return;
    const target = Number(amount.replace(/[^0-9]/g, ""));
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.current.textContent = amount; return; }
    let raf = 0;
    const t = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 5);
        if (el.current) el.current.textContent = "$" + Math.round(target * e).toLocaleString("en-US");
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { window.clearTimeout(t); cancelAnimationFrame(raf); };
  }, [el, amount, go, delay, dur]);
}

/* ---------------------------------------------------------------- home --- */
const amountOf = (a: string) => Number(a.replace(/[^0-9]/g, ""));

export function Proof() {
  if (publishedResults.length === 0) return null;
  const amounts = publishedResults.map((r) => amountOf(r.amount));
  const total = amounts.reduce((s, n) => s + n, 0);
  const max = Math.max(...amounts);
  return (
    <section className="dark relative overflow-hidden border-y border-line">
      <div className="shell py-24 md:py-32">
        <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow mb-6">The record</p></Reveal>
            <LineReveal as="h2" className="display max-w-[17ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Numbers we can", <span key="a" className="text-accent">document.</span>]} />
          </div>
          <Total total={total} count={publishedResults.length} />
        </div>
        <Ledger max={max} />
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <Reveal><Link href="/results" className="btn btn-ghost">All case results</Link></Reveal>
          <Reveal delay={0.1}><p className="max-w-[62ch] text-[11px] leading-relaxed text-fg-3">{resultsDisclaimer}</p></Reveal>
        </div>
      </div>
    </section>
  );
}

/* the three recoveries, added up */
function Total({ total, count }: { total: number; count: number }) {
  const { ref, seen } = useSeen<HTMLDivElement>(0.5);
  const num = useRef<HTMLSpanElement>(null);
  useCountUp(num, "$" + total.toLocaleString("en-US"), seen, 200, 2200);
  const ease = "cubic-bezier(.16,1,.3,1)";
  return (
    <div ref={ref} className="border-t border-line pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0 lg:text-right">
      <span
        ref={num}
        className="figure block text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none tabular-nums text-fg"
        style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(10px)", transition: `opacity .9s ${ease}, transform .9s ${ease}` }}
      >
        $0
      </span>
      <p className="mt-3 font-display text-[10px] uppercase tracking-[0.22em] text-fg-3" style={{ opacity: seen ? 1 : 0, transition: "opacity 1s .4s" }}>
        Combined · the {count === 3 ? "three" : count} matters below · gross recoveries
      </p>
    </div>
  );
}

function Ledger({ max }: { max: number }) {
  const { ref, seen } = useSeen<HTMLOListElement>(0.25);
  return (
    <ol ref={ref} className="border-t border-line">
      {publishedResults.map((r, i) => (
        <Row key={i} result={r} index={i} seen={seen} delay={i * 280} share={amountOf(r.amount) / max} />
      ))}
    </ol>
  );
}

function Row({ result, index, seen, delay, share }: { result: (typeof publishedResults)[number]; index: number; seen: boolean; delay: number; share: number }) {
  const num = useRef<HTMLSpanElement>(null);
  useCountUp(num, result.amount, seen, delay);
  const ease = "cubic-bezier(.16,1,.3,1)";
  return (
    <li className="group relative grid gap-5 border-b border-line py-9 md:grid-cols-12 md:items-end md:gap-8 md:py-11">
      <p className="figure text-[13px] text-fg-3 md:col-span-1 md:pb-2" style={{ opacity: seen ? 1 : 0, transition: "opacity .8s", transitionDelay: `${delay}ms` }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="md:col-span-6">
        <span
          ref={num}
          className="figure block text-[clamp(3.25rem,7.8vw,7.5rem)] leading-[0.9] tabular-nums text-fg transition-colors duration-500 group-hover:text-accent-2"
          style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(16px)", transition: `opacity .9s ${ease} ${delay}ms, transform .9s ${ease} ${delay}ms, color .5s` }}
        >
          $0
        </span>
        {/* the recovery's share of the largest one, drawn once the figure has landed */}
        <span aria-hidden className="mt-6 block h-px w-full bg-line">
          <span className="block h-full origin-left bg-accent" style={{ transform: seen ? `scaleX(${share})` : "scaleX(0)", transition: `transform 1.6s ${ease} ${delay + 900}ms` }} />
        </span>
      </div>
      <div className="md:col-span-5 md:pb-2" style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(10px)", transition: `opacity 1s ${ease}, transform 1s ${ease}`, transitionDelay: `${delay + 320}ms` }}>
        <p className="eyebrow mb-3">{result.type}</p>
        <p className="max-w-[40ch] text-[14px] leading-relaxed text-fg-2">{result.detail}</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------- results --- */
export function RecordStack() {
  if (publishedResults.length === 0) {
    return (
      <section className="shell pb-20">
        <p className="border-y border-line py-16 text-[15px] text-fg-3">
          Results are being compiled. Call us and we will discuss comparable matters directly.
        </p>
      </section>
    );
  }
  const n = publishedResults.length;
  return (
    <section className="dark relative">
      <ol className="relative">
        {publishedResults.map((r, i) => (
          <Plate key={i} result={r} index={i} total={n} />
        ))}
      </ol>
      <div className="relative z-10 border-t border-line bg-ground">
        <div className="shell py-10">
          <p className="max-w-[62ch] text-[11px] leading-relaxed text-fg-3">{resultsDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}

function Plate({ result, index, total }: { result: (typeof publishedResults)[number]; index: number; total: number }) {
  const { ref, seen } = useSeen<HTMLLIElement>(0.45);
  const num = useRef<HTMLSpanElement>(null);
  useCountUp(num, result.amount, seen, 0, 2000);
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
