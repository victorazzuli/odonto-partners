"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/config/site";
import { cinematicStills } from "@/data/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Course } from "@/data/courses";

type Mode = "video" | "stills";

/**
 * Hero cinematográfico.
 * 1) Tenta o vídeo (/videos/hero.mp4 ou hero-mobile.mp4) — autoplay, muted, loop, playsInline.
 * 2) Se falhar, demorar, o usuário economizar dados ou preferir menos movimento:
 *    sequência de fotos reais com Ken Burns + crossfade.
 * 3) O poster fica sempre por baixo — nunca uma tela preta.
 */
export function VideoHero({ nextCourse }: { nextCourse?: Course }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("video");
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!site.hero.video.enabled || reduce || conn?.saveData) {
      setMode("stills");
      return;
    }
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(mobile ? site.hero.video.mobile : site.hero.video.desktop);
    const t = setTimeout(() => {
      if (!videoRef.current || videoRef.current.readyState < 3) setMode("stills");
    }, 4500);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (mode !== "stills" || reduce) return;
    const t = setInterval(() => setStill((i) => (i + 1) % cinematicStills.length), 6000);
    return () => clearInterval(t);
  }, [mode, reduce]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-bone" aria-label="Apresentação">
      {/* Camada de mídia */}
      <motion.div style={{ scale: reduce ? 1 : mediaScale }} className="absolute inset-0 -z-10">
        {/* Poster: base permanente */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.hero.video.poster}), radial-gradient(120% 80% at 70% 20%, #2e3034 0%, #0a0a0b 70%)` }}
          aria-hidden
        />

        {mode === "stills" &&
          cinematicStills.map((s, i) => (
            <div
              key={s}
              aria-hidden
              className="absolute inset-0 transition-opacity duration-[2200ms] ease-luxe"
              style={{ opacity: i === still ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                className={`h-full w-full object-cover grayscale-[35%] ${i === still && !reduce ? "animate-kenburns" : ""}`}
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </div>
          ))}

        {mode === "video" && src && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-luxe ${ready ? "opacity-100" : "opacity-0"}`}
            src={src}
            poster={site.hero.video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onCanPlay={() => setReady(true)}
            onError={() => setMode("stills")}
          />
        )}

        {/* Overlays: legibilidade sempre garantida */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_100%,rgba(10,10,11,0.85),transparent_70%)]" aria-hidden />
        <div className="grain absolute inset-0 overflow-hidden" aria-hidden />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: contentY, opacity: contentO }} className="relative mx-auto w-full max-w-wide px-5 pb-28 pt-40 md:px-8 md:pb-32 xl:px-12">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-bone/70"
        >
          <span>Desde {site.foundingYear}</span>
          <span className="h-3 w-px bg-bone/30" aria-hidden />
          <span>Formação profissional</span>
          <span className="h-3 w-px bg-bone/30" aria-hidden />
          <span>Prática clínica</span>
        </motion.p>

        <h1 className="mt-7 max-w-[15ch] font-serif text-display-xl">
          {["Conhecimento que", "transforma prática", <>em <em className="text-metal">excelência.</em></>].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, delay: 1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-base leading-relaxed text-bone/75 md:col-span-5 md:text-lg"
          >
            Formação, ciência e experiência clínica para profissionais que querem elevar seu nível de atuação.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 md:col-span-7 md:justify-end"
          >
            <MagneticButton href="/cursos">Conheça nossos cursos</MagneticButton>
            <MagneticButton href="/quem-somos" variant="ghost" arrow={false}>Conheça a Odonto Partners</MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Barra inferior */}
      <div className="absolute inset-x-0 bottom-0 border-t border-bone/10 bg-ink/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-wide items-center justify-between gap-6 px-5 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-bone/60 md:px-8 xl:px-12">
          <span className="hidden items-center gap-3 sm:flex">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-open opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-open" />
            </span>
            Clínica-escola · Brooklin, São Paulo
          </span>
          {nextCourse && (
            <Link href={`/curso/${nextCourse.slug}`} className="link-underline truncate text-bone/80 hover:text-bone">
              Próxima turma: {nextCourse.title} — {nextCourse.dateLabel?.replace(/^Início:\s*/, "")}
            </Link>
          )}
          <span className="hidden items-center gap-2 lg:flex" aria-hidden>
            Role <span className="block h-6 w-px animate-pulse bg-bone/50" />
          </span>
        </div>
      </div>
    </section>
  );
}
