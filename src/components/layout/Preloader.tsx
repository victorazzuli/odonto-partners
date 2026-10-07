"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Abertura curtíssima (≤ 1s), apenas na primeira visita da sessão */
export function Preloader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("op-intro")) return;
      sessionStorage.setItem("op-intro", "1");
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 950);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl text-bone md:text-6xl"
            >
              Odonto <span className="italic text-metal">Partners</span>
            </motion.p>
          </div>
          <motion.span
            className="absolute bottom-[42%] left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-bone/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
