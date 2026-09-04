import { Marquee } from "@/components/Marquee";
const ITEMS = ["$2,000,000 recovered","No fee unless we win","$900,000 recovered","Order of Barristers","$500,000 recovered","Published in Jury Verdict Review","Pittsburgh · New York · Los Angeles","You talk to the lawyer, not a call center"];
export function Ticker() {
  return (
    <section aria-label="Firm credentials" className="border-y border-line bg-ground py-5">
      <Marquee duration={54} items={ITEMS.map((t) => (
        <span key={t} className={`whitespace-nowrap font-display text-[11px] uppercase tracking-[0.24em] ${t.startsWith("$") ? "text-accent" : "text-fg-3"}`}>{t}</span>))} />
    </section>
  );
}
