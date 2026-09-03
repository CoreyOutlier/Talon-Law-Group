import { promises } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";

export function Promise() {
  return (
    <section className="shell py-24 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-7">Why people call us</p>
          </Reveal>
          <LineReveal
            as="h2"
            className="display text-[clamp(2.25rem,5.5vw,4.25rem)]"
            lines={["Most firms sell", "you volume.", "We sell you"]}
          />
          <LineReveal
            as="p"
            delay={0.15}
            className="display text-[clamp(2.25rem,5.5vw,4.25rem)] text-brass"
            lines={["attention."]}
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="divide-y divide-hairline border-t border-hairline">
            {promises.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 0.09} className="group py-9">
                <div className="flex gap-6 md:gap-10">
                  <span className="figure shrink-0 pt-1 text-[13px] text-brass">{p.k}</span>
                  <div>
                    <h3 className="display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">{p.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-bone/65 text-pretty">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
