"use client";

/* The firm's actual lockup. `onDark` swaps to the paper-type variant. */
export function Wordmark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={onDark ? "/media/brand/logo-light.png" : "/media/brand/logo.png"}
      alt="Talon Law Group"
      className={className}
      decoding="async"
    />
  );
}

/* The claw alone — an accent glyph. */
export function Claw({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/media/brand/mark.png" alt="" aria-hidden className={className} decoding="async" />;
}
