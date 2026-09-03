import Link from "next/link";
import { disclaimer, markets, nav, practiceAreas, resultsDisclaimer, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink-2">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="h-7 w-auto" />
            <p className="mt-7 max-w-[34ch] text-[1.375rem] leading-tight text-mist/85 display">
              {site.tagline}
            </p>
            <div className="mt-9 flex flex-col gap-2 text-[15px]">
              <a href={`tel:${site.phoneRaw}`} className="link-draw w-fit text-wine-2">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link-draw w-fit text-mist/70">
                {site.email}
              </a>
            </div>
            <address className="mt-6 not-italic text-[14px] leading-relaxed text-steel">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </address>
            <p className="mt-4 text-[13px] text-steel-2">{site.hours}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-6">Practice</p>
            <ul className="space-y-3">
              {practiceAreas.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/practice-areas/${p.slug}`}
                    className="link-draw text-[14px] text-mist/70 transition-colors hover:text-mist"
                  >
                    {p.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-6">Firm</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-draw text-[14px] text-mist/70 transition-colors hover:text-mist"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-6">Offices</p>
            <ul className="space-y-3">
              {markets.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/offices/${m.slug}`}
                    className="link-draw text-[14px] text-mist/70 transition-colors hover:text-mist"
                  >
                    {m.city}, {m.state}
                  </Link>
                </li>
              ))}
              {site.alsoServing.map((j) => (
                <li key={j} className="text-[14px] text-steel-2">{j}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-4 border-t border-hairline pt-8 text-[11px] leading-relaxed text-steel-2">
          <p className="max-w-[92ch]">{disclaimer}</p>
          <p className="max-w-[92ch]">{resultsDisclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="link-draw">Privacy</Link>
              <Link href="/disclaimer" className="link-draw">Legal notices</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
