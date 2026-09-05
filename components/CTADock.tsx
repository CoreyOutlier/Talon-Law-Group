"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/* Desktop counterpart to the phone action bar: once the first screen is
   gone, the two ways to reach the firm float bottom-right. */
export function CTADock() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(window.scrollY > 720 && window.scrollY < max - 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-line bg-ground/90 p-2 shadow-[0_24px_60px_-24px_rgba(11,11,12,.55)] backdrop-blur transition-[transform,opacity] duration-500 lg:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
    >
      <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost !h-11 !px-5">{site.phone}</a>
      <Link href="/contact" className="btn btn-wine !h-11 !px-6">Start your case</Link>
    </div>
  );
}
