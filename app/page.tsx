"use client";

import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Statement } from "@/components/sections/Statement";
import { Film } from "@/components/sections/Film";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Break } from "@/components/sections/Break";
import { Proof } from "@/components/sections/Proof";
import { AttorneyPanel } from "@/components/sections/AttorneyPanel";
import { Standard } from "@/components/sections/Standard";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Markets } from "@/components/sections/Markets";
import { CTA } from "@/components/sections/CTA";
import { env } from "@/lib/env";

/* Paced like an editorial: photograph, breath, sequence, then the business. */
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Statement eyebrow="Talon Law Group" words={["Quiet", "work.", "Loud", "results."]} accentFrom={2}
        footnote="A trial practice built around one lawyer who answers his own phone, prepares every file as though it is going to a jury, and does not get paid unless you do." />
      <Film />
      <PromiseSection />
      <PracticeIndex />
      <Break src={env.corridor} position="50% 40%" eyebrow="Where cases are decided"
        lines={["Prepared for the room", "most lawyers avoid."]}
        note="Insurers pay for what they believe a jury would award. The only way to make them believe it is to be ready to find out." />
      <Proof />
      <AttorneyPanel />
      <Standard />
      <Process />
      <Voices />
      <Break src={env.pghSkyline} height="70vh" eyebrow="Home court"
        lines={["Built in Pittsburgh.", "Tried wherever it takes."]} />
      <Markets />
      <CTA />
    </>
  );
}
