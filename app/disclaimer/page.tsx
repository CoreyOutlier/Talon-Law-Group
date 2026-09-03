import type { Metadata } from "next";
import { disclaimer, resultsDisclaimer, site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Legal Notices", robots: { index: false } };

export default function Disclaimer() {
  return (
    <>
      <PageHeader eyebrow="Legal" lines={["Legal", "notices."]} />
      <section className="shell max-w-[70ch] space-y-6 pb-28 text-[15px] leading-relaxed text-bone/70">
        <p className="text-brass">
          ⚠︎ Placeholder. Have counsel confirm this satisfies attorney-advertising rules in
          every state where the firm advertises.
        </p>
        <p>{disclaimer}</p>
        <p>{resultsDisclaimer}</p>
        <p>
          This website may be considered attorney advertising in some jurisdictions. The
          attorney responsible for this site is Shaheen Z. Wallace, Esq., {site.address.street},{" "}
          {site.address.city}, {site.address.region} {site.address.postal}.
        </p>
        <p>
          {site.name} maintains offices in Pennsylvania. Matters in other jurisdictions may be
          handled with local counsel where required.
        </p>
      </section>
    </>
  );
}
