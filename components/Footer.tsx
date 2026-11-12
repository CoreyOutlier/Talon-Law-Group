import Link from "next/link";
import { disclaimer, markets, nav, practiceAreas, resultsDisclaimer, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="dark border-t border-line">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark onDark className="h-12 w-auto" />
            <p className="h2-soft mt-8 max-w-[30ch] text-[1.5rem] text-fg/85">{site.tagline}</p>
            <div className="mt-9 flex flex-col gap-2 text-[15px]">
              <a href={`tel:${site.phoneRaw}`} className="link-draw w-fit text-accent">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="link-draw w-fit text-fg/70">{site.email}</a>
              <p className="text-[13px] text-fg-3">Fax {site.fax}</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {markets.filter((m) => m.address).map((m) => (
                <address key={m.slug} className="not-italic text-[14px] leading-relaxed text-fg-3">
                  <span className="mb-1 block font-display text-[10px] uppercase tracking-[0.2em] text-fg-3">{m.stateFull} office</span>
                  {m.address!.street}<br />{m.address!.city}, {m.address!.region} {m.address!.postal}
                </address>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-fg-3">{site.hours}</p>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-6">Practice</p>
            <ul className="space-y-3">{practiceAreas.map((p) => (
              <li key={p.slug}><Link href={`/practice-areas/${p.slug}`} className="link-draw text-[14px] text-fg/70 hover:text-fg">{p.short}</Link></li>))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow mb-6">Firm</p>
            <ul className="space-y-3">{nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="link-draw text-[14px] text-fg/70 hover:text-fg">{n.label}</Link></li>))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow mb-6">Offices</p>
            <ul className="space-y-3">{markets.map((m) => (
              <li key={m.slug}><Link href={`/offices/${m.slug}`} className="link-draw text-[14px] text-fg/70 hover:text-fg">{m.city}, {m.state}</Link></li>))}
            </ul>
          </div>
        </div>
        <div className="mt-16 space-y-4 border-t border-line pt-8 text-[11px] leading-relaxed text-fg-3">
          <p className="max-w-[92ch]">{disclaimer}</p>
          <p className="max-w-[92ch]">{resultsDisclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
            <div className="flex gap-6"><Link href="/privacy" className="link-draw">Privacy</Link><Link href="/disclaimer" className="link-draw">Legal notices</Link></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
