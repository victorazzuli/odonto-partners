"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Cursor discreto (somente mouse/desktop): ponto + anel que cresce sobre links */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role='button'], input, select, textarea, label"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference" />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.9 : 1, opacity: hover ? 0.9 : 0.35 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-bone mix-blend-difference"
      />
    </>
  );
}
