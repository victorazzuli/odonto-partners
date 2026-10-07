"use client";
import { useRef } from "react";
import { testimonials, testimonialVideos } from "@/data/content";
import { initials } from "@/lib/utils";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialCard({ name, text, course }: { name: string; text: string; course?: string }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-bone-50 p-7 md:p-9">
      <blockquote className="font-serif text-[1.35rem] leading-snug text-ink md:text-[1.55rem]">
        <span aria-hidden className="mb-4 block font-serif text-5xl leading-none text-ink/20">“</span>
        {text}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-xs font-semibold tracking-widest text-bone" aria-hidden>{initials(name)}</span>
        <span>
          <span className="block text-sm font-semibold text-ink">{name}</span>
          <span className="block text-xs text-ink/50">{course ?? "Aluna(o) Odonto Partners"}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ showVideos = true }: { showVideos?: boolean }) {
  const scroller = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="light bg-bone py-24 text-ink md:py-36" aria-labelledby="depoimentos">
      <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow !text-graphite">Depoimentos</p>
            <h2 id="depoimentos" className="mt-6 font-serif text-display-md">Quem passa pela Odonto Partners leva conhecimento <em>para a vida.</em></h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Depoimento anterior" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-bone">←</button>
            <button type="button" onClick={() => scroll(1)} aria-label="Próximo depoimento" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-bone">→</button>
          </div>
        </div>
      </div>

      <ul ref={scroller} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 md:px-8 xl:px-12" tabIndex={0} aria-label="Depoimentos de alunos">
        {testimonials.map((t) => (
          <li key={t.name} className="w-[86vw] shrink-0 snap-start sm:w-[60vw] lg:w-[34vw] 2xl:w-[26vw]">
            <TestimonialCard {...t} />
          </li>
        ))}
      </ul>

      {showVideos && (
        <div className="mx-auto mt-20 max-w-wide px-5 md:px-8 xl:px-12">
          <Reveal className="flex items-end justify-between gap-6 border-t border-ink/10 pt-10">
            <h3 className="font-serif text-3xl md:text-4xl">Depoimentos em vídeo</h3>
            <p className="hidden text-sm text-ink/55 md:block">Toque para assistir — carregado sob demanda</p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonialVideos.slice(0, 3).map((id, i) => (
              <Reveal as="li" key={id} delay={i * 0.08}>
                <YouTubeLite id={id} title={`Depoimento de aluno ${i + 1}`} />
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
