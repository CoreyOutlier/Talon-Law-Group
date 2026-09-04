"use client";

import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Statement } from "@/components/sections/Statement";
import { Film } from "@/components/sections/Film";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Proof } from "@/components/sections/Proof";
import { AttorneyPanel } from "@/components/sections/AttorneyPanel";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Markets } from "@/components/sections/Markets";
import { CTA } from "@/components/sections/CTA";
import { photos } from "@/lib/site";

/* Paced like an editorial: photograph, breath, sequence, then the business. */
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Statement eyebrow="Talon Law Group" words={["Quiet", "work.", "Loud", "results."]} accentFrom={2}
        footnote="A trial practice built around one lawyer who answers his own phone, prepares every file as though it is going to a jury, and does not get paid unless you do."
        strip={photos.strip} />
      <Film />
      <PromiseSection />
      <PracticeIndex />
      <Proof />
      <AttorneyPanel />
      <Gallery />
      <Process />
      <Voices />
      <Markets />
      <CTA />
    </>
  );
}
