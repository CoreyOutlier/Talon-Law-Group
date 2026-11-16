import { Marquee } from "@/components/Marquee";
import { publishedResults } from "@/lib/site";

/* Only the recoveries. Shaheen's call, Nov 2026. */
export function Ticker() {
  return (
    <section aria-label="Documented recoveries" className="border-y border-line bg-ground py-5">
      <Marquee duration={54} items={publishedResults.map((r) => (
        <span key={r.amount + r.type} className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.24em]">
          <span className="text-accent">{r.amount}</span><span className="text-fg-3"> · {r.type}</span>
        </span>))} />
    </section>
  );
}
