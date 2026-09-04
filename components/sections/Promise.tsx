import { photos, promises } from "@/lib/site";
import { LineReveal, Reveal } from "@/components/Motion";
import { Figure } from "@/components/Figure";

export function Promise() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow mb-7">Why people call us</p></Reveal>
          <LineReveal as="h2" className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)]" lines={["Most firms sell", "you volume."]} />
          <LineReveal as="p" delay={0.15} className="display max-w-[16ch] text-[clamp(2rem,4.6vw,3.75rem)] text-accent" lines={["We sell you attention."]} />
          <ul className="mt-14 divide-y divide-line border-t border-line">
            {promises.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 0.09} className="py-9">
                <div className="flex gap-6 md:gap-10">
                  <span className="figure shrink-0 pt-1 text-[13px] text-accent">{p.k}</span>
                  <div>
                    <h3 className="display text-[clamp(1.125rem,1.9vw,1.5rem)] leading-tight">{p.title}</h3>
                    <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-fg-2 text-pretty">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-32">
              <Figure src={photos.phone} alt="Shaheen Wallace on the phone" ratio="4 / 5" wipe="x" />
              <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-fg-3">He answers his own phone. That is not a slogan; it is the operating model.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
