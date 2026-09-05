"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { Live } from "@/components/Motion";

/* Fixed nav. Transparent with paper type over the home hero, paper ground
   with ink type everywhere else and once the page scrolls. A hairline at the
   bottom edge tracks reading progress. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const dark = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const link = dark ? "text-paper/70 hover:text-paper" : "text-ink/70 hover:text-ink";
  const active = dark ? "text-paper" : "text-wine";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
          dark ? "border-b border-transparent bg-transparent text-paper" : "bg-paper text-ink"
        } ${!dark && (scrolled || open) ? "border-b border-[#D9D3C8]" : !dark ? "border-b border-transparent" : ""}`}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-8 md:h-[92px]">
          <Link href="/" aria-label="Talon Law Group — home" className="shrink-0">
            <Wordmark className="h-9 w-auto md:h-11" onDark={dark} />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}
                className={`link-draw font-display text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  pathname.startsWith(item.href) ? active : link}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${site.phoneRaw}`} className={`hidden items-center gap-2.5 font-display text-[12px] font-medium tracking-[0.12em] transition-colors md:inline-flex ${dark ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-wine"}`}>
              <Live onDark={dark} />{site.phone}
            </a>
            <Link href="/contact" className="btn btn-wine hidden !h-11 !px-6 sm:inline-flex">Start your case</Link>
            <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
              className="relative grid h-11 w-11 place-items-center lg:hidden">
              <span className="flex flex-col gap-[5px]">
                <span className={`block h-px w-6 transition-transform duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`block h-px w-6 transition-transform duration-500 ${dark ? "bg-paper" : "bg-ink"} ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        <span ref={bar} aria-hidden className="absolute inset-x-0 bottom-[-1px] block h-[2px] origin-left bg-wine" style={{ transform: "scaleX(0)" }} />
      </header>

      <div className={`fixed inset-0 z-40 bg-paper text-ink transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="shell flex h-full flex-col justify-between pb-10 pt-[110px]">
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <span key={item.href} className="line-mask border-b border-[#D9D3C8]">
                <span className="block transition-transform duration-700" style={{ transform: open ? "none" : "translateY(110%)", transitionDelay: `${60 * i + 80}ms`, transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
                  <Link href={item.href} className="display block py-5 text-[2rem] leading-none">{item.label}</Link>
                </span>
              </span>
            ))}
          </nav>
          <div className="space-y-4">
            <a href={`tel:${site.phoneRaw}`} className="btn btn-wine w-full">Call {site.phone}</a>
            <p className="text-[12px] leading-relaxed text-ink/60">{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postal}</p>
          </div>
        </div>
      </div>
    </>
  );
}
