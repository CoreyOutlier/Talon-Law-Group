import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        lines={["This page", "does not exist."]}
        lede="The link may be old, or the page may have moved. Everything else is one tap away."
      />
      <section className="shell flex flex-wrap gap-4 pb-40">
        <Link href="/" className="btn btn-wine">Back to home</Link>
        <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost">{site.phone}</a>
      </section>
    </>
  );
}
