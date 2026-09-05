import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RecordStack } from "@/components/sections/Proof";
import { CTA } from "@/components/sections/CTA";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Case Results",
  description:
    "Documented recoveries obtained by Talon Law Group for seriously injured clients. Prior results do not guarantee a similar outcome.",
};

export default function Results() {
  return (
    <>
      <PageHeader
        eyebrow="The record"
        lines={["Results we", "can document."]}
        lede="We publish figures we can stand behind. Every recovery below is a real matter with a real file. Prior results never guarantee a future outcome — but they do tell you what a firm is willing to put its name on."
        photo={env.corridor}
      />
      <RecordStack />
      <CTA />
    </>
  );
}
