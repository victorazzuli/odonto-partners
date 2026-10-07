"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "section" | "article" };

/** Reveal on scroll — suave, uma vez, respeita prefers-reduced-motion */
export function Reveal({ delay = 0, y = 28, children, as = "div", ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const lineVariants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.2, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const } }),
};

/**
 * Text reveal por linhas. O observador fica no contêiner (visível),
 * não nas linhas mascaradas — garante o disparo em qualquer viewport.
 */
export function RevealLines({ lines, className, delay = 0 }: { lines: React.ReactNode[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className ? `block ${className}` : "block"}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ delayChildren: delay }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span className="block" custom={i + delay / 0.09} variants={lineVariants}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Image reveal: cortina que se abre */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(10% 6% 10% 6%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
