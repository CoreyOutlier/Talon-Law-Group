"use client";

import type { ReactNode } from "react";

export function Marquee({
  items,
  duration = 46,
  className = "",
}: {
  items: ReactNode[];
  duration?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee relative overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center gap-14"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-14">
            {item}
            <span aria-hidden className="h-1 w-1 rotate-45 bg-wine" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ground to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ground to-transparent" />
    </div>
  );
}
