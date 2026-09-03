"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------------------
 * Reveal — the workhorse. Fades + lifts content into view once.
 * Never re-triggers on scroll-up (re-animating is cheap-looking).
 * ------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------------------------------------------------------------------
 * LineReveal — masked, line-by-line headline entrance. The signature move.
 * Pass an array of lines; each rises out of its own overflow-hidden box.
 * ------------------------------------------------------------------------- */
export function LineReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.085,
  as: Tag = "h2",
}: {
  lines: (string | ReactNode)[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
  };

  return (
    <div ref={ref}>
      <Tag className={className}>
        <motion.span
          variants={container}
          initial={reduced ? "show" : "hidden"}
          animate={inView ? "show" : undefined}
          style={{ display: "block" }}
        >
          {lines.map((l, i) => (
            <span key={i} className="line-mask">
              <motion.span variants={line}>{l}</motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Counter — odometer for figures. Counts once, on view.
 * ------------------------------------------------------------------------- */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span
        initial={reduced ? false : { opacity: 1 }}
        animate={inView && !reduced ? { opacity: 1 } : undefined}
      >
        <CountUp to={to} run={inView && !reduced} duration={duration} />
      </motion.span>
      {suffix}
    </span>
  );
}

function CountUp({ to, run, duration }: { to: number; run: boolean; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  if (typeof window !== "undefined" && run && !started.current) {
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      if (ref.current) ref.current.textContent = Math.round(to * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return <span ref={ref}>{run ? "0" : to.toLocaleString()}</span>;
}

/* ---------------------------------------------------------------------------
 * Magnetic — desktop-only pull toward the cursor. Restrained: 8px max.
 * ------------------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  if (reduced) return <>{children}</>;

  return (
    <span
      ref={ref}
      style={{ display: "inline-block", willChange: "transform" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        ref.current.style.transition = "transform .12s linear";
      }}
      onPointerLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = "translate3d(0,0,0)";
        ref.current.style.transition = "transform .7s cubic-bezier(.16,1,.3,1)";
      }}
    >
      {children}
    </span>
  );
}
