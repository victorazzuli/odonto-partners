"use client";
import { useState } from "react";

/** Embed leve: miniatura estática até o clique (sem custo de iframe no carregamento) */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-700">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 h-full w-full" aria-label={`Assistir: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80 grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
          <span className="absolute left-5 bottom-5 flex items-center gap-3 text-bone">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bone text-ink transition group-hover:scale-110" aria-hidden>
              <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Assistir</span>
          </span>
        </button>
      )}
    </div>
  );
}
