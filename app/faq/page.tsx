import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Answers } from "@/components/sections/Answers";
import { CTA } from "@/components/sections/CTA";
import { faqClips } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions, answered",
  description:
    "The questions injured people ask on the first call, answered by Shaheen Wallace in under half a minute each. Truck crashes, shared fault, evidence, fees.",
};

export default function FAQ() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqClips.map((c) => ({
      "@type": "Question",
      name: c.question,
      acceptedAnswer: { "@type": "Answer", text: c.summary },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader
        eyebrow="Straight answers"
        lines={["Ask the lawyer.", "Not the internet."]}
        lede="Every answer here is Shaheen's, in under half a minute. They are general information for people deciding whether to call, not advice about your case. For that, the number is at the bottom of the page and he picks up."
      />
      <Answers dark={false} heading={["Every question", "we get asked."]} />
      <CTA />
    </>
  );
}
