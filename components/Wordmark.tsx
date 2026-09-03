"use client";

import { useEffect, useState } from "react";

const LOGO_SRC = "/media/brand/logo.svg";

/* ---------------------------------------------------------------------------
 * Wordmark
 *
 * Renders a Jost lockup built to the brand sheet, and swaps in the real logo
 * the moment /public/media/brand/logo.svg exists. Probing first (rather than
 * relying on onError) avoids the broken-image flash you get when an <img>
 * 404s before React hydrates.
 * ------------------------------------------------------------------------- */
export function Wordmark({ className = "", stacked = false }: { className?: string; stacked?: boolean }) {
  const [logo, setLogo] = useState(false);

  useEffect(() => {
    let dead = false;
    const img = new Image();
    img.onload = () => { if (!dead && img.naturalWidth > 0) setLogo(true); };
    img.src = LOGO_SRC;
    return () => { dead = true; };
  }, []);

  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={LOGO_SRC} alt="Talon Law Group" className={className} />;
  }

  if (stacked) {
    return (
      <span className={`inline-flex flex-col items-center ${className}`}>
        <span className="flex items-center gap-[0.12em]">
          <LetterRun>TAL</LetterRun>
          <TalonMark className="h-[0.92em] w-[0.92em] translate-y-[0.02em]" />
          <LetterRun>N</LetterRun>
        </span>
        <span className="mt-[0.18em] text-[0.44em] font-medium uppercase leading-none tracking-[0.14em] text-mist">
          Law Group
        </span>
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`} style={{ height: "auto" }}>
      <TalonMark className="h-[22px] w-[22px] shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className="text-[1.05rem] font-medium uppercase leading-none tracking-[0.14em] text-mist md:text-[1.15rem]">
          Talon
        </span>
        <span className="mt-[0.28em] text-[0.5rem] font-medium uppercase leading-none tracking-[0.3em] text-steel">
          Law Group
        </span>
      </span>
    </span>
  );
}

function LetterRun({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[1em] font-medium uppercase leading-none tracking-[0.06em] text-mist">
      {children}
    </span>
  );
}

/* The talon: a ring the claw curls around — the mark from the brand sheet,
   rebuilt as geometry so it stays crisp at 18px. */
function TalonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* the ring */}
      <path
        d="M62 20 A34 34 0 1 0 84 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
        className="text-mist"
      />
      {/* the claw, curling over and tapering to a point */}
      <path
        d="M40 12c26-7 47 8 50 32 2 19-6 34-18 44 8-16 10-32 6-45-5-16-18-26-38-31Z"
        fill="var(--color-wine-2)"
      />
      <path
        d="M40 12c-6 1-9 5-8 10 1 4 5 7 10 7 4 0 7-2 8-6"
        fill="var(--color-wine-2)"
      />
    </svg>
  );
}
