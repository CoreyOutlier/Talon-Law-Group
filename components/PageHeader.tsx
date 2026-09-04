import { LineReveal, Reveal } from "@/components/Motion";
import { Figure } from "@/components/Figure";

export function PageHeader({ eyebrow, lines, lede, photo }: {
  eyebrow: string; lines: (string | React.ReactNode)[]; lede?: string; photo?: string;
}) {
  return (
    <header className="shell grid gap-10 pb-16 pt-32 md:pb-24 md:pt-44 lg:grid-cols-12 lg:items-end">
      <div className={photo ? "lg:col-span-7" : "lg:col-span-10"}>
        <Reveal><p className="eyebrow mb-8">{eyebrow}</p></Reveal>
        <LineReveal as="h1" className="display display-xl max-w-[18ch] text-[clamp(2.25rem,6vw,5.5rem)]" lines={lines} />
        {lede && <Reveal delay={0.25}><p className="mt-9 max-w-[56ch] text-[1.0625rem] leading-relaxed text-fg-2 text-pretty md:text-[1.1875rem]">{lede}</p></Reveal>}
      </div>
      {photo && (
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <Figure src={photo} alt="" ratio="4 / 5" wipe="x" priority />
        </Reveal>
      )}
    </header>
  );
}
