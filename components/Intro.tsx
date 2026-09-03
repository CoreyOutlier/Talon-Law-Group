"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

/* ---------------------------------------------------------------------------
 * Intro — the title card.
 *
 * Deliberately pure CSS. An AnimatePresence exit here interrupts the child
 * entrance animations mid-flight, and framer-motion's keyframe resync throws
 * on the WAAPI call. CSS keyframes have no such coupling, cost no JavaScript,
 * and composite on the GPU.
 *
 * Plays once per browser session, ~2.1s, and is skipped entirely for
 * prefers-reduced-motion — it must never stand between an injured person and
 * a phone number.
 * ------------------------------------------------------------------------- */
export function Intro() {
  const [phase, setPhase] = useState<"idle" | "in" | "out" | "gone">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      return;
    }
    try {
      if (sessionStorage.getItem("tlg_intro")) { setPhase("gone"); return; }
      sessionStorage.setItem("tlg_intro", "1");
    } catch { /* private mode — just play it */ }

    setPhase("in");
    document.body.style.overflow = "hidden";

    const leave = setTimeout(() => setPhase("out"), 1900);
    const end = setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(leave);
      clearTimeout(end);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "idle" || phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink ${
        phase === "out" ? "curtain-up" : ""
      }`}
      aria-hidden
    >
      <div className="flex flex-col items-center">
        <span className="intro-mark block text-[clamp(2rem,7vw,4.5rem)]">
          <Wordmark stacked className="text-mist" />
        </span>
        <span className="intro-rule mt-8 block h-px w-[min(52vw,420px)] origin-left bg-wine-2" />
        <span className="intro-sub mt-7 text-[10px] uppercase tracking-[0.42em] text-steel">
          Injury Trial Practice
        </span>
      </div>
    </div>
  );
}
