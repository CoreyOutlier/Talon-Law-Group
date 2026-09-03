import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" lines={["Privacy", "policy."]} />
      <section className="shell max-w-[70ch] space-y-6 pb-28 text-[15px] leading-relaxed text-mist/70">
        <p className="text-wine-2">
          ⚠︎ Placeholder. Have counsel review and replace this before launch — it must reflect
          how leads are actually stored, who receives them, and any tracking pixels you run.
        </p>
        <p>
          {site.name} collects only the information you choose to provide through this site —
          typically your name, telephone number, email address and a description of your
          matter. We use it to evaluate and respond to your enquiry.
        </p>
        <p>
          We do not sell your information. We share it only with vendors that operate this
          site and our case management system, under confidentiality obligations.
        </p>
        <p>
          Submitting a form does not create an attorney-client relationship. Do not send
          confidential information until that relationship is established in writing.
        </p>
        <p>
          To request deletion of information you have submitted, contact{" "}
          <a href={`mailto:${site.email}`} className="text-wine-2 link-draw">{site.email}</a>.
        </p>
      </section>
    </>
  );
}
