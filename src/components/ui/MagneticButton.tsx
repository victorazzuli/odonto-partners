"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  external?: boolean;
  arrow?: boolean;
  ariaLabel?: string;
};

/** CTA com hover magnético sutil (desativado em touch e reduced-motion) */
export function MagneticButton({ href, children, variant = "primary", className, external, arrow = true, ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  const reset = () => { x.set(0); y.set(0); };

  const variants = { primary: "btn-primary", ghost: "btn-ghost", dark: "btn-dark" } as const;
  const cls = cn("btn group", variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 ease-luxe group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </>
  );

  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-block">
      {external ? (
        <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={cls} onPointerMove={move} onPointerLeave={reset} aria-label={ariaLabel}>
          {inner}
        </a>
      ) : (
        <Link ref={ref} href={href} className={cls} onPointerMove={move} onPointerLeave={reset} aria-label={ariaLabel}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}
