import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Promise as PromiseSection } from "@/components/sections/Promise";
import { PracticeIndex } from "@/components/sections/PracticeIndex";
import { Proof } from "@/components/sections/Proof";
import { AttorneyPanel } from "@/components/sections/AttorneyPanel";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <PromiseSection />
      <PracticeIndex />
      <Proof />
      <AttorneyPanel />
      <Process />
      <Voices />
      <CTA />
    </>
  );
}
