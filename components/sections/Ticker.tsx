import { site } from "@/lib/site";
import { Marquee } from "@/components/Marquee";

const ITEMS = [
  "No fee unless we win",
  "Order of Barristers",
  "Published in Jury Verdict Review",
  "Trial practice since 2015",
  "Pittsburgh · New York · Los Angeles",
  "You talk to the lawyer, not a call centre",
];

export function Ticker() {
  return (
    <section aria-label="Firm credentials" className="border-y border-hairline bg-ink py-5">
      <Marquee
        duration={54}
        items={ITEMS.map((t) => (
          <span key={t} className="whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-slate">
            {t}
          </span>
        ))}
      />
      <span className="sr-only">{site.name} credentials</span>
    </section>
  );
}
