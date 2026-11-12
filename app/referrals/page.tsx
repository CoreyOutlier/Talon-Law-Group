import type { Metadata } from "next";
import Link from "next/link";
import { brand, headlineResults, site } from "@/lib/site";
import { env } from "@/lib/env";
import { PageHeader } from "@/components/PageHeader";
import { Figure } from "@/components/Figure";
import { LineReveal, Reveal } from "@/components/Motion";

/* For referring attorneys. The worksheet names two audiences; this is the
   second one. Out-of-state firms with a Pennsylvania trucking case, and New
   York firms with a nursing home case that needs to be tried, not settled. */

export const metadata: Metadata = {
  title: "For Referring Attorneys",
  description:
    "Talon Law Group takes referred trucking cases in Pennsylvania and Georgia and nursing home and hospital negligence cases in New York, and tries them. Referral fees honored under each state's rules.",
};

const TAKES = [
  { k: "01", title: "Pennsylvania and Georgia trucking", body: "Tractor-trailer and commercial-vehicle crashes with surgical injuries or a death. Admitted in both states and in the Middle District of Georgia. No pro hac vice, no local counsel to find." },
  { k: "02", title: "New York nursing home and hospital negligence", body: "Pressure ulcers, falls, malnutrition, unexplained injury, wrongful death. Public Health Law § 2801-d claims built for a Brooklyn or Manhattan jury. Office in Garden City, staff in New York." },
  { k: "03", title: "Catastrophic injury in any of the three states", body: "Where the file needs to be built for verdict from the first week and the referring firm would rather not carry it there." },
];

const TERMS = [
  { title: "Referral fees honored", body: "Paid in proportion to the work, or by written agreement with the client's consent, as each state's Rules of Professional Conduct require. In writing, before the work starts." },
  { title: "Your client stays yours", body: "We take the matter you send and nothing else. Your relationship with the client is not ours to use." },
  { title: "You hear from us", body: "Status when something happens, not on a schedule. The same over-communication the clients get." },
  { title: "Trial, if that is what it takes", body: "Carriers price a file by the lawyer holding it. The number moves when they believe the case will be tried. We make them believe it." },
];

export default function Referrals() {
  return (
    <>
      <PageHeader
        eyebrow="For referring attorneys"
        lines={["Send the case", "you would rather", "not try."]}
        lede="Two kinds of matter come to us from other firms: a Pennsylvania or Georgia trucking case the firm is not set up to carry to verdict, and a New York nursing home case the firm would settle rather than try. We take both, and we try them."
        photo={env.corridor}
      />

      <section className="shell grid gap-14 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-7">What we take</p></Reveal>
          <ol className="divide-y divide-line border-y border-line">
            {TAKES.map((t, i) => (
              <Reveal as="li" key={t.k} delay={0.08 * i} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                <span className="figure text-[13px] text-accent md:col-span-1">{t.k}</span>
                <p className="display text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight md:col-span-5">{t.title}</p>
                <p className="text-[15px] leading-relaxed text-fg/70 md:col-span-6">{t.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-16">
              <p className="eyebrow mb-7">How it works</p>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {TERMS.map((t, i) => (
                  <li key={t.title} className="bg-ground p-7 md:p-8">
                    <p className="display text-[1.0625rem] leading-tight">{t.title}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-fg/70">{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <Figure src="/media/photos/brick-chair-pen.jpg" alt="Shaheen Wallace" ratio="4 / 5" wipe="x" parallax={5} />
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow mb-4">The record</p>
                <ul className="space-y-3">
                  {headlineResults.map((r) => (
                    <li key={r.amount + r.type} className="flex items-baseline justify-between gap-4">
                      <span className="figure text-[1.375rem] text-fg">{r.amount}</span>
                      <span className="text-right text-[11px] uppercase tracking-[0.16em] text-fg-3">{r.type}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/results" className="link-draw mt-5 inline-block font-display text-[11px] uppercase tracking-[0.18em] text-accent">All twelve</Link>
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow mb-3">Direct line</p>
                <a href={`tel:${site.phoneRaw}`} className="figure link-draw block w-fit text-[1.5rem] text-accent">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="link-draw mt-2 block w-fit text-[14px] text-fg/70">{site.email}</a>
                <p className="mt-4 text-[12px] leading-relaxed text-fg-3">Shaheen answers. Send the police report or the chart and a one-line summary; you will have an answer on whether we take it within a business day.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="dark border-y border-line">
        <div className="shell py-20 md:py-28">
          <Reveal><p className="eyebrow mb-7">Why firms send cases here</p></Reveal>
          <LineReveal as="h2" className="display max-w-[30ch] text-[clamp(1.75rem,3.6vw,3rem)]" lines={["Results higher than expected,", "because the file was built for the jury,", "not the adjuster."]} />
          <Reveal delay={0.2}>
            <p className="h2-soft mt-10 max-w-[40ch] text-[clamp(1.125rem,1.8vw,1.5rem)] text-fg-2">{brand.motto.latin} {brand.motto.english}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`tel:${site.phoneRaw}`} className="btn btn-wine">Refer a case</a>
              <Link href="/results" className="btn btn-ghost">The record</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
