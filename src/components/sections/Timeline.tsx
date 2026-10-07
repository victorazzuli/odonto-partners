import { timeline } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  return (
    <ol className="relative mt-16 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-2 xl:grid-cols-3">
      {timeline.map((t, i) => (
        <Reveal as="li" key={t.title} delay={(i % 3) * 0.08} className="group relative bg-ink p-8 transition-colors duration-700 hover:bg-ink-800 md:p-10">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl text-metal md:text-5xl">{t.year}</span>
            <span className="text-xs tracking-[0.2em] text-bone/30">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-8 text-lg font-semibold">{t.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/60">{t.text}</p>
          <span className="absolute bottom-0 left-0 h-px w-0 bg-bone/60 transition-all duration-1000 ease-luxe group-hover:w-full" aria-hidden />
        </Reveal>
      ))}
    </ol>
  );
}
