"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryCategory, GalleryItem } from "@/data/content";
import { cn } from "@/lib/utils";

const ORDER: GalleryCategory[] = ["Estrutura", "Cursos", "Alunos", "Professores", "Procedimentos", "Eventos"];

/** Masonry + lightbox (teclado, swipe, vídeo) */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const cats = ORDER.filter((c) => items.some((i) => i.category === c));
  const [cat, setCat] = useState<"Todas" | GalleryCategory>("Todas");
  const [idx, setIdx] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const list = useMemo(() => items.filter((i) => (cat === "Todas" || i.category === cat) && !failed.has(i.src)), [items, cat, failed]);

  const close = useCallback(() => setIdx(null), []);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (idx === null) return;
    document.documentElement.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; };
  }, [idx, close, go]);

  const current = idx !== null ? list[idx] : null;
  let touchX = 0;

  return (
    <div>
      <div role="tablist" aria-label="Filtrar galeria" className="no-scrollbar flex gap-2 overflow-x-auto">
        {(["Todas", ...cats] as const).map((c) => (
          <button key={c} role="tab" type="button" aria-selected={cat === c} onClick={() => setCat(c)}
            className={cn("chip shrink-0", cat === c ? "border-bone bg-bone text-ink" : "border-bone/15 text-bone/70 hover:border-bone/50")}>
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {list.map((it, i) => (
          <li key={it.src} className="mb-3 break-inside-avoid md:mb-4">
            <button type="button" onClick={() => setIdx(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-ink-700" aria-label={`Ampliar: ${it.alt}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.thumb ?? it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className={cn("w-full object-cover transition duration-[1.2s] ease-luxe group-hover:scale-[1.04]", i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]")}
                onError={() => setFailed((s) => new Set(s).add(it.src))}
              />
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" aria-hidden />
              {it.video && (
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bone text-ink">▶</span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-10 text-bone/50">Nenhuma imagem disponível nesta categoria.</p>}

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchX = e.touches[0].clientX)}
            onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {current.video ? (
                <div className="aspect-video w-full overflow-hidden rounded-2xl">
                  <iframe src={`https://www.youtube-nocookie.com/embed/${current.video}?autoplay=1&rel=0`} title={current.alt} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.alt} className="mx-auto max-h-[82svh] w-auto rounded-2xl object-contain" />
              )}
              <p className="mt-4 flex justify-between text-xs uppercase tracking-[0.18em] text-bone/50">
                <span>{current.category}</span>
                <span>{(idx ?? 0) + 1} / {list.length}</span>
              </p>
            </motion.div>
            <button type="button" onClick={close} aria-label="Fechar" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-bone hover:bg-bone hover:text-ink md:right-8 md:top-8">✕</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 text-bone hover:bg-bone hover:text-ink md:flex">←</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próxima" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 text-bone hover:bg-bone hover:text-ink md:flex">→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
