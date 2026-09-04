import { process_ } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

export function Process() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="mb-16 max-w-[720px]">
        <Reveal><p className="eyebrow mb-7">How it works</p></Reveal>
        <LineReveal as="h2" className="display text-[clamp(2rem,4.6vw,3.75rem)]" lines={["From the call", "to the check."]} />
      </div>
      <ol className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
        {process_.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.07} className="group relative bg-ground p-8 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="figure shrink-0 text-[13px] text-accent">{s.n}</span>
              <span className="shrink-0 text-right font-display text-[10px] uppercase leading-[1.6] tracking-[0.14em] text-fg-3">{s.time}</span>
            </div>
            <h3 className="display mt-8 text-[1.125rem] leading-tight">{s.title}</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-fg-2">{s.body}</p>
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }} aria-hidden />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
