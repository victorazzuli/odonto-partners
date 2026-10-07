import Link from "next/link";
import type { Course } from "@/data/courses";
import { areaLabels, formatLabels } from "@/data/courses";
import { getProfessor } from "@/data/professors";
import { getStatus } from "@/lib/course-status";
import { waLink, site } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "./StatusBadge";

/** "Próximas experiências" — o curso com data mais próxima, em destaque */
export function FeaturedCourse({ course, others }: { course: Course; others: Course[] }) {
  const profs = (course.professors ?? []).map(getProfessor).filter(Boolean);
  return (
    <section className="bg-ink text-bone" aria-labelledby="proximas">
      <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Agenda</p>
            <h2 id="proximas" className="mt-5 font-serif text-display-md">Próximas <em>experiências</em></h2>
          </div>
          <Link href="/cursos" className="link-underline self-start text-sm uppercase tracking-[0.18em] text-bone/70 hover:text-bone md:self-auto">Ver agenda completa →</Link>
        </div>

        <article className="relative mt-12 grid overflow-hidden rounded-[2rem] border border-bone/10 bg-ink-800 lg:grid-cols-12">
          <ImageReveal className="relative min-h-[320px] lg:col-span-6 lg:min-h-[560px]">
            <SmartImage src={course.image} alt={course.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" label={course.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-800/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-800/60" aria-hidden />
            <div className="absolute left-5 top-5"><StatusBadge course={course} initial={getStatus(course)} /></div>
          </ImageReveal>
          <div className="flex flex-col p-7 md:p-12 lg:col-span-6">
            <p className="eyebrow">{areaLabels[course.area]} · {formatLabels[course.format]}</p>
            <h3 className="mt-5 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.02]">{course.title}</h3>
            {course.summary && <p className="mt-6 max-w-lg leading-relaxed text-bone/65">{course.summary}</p>}

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone/10 pt-8 text-sm">
              <div><dt className="eyebrow">Data</dt><dd className="mt-2 text-bone/90">{course.dateLabel?.replace(/^Início:\s*/, "")}</dd></div>
              <div><dt className="eyebrow">Local</dt><dd className="mt-2 text-bone/90">{course.location ?? `${site.address.district}, ${site.address.city}`}</dd></div>
              {course.workload && <div><dt className="eyebrow">Carga horária</dt><dd className="mt-2 text-bone/90">{course.workload}</dd></div>}
              {profs.length > 0 && (
                <div><dt className="eyebrow">Professor{profs.length > 1 ? "es" : ""}</dt><dd className="mt-2 text-bone/90">{profs.map((p) => p!.name).join(", ")}</dd></div>
              )}
              {course.audience && <div className="col-span-2"><dt className="eyebrow">Público-alvo</dt><dd className="mt-2 text-bone/90">{course.audience}</dd></div>}
            </dl>

            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <MagneticButton href={`/ficha-de-inscricao?curso=${course.slug}`}>Quero participar</MagneticButton>
              <MagneticButton href={waLink("inscricoes", `Olá, gostaria de mais informações sobre o curso ${course.title}`)} external variant="ghost" arrow={false}>Tirar dúvidas no WhatsApp</MagneticButton>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-2 xl:grid-cols-4">
            {others.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.06} className="bg-ink">
                <Link href={`/curso/${c.slug}`} className="group flex h-full flex-col justify-between gap-6 p-6 transition hover:bg-ink-800">
                  <span className="text-xs uppercase tracking-[0.18em] text-bone/45">{c.dateLabel?.replace(/^Início:\s*/, "")}</span>
                  <span className="font-serif text-2xl leading-tight">{c.title}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-bone/50 transition group-hover:text-bone">Detalhes →</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
