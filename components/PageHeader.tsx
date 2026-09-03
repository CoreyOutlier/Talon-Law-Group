import { LineReveal, Reveal } from "@/components/Motion";

export function PageHeader({
  eyebrow,
  lines,
  lede,
}: {
  eyebrow: string;
  lines: (string | React.ReactNode)[];
  lede?: string;
}) {
  return (
    <header className="shell pb-16 pt-36 md:pb-24 md:pt-52">
      <Reveal><p className="eyebrow mb-8">{eyebrow}</p></Reveal>
      <LineReveal
        as="h1"
        className="display max-w-[16ch] text-[clamp(2.75rem,8vw,7rem)]"
        lines={lines}
      />
      {lede && (
        <Reveal delay={0.25}>
          <p className="mt-9 max-w-[58ch] text-[1.0625rem] leading-relaxed text-mist/70 text-pretty md:text-[1.1875rem]">
            {lede}
          </p>
        </Reveal>
      )}
    </header>
  );
}
