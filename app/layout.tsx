import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";
import { site, attorney, markets, practiceAreas } from "@/lib/site";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-loaded",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — Pittsburgh Personal Injury Trial Lawyers`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: `${site.name} — Pittsburgh Personal Injury Trial Lawyers`,
    description: site.description,
    images: ["/media/brand/og.jpg"],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: site.domain },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.name,
  alternateName: "The Law Office of Shaheen Wallace, Esq., LLC",
  url: site.domain,
  telephone: site.phone,
  email: site.email,
  priceRange: "Contingency fee — no fee unless we win",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postal,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    ...markets.map((m) => ({ "@type": "City", name: `${m.city}, ${m.state}` })),
    ...site.alsoServing.map((n) => ({ "@type": "State", name: n })),
  ],
  founder: {
    "@type": "Attorney",
    name: `${attorney.name}, ${attorney.suffix}`,
    jobTitle: attorney.role,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Pittsburgh School of Law" },
      { "@type": "CollegeOrUniversity", name: "John Jay College of Criminal Justice" },
    ],
  },
  sameAs: Object.values(site.social).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Practice Areas",
    itemListElement: practiceAreas.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name, url: `${site.domain}/practice-areas/${p.slug}` },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <div className="h-16 lg:hidden" aria-hidden />
      </body>
    </html>
  );
}
