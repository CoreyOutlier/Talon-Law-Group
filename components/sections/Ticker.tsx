import { Marquee } from "@/components/Marquee";
import { publishedResults } from "@/lib/site";

/* The twelve recoveries, large, moving slowly across the bar. Nothing else is said. Shaheen's round-two call, Nov 16, 2026. */
export function Ticker() {
  return (
    <section aria-label="Documented recoveries" className="border-y border-line bg-ground py-6 md:py-7">
      <Marquee duration={60} items={publishedResults.map((r) => (
        <span key={r.amount + r.type} className="figure whitespace-nowrap text-[clamp(1.375rem,2.4vw,2.125rem)] font-semibold tabular-nums text-accent">{r.amount}</span>))} />
    </section>
  );
}
