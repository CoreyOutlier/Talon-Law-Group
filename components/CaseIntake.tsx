"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = "tlg_intake_v1";

type Answers = {
  incident: string;
  when: string;
  injured: string;
  treated: string;
  represented: string;
  name: string;
  phone: string;
  email: string;
  detail: string;
};

const EMPTY: Answers = {
  incident: "", when: "", injured: "", treated: "", represented: "",
  name: "", phone: "", email: "", detail: "",
};

const STEPS = [
  {
    key: "incident" as const,
    q: "What happened?",
    sub: "Pick the closest one. We will sort the details on the call.",
    options: [
      "Car or motorcycle crash",
      "Truck or commercial vehicle",
      "Hit by a vehicle while walking or cycling",
      "Slip, trip or fall",
      "Medical care that went wrong",
      "Nursing home injury",
      "A death in the family",
      "Something else",
    ],
  },
  {
    key: "when" as const,
    q: "When did it happen?",
    sub: "Deadlines matter. This tells us how fast we need to move.",
    options: ["Within the last week", "Within the last month", "1 to 6 months ago", "6 months to 2 years ago", "More than 2 years ago", "I am not sure"],
  },
  {
    key: "injured" as const,
    q: "Was anyone hurt?",
    sub: "",
    options: ["Yes, seriously", "Yes, but recovering", "Still finding out", "No injuries"],
  },
  {
    key: "treated" as const,
    q: "Have you seen a doctor?",
    sub: "There is no wrong answer. It just changes what we do first.",
    options: ["Yes, and still treating", "Yes, once", "Not yet", "I went to the ER only"],
  },
  {
    key: "represented" as const,
    q: "Do you already have a lawyer on this?",
    sub: "",
    options: ["No", "Yes, but I want a second opinion", "Yes"],
  },
];

export function CaseIntake({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  // Resume a half-finished form. Injured people get interrupted.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setA({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); } catch {}
  }, [a]);

  const total = STEPS.length + 1;
  const progress = Math.round((step / total) * 100);

  const pick = (key: keyof Answers, value: string) => {
    setA((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      });
      if (!res.ok) throw new Error("bad response");
      setState("done");
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`${compact ? "" : "min-h-[420px]"} flex flex-col justify-center`}>
        <p className="eyebrow mb-5">Received</p>
        <h3 className="display text-[clamp(2rem,4vw,3rem)]">
          We have it. Expect a call
          <br />
          <em className="not-italic text-accent">within 15 minutes</em> during business hours.
        </h3>
        <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-fg/65">
          If it is after hours, you will hear from us first thing. If it cannot wait, call{" "}
          <a href={`tel:${site.phoneRaw}`} className="text-accent link-draw">{site.phone}</a> now — it is answered around the clock.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "min-h-[480px]"}>
      {/* Progress */}
      <div className="mb-9 flex items-center gap-4">
        <div className="h-px flex-1 bg-line">
          <motion.div
            className="h-px bg-wine"
            animate={{ width: `${Math.max(progress, 6)}%` }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
        <span className="figure text-[12px] tabular-nums text-fg-3">
          {String(Math.min(step + 1, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step < STEPS.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <h3 className="display text-[clamp(1.75rem,3.4vw,2.75rem)]">{STEPS[step].q}</h3>
            {STEPS[step].sub && (
              <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-fg-3">{STEPS[step].sub}</p>
            )}

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {STEPS[step].options.map((opt) => {
                const selected = a[STEPS[step].key] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(STEPS[step].key, opt)}
                    className={`group flex min-h-[60px] items-center justify-between gap-4 border px-5 py-4 text-left text-[15px] transition-all duration-300 ${
                      selected
                        ? "border-accent bg-accent/10 text-fg"
                        : "border-line text-fg/80 hover:border-accent/60 hover:bg-fg/[0.03]"
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`shrink-0 transition-transform duration-500 ${selected ? "text-accent" : "text-fg-3 group-hover:translate-x-1"}`}
                      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-8 text-[12px] uppercase tracking-[0.16em] text-fg-3 transition-colors hover:text-fg"
              >
                ← Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="contact"
            onSubmit={submit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <h3 className="display text-[clamp(1.75rem,3.4vw,2.75rem)]">Where do we reach you?</h3>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-fg-3">
              A lawyer reviews this — not a call center. Free, confidential, no obligation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={a.name} onChange={(v) => setA({ ...a, name: v })} autoComplete="name" />
              <Field label="Mobile number" required type="tel" value={a.phone} onChange={(v) => setA({ ...a, phone: v })} autoComplete="tel" />
              <div className="sm:col-span-2">
                <Field label="Email" type="email" value={a.email} onChange={(v) => setA({ ...a, email: v })} autoComplete="email" />
              </div>
              <div className="sm:col-span-2">
                <label className="eyebrow mb-2 block !text-fg-3">Anything we should know first</label>
                <textarea
                  rows={4}
                  value={a.detail}
                  onChange={(e) => setA({ ...a, detail: e.target.value })}
                  className="w-full resize-none border border-line bg-transparent px-4 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-3 focus:border-accent"
                  placeholder="Optional. Do not include confidential details until we have spoken."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button type="submit" disabled={state === "sending"} className="btn btn-wine disabled:opacity-60">
                {state === "sending" ? "Sending…" : "Send to Shaheen"}
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-[12px] uppercase tracking-[0.16em] text-fg-3 transition-colors hover:text-fg"
              >
                ← Back
              </button>
            </div>

            {state === "error" && (
              <p className="mt-5 text-[13px] text-accent">
                That did not send. Please call{" "}
                <a href={`tel:${site.phoneRaw}`} className="underline">{site.phone}</a> — we will pick up.
              </p>
            )}

            <p className="mt-7 max-w-[62ch] text-[11px] leading-relaxed text-fg-3">
              Submitting this form does not create an attorney-client relationship. Do not send
              confidential or time-sensitive information until that relationship is established
              in writing.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required, autoComplete,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block !text-fg-3">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full border border-line bg-transparent px-4 text-[15px] text-fg outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
