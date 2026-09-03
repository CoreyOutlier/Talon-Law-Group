"use client";

import { Hero } from "@/components/Hero";
import { Statement } from "@/components/sections/Statement";
import { Film } from "@/components/sections/Film";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { AttorneyPanel } from "@/components/sections/AttorneyPanel";
import { Gallery } from "@/components/sections/Gallery";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Proof } from "@/components/sections/Proof";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Ticker } from "@/components/sections/Ticker";
import { Markets } from "@/components/sections/Markets";
import { CTA } from "@/components/sections/CTA";

/* ---------------------------------------------------------------------------
 * Marked "use client" deliberately. The scroll-linked sections below share
 * MotionValues across a server/client boundary, and framer-motion throws a
 * WAAPI keyframe error when they hydrate that way. Next still prerenders this
 * page to static HTML, so SEO and first paint are unchanged.
 *
 * Home — paced like a film, not a brochure.
 *
 *   Open on an image.        Hero
 *   Take a breath.           Statement
 *   Run the sequence.        Film
 *   Then earn the trust.     Promise → Attorney → Gallery
 *   Then do the business.    Practice → Proof → Process → Voices
 *   Then say where.          Markets   ← deliberately late, not the lead
 *   Then ask.                CTA
 * ------------------------------------------------------------------------- */
export default function Home() {
  return (
    <>
      <Hero />

      <Statement
        eyebrow="Talon Law Group"
        words={["Quiet", "work.", "Loud", "results."]}
        accentFrom={2}
        footnote="A trial practice built around one lawyer who answers his own phone, prepares every file as though it is going to a jury, and does not get paid unless you do."
      />

      <Film />

      <PromiseSection />
      <AttorneyPanel />
      <Gallery />

      <Statement
        eyebrow="What we do not do"
        words={["We", "do", "not", "run", "a", "call", "center."]}
        accentFrom={3}
        footnote="No intake screener. No case manager three states away. You speak with the attorney who will stand up in court, from the first call to the last check."
      />

      <PracticeIndex />
      <Proof />
      <Process />
      <Voices />
      <Ticker />
      <Markets />
      <CTA />
    </>
  );
}
