"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? "border-b border-hairline bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-8 md:h-[84px]">
          <Link href="/" aria-label="Talon Law Group — home" className="shrink-0">
            <Wordmark className="h-6 w-auto md:h-7" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-draw text-[13px] font-medium tracking-wide transition-colors ${
                  pathname.startsWith(item.href) ? "text-wine" : "text-mist/75 hover:text-mist"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phoneRaw}`}
              className="hidden text-[13px] font-medium tracking-wide text-mist/75 transition-colors hover:text-wine md:block"
            >
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-wine hidden !h-11 !px-6 sm:inline-flex">
              Start your case
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-6 bg-mist transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                />
                <span
                  className={`block h-px w-6 bg-mist transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
                  style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-[100px]">
              <nav className="flex flex-col">
                {nav.map((item, i) => (
                  <span key={item.href} className="line-mask border-b border-hairline">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.06 * i + 0.1, duration: 0.8, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className="display block py-5 text-[2.5rem] leading-none text-mist"
                      >
                        {item.label}
                      </Link>
                    </motion.span>
                  </span>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
                className="space-y-4"
              >
                <a href={`tel:${site.phoneRaw}`} className="btn btn-wine w-full">
                  Call {site.phone}
                </a>
                <p className="text-[12px] leading-relaxed text-steel">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postal}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
