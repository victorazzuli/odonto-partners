"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const steps = [
  { k: "Conhecimento", d: "Embasamento científico, anatomia aplicada e literatura na íntegra." },
  { k: "Prática", d: "Live shows e atendimento clínico a pacientes reais, com supervisão." },
  { k: "Experiência", d: "Professores com currículo internacional e uma clínica que nasceu clínica." },
  { k: "Excelência", d: "Resultados mais naturais, seguros e assertivos para os seus pacientes." },
];

/** Narrativa central: Conhecimento → Prática → Experiência → Excelência */
export function Narrative() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="light bg-bone text-ink" aria-labelledby="narrativa">
      <div ref={ref} className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-36 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow !text-graphite">O método Odonto Partners</p>
            <h2 id="narrativa" className="mt-6 font-serif text-display-sm">
              Uma formação pensada como um percurso — da sala de aula à <em>cadeira clínica</em>.
            </h2>
          </div>
          <ol className="relative lg:col-span-8">
            <span className="absolute left-0 top-0 h-full w-px bg-ink/10 md:left-[7.5rem]" aria-hidden />
            <motion.span style={{ height: reduce ? "100%" : line }} className="absolute left-0 top-0 w-px bg-ink md:left-[7.5rem]" aria-hidden />
            {steps.map((s, i) => (
              <li key={s.k} className="relative grid gap-2 pb-12 pl-8 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-10 md:pl-0">
                <span className="text-xs font-semibold tracking-[0.2em] text-graphite md:pt-5">0{i + 1}</span>
                <div className="md:pl-10">
                  <p className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-none">
                    {s.k}
                    {i < steps.length - 1 && <span className="ml-3 text-ink/20" aria-hidden>→</span>}
                  </p>
                  <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
