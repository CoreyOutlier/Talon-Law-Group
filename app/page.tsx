"use client";

import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { Voices } from "@/components/sections/Voices";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Break } from "@/components/sections/Break";
import { Proof } from "@/components/sections/Proof";
import { AttorneyPanel } from "@/components/sections/AttorneyPanel";
import { Standard } from "@/components/sections/Standard";
import { Process } from "@/components/sections/Process";
import { Answers } from "@/components/sections/Answers";
import { Markets } from "@/components/sections/Markets";
import { CTA } from "@/components/sections/CTA";
import { env } from "@/lib/env";

/* Paced like an editorial: photograph, breath, sequence, then the business. */
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <PromiseSection />
      <Voices />
      <PracticeIndex />
      <Break src={env.corridor} position="50% 40%" eyebrow="Amat victoria curam" lines={["Victory loves", "preparation."]} />
      <Proof />
      <AttorneyPanel />
      <Standard />
      <Process />
      <Answers limit={3} dark={false} />
      <Markets />
      <CTA />
    </>
  );
}
