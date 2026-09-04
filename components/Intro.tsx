"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

/* Title card. Pure CSS, once per session, skipped for reduced motion. */
export function Intro() {
  const [phase, setPhase] = useState<"idle" | "in" | "out" | "gone">("idle");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase("gone"); return; }
    try { if (sessionStorage.getItem("tlg_intro")) { setPhase("gone"); return; } sessionStorage.setItem("tlg_intro", "1"); } catch {}
    setPhase("in"); document.body.style.overflow = "hidden";
    const a = setTimeout(() => setPhase("out"), 1800);
    const b = setTimeout(() => { setPhase("gone"); document.body.style.overflow = ""; }, 2900);
    return () => { clearTimeout(a); clearTimeout(b); document.body.style.overflow = ""; };
  }, []);
  if (phase === "idle" || phase === "gone") return null;
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-paper ${phase === "out" ? "curtain-up" : ""}`} aria-hidden>
      <div className="flex flex-col items-center">
        <span className="intro-mark block"><Wordmark className="h-[clamp(64px,12vw,140px)] w-auto" /></span>
        <span className="intro-rule mt-9 block h-px w-[min(52vw,420px)] origin-left bg-wine" />
        <span className="intro-sub mt-6 font-display text-[10px] uppercase tracking-[0.42em] text-ink/60">Injury Trial Practice</span>
      </div>
    </div>
  );
}
