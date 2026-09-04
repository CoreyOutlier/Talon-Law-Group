"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/* Injured people are on phones. This is always one thumb away. */
export function ActionBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const s = { width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-[#D9D3C8] bg-paper text-ink transition-transform duration-500 lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-3 divide-x divide-[#D9D3C8]">
        <a href={`tel:${site.phoneRaw}`} className="flex h-16 flex-col items-center justify-center gap-1 font-display text-[11px] font-medium uppercase tracking-[0.14em]">
          <svg viewBox="0 0 24 24" {...s}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>Call
        </a>
        <a href={`sms:${site.smsRaw}`} className="flex h-16 flex-col items-center justify-center gap-1 font-display text-[11px] font-medium uppercase tracking-[0.14em]">
          <svg viewBox="0 0 24 24" {...s}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z"/></svg>Text
        </a>
        <Link href="/contact" className="flex h-16 flex-col items-center justify-center gap-1 bg-wine font-display text-[11px] font-medium uppercase tracking-[0.14em] text-paper">
          <svg viewBox="0 0 24 24" {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>Start case
        </Link>
      </div>
    </div>
  );
}
