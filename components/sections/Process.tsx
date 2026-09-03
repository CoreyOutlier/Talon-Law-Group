import { process_ } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

export function Process() {
  return (
    <section className="shell py-24 md:py-40">
      <div className="mb-16 max-w-[24ch]">
        <Reveal><p className="eyebrow mb-7">How it works</p></Reveal>
        <LineReveal
          as="h2"
          className="display text-[clamp(2.25rem,5.5vw,4.25rem)]"
          lines={["From the call", "to the cheque."]}
        />
      </div>

      <ol className="grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-5">
        {process_.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.07} className="group relative bg-ink p-8 md:p-9">
            <div className="flex items-baseline justify-between">
              <span className="figure text-[13px] text-brass">{s.n}</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-2">{s.time}</span>
            </div>
            <h3 className="display mt-8 text-[1.5rem] leading-tight">{s.title}</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-bone/60">{s.body}</p>
            <span
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 group-hover:scale-x-100"
              style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
              aria-hidden
            />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
