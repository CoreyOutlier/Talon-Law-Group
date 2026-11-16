import { publishedResults } from "@/lib/site";

/* A still row of the recoveries. Nothing moves and nothing else is said. Shaheen's call, Nov 13, 2026. */
export function Ticker() {
  return (
    <section aria-label="Documented recoveries" className="border-y border-line bg-ground py-6">
      <ul className="shell flex flex-wrap items-center justify-center gap-x-9 gap-y-3 md:gap-x-12">
        {publishedResults.map((r) => (
          <li key={r.amount + r.type} className="figure whitespace-nowrap text-[clamp(0.9375rem,1.3vw,1.125rem)] tabular-nums text-accent">{r.amount}</li>
        ))}
      </ul>
    </section>
  );
}
