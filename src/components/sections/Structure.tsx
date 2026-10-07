"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cinematicStills } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealLines } from "@/components/ui/Reveal";

const WP = "https://odontopartners.com.br/wp-content/uploads";
const strip = [
  `${WP}/2021/10/DSC05098.jpg`,
  `${WP}/2021/10/DSC05146.jpg`,
  `${WP}/2021/10/DSC05165.jpg`,
  `${WP}/2021/10/DSC05201.jpg`,
  `${WP}/2021/10/DSC05205.jpg`,
  `${WP}/2021/10/DSC05111.jpg`,
];

/** Seção cinematográfica da estrutura — parallax extremamente sutil */
export function Structure() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-bone" aria-labelledby="estrutura">
      <div className="relative h-[88svh] min-h-[560px] overflow-hidden">
        <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cinematicStills[0]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[40%]" onError={(e) => (e.currentTarget.style.opacity = "0")} />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#2e3034_0%,transparent_60%)] mix-blend-screen opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" aria-hidden />
        <div className="relative mx-auto flex h-full max-w-wide flex-col justify-end px-5 pb-16 md:px-8 md:pb-24 xl:px-12">
          <p className="eyebrow">Sede própria · Brooklin, São Paulo</p>
          <h2 id="estrutura" className="mt-6 max-w-5xl font-serif text-display-lg">
            <RevealLines lines={["Uma estrutura criada", <>para ensinar <em>na prática.</em></>]} />
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-end">
            <p className="max-w-lg leading-relaxed text-bone/70">
              Em {2020}, a Odonto Partners inaugurou sua nova sede, planejada para oferecer ainda mais qualidade: área clínica totalmente equipada para atendimentos durante os cursos e um setor exclusivo de triagem de pacientes modelo — para acolher alunos que atravessam o Brasil, e até fronteiras internacionais, para estudar aqui.
            </p>
            <div className="md:justify-self-end">
              <MagneticButton href="/galeria" variant="ghost">Conhecer a estrutura</MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-2 overflow-hidden pb-24 md:pb-32">
        <motion.ul style={reduce ? undefined : { x }} className="flex gap-3 px-5 md:gap-4" aria-label="Fotos da estrutura">
          {strip.map((s, i) => (
            <li key={s} className={`relative shrink-0 overflow-hidden rounded-2xl bg-ink-700 ${i % 2 ? "h-[38vw] w-[56vw] md:h-[22vw] md:w-[30vw]" : "h-[46vw] w-[38vw] md:h-[28vw] md:w-[22vw]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s} alt="Ambiente clínico e de ensino da Odonto Partners" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-[1.6s] ease-luxe hover:scale-105" onError={(e) => (e.currentTarget.style.opacity = "0")} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
