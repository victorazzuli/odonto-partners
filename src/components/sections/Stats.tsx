"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { stats } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

function Counter({ to, decimals = 0, prefix = "", suffix = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const fmt = (v: number) => prefix + v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const [val, setVal] = useState(fmt(reduce ? to : 0));
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(fmt(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to]);
  return <span ref={ref} aria-hidden>{val}</span>;
}

export function Stats() {
  const items = stats.filter((s) => s.visible);
  return (
    <section aria-label="Números da Odonto Partners" className="relative border-y border-bone/10 bg-ink text-bone">
      <div className="mx-auto grid max-w-wide grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => {
          const d = "decimals" in s ? s.decimals : 0;
          const text = `${s.prefix}${s.value.toLocaleString("pt-BR", { minimumFractionDigits: d })}${s.suffix} ${s.label}`;
          return (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`relative px-5 py-12 md:px-10 md:py-20 ${i % 2 === 1 ? "border-l border-bone/10" : ""} ${i > 1 ? "border-t border-bone/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <p className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-none tracking-tight">
                <span className="sr-only">{text}</span>
                <Counter to={s.value} decimals={d} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-5 max-w-[18ch] text-sm leading-snug text-bone/65 md:text-base">{s.label}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
