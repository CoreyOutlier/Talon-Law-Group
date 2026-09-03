import { site } from "@/lib/site";
import { Marquee } from "@/components/Marquee";

const ITEMS = [
  "$2,000,000 recovered",
  "No fee unless we win",
  "$900,000 recovered",
  "Order of Barristers",
  "$500,000 recovered",
  "Published in Jury Verdict Review",
  "Pittsburgh · New York · Los Angeles",
  "You talk to the lawyer, not a call center",
];

export function Ticker() {
  return (
    <section aria-label="Firm credentials" className="border-y border-hairline bg-ink py-5">
      <Marquee
        duration={54}
        items={ITEMS.map((t) => (
          <span key={t} className={`whitespace-nowrap text-[11px] uppercase tracking-[0.24em] ${t.startsWith("$") ? "text-wine-2" : "text-steel"}`}>
            {t}
          </span>
        ))}
      />
      <span className="sr-only">{site.name} credentials</span>
    </section>
  );
}
