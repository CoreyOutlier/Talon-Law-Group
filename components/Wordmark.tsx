"use client";

import { useEffect, useState } from "react";

const LOGO_SRC = "/media/brand/logo.svg";

/* ---------------------------------------------------------------------------
 * Wordmark
 *
 * Renders a typographic lockup by default and swaps in the real logo only
 * once it is confirmed to load. This avoids the broken-image flash you get
 * when an <img> 404s before React hydrates and the onError handler is lost.
 *
 * Drop the firm's logo at /public/media/brand/logo.svg and it takes over.
 * ------------------------------------------------------------------------- */
export function Wordmark({ className = "" }: { className?: string }) {
  const [logo, setLogo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled && img.naturalWidth > 0) setLogo(true); };
    img.src = LOGO_SRC;
    return () => { cancelled = true; };
  }, []);

  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={LOGO_SRC} alt="Talon Law Group" className={className} />;
  }

  return (
    <span className={`flex items-baseline gap-2.5 ${className}`} style={{ height: "auto" }}>
      <TalonMark />
      <span className="display text-[1.3rem] leading-none tracking-[0.02em] text-bone md:text-[1.45rem]">
        TALON
      </span>
      <span className="h-[13px] w-px bg-brass" aria-hidden />
      <span className="text-[9.5px] font-medium uppercase leading-none tracking-[0.26em] text-slate">
        Law&nbsp;Group
      </span>
    </span>
  );
}

/* A minimal talon: three tapering claws. Reads at 20px. */
function TalonMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 self-center"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 3c0 6.2 1.6 10.4 5 13.4"
        stroke="var(--color-brass)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 2c0 7.6.8 12.6 2.4 15.8"
        stroke="var(--color-brass)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 3.6c-.6 6.2-2.2 10.2-5 12.9"
        stroke="var(--color-brass)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.5 18.4c2.2 2.3 4.2 3.4 5.7 3.4 1.5 0 3.3-1 5.3-3.1"
        stroke="var(--color-brass)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}
