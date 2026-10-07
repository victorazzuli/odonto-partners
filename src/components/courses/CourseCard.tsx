import Link from "next/link";
import type { Course } from "@/data/courses";
import { areaLabels, formatLabels } from "@/data/courses";
import { getStatus, shortDate } from "@/lib/course-status";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusBadge } from "./StatusBadge";

export function CourseCard({ course, priority = false }: { course: Course; priority?: boolean }) {
  const d = shortDate(course);
  const initial = getStatus(course);
  return (
    <article className="group relative flex h-full flex-col">
      <Link href={`/curso/${course.slug}`} className="absolute inset-0 z-10 rounded-3xl" aria-label={`${course.title} — ver detalhes`} />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-700 sm:aspect-[4/5]">
        <SmartImage
          src={course.image}
          alt={course.title}
          fill
          priority={priority}
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 90vw"
          className="object-cover transition duration-[1.4s] ease-luxe group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" aria-hidden />
        <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-2">
          <StatusBadge course={course} initial={initial} />
          {course.international && (
            <span className="rounded-full border border-bone/30 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-bone/90 backdrop-blur-md">Internacional</span>
          )}
        </div>
        {d && (
          <div className="absolute bottom-4 left-4 text-bone">
            <span className="block font-serif text-4xl leading-none">{d.day}</span>
            <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bone/70">{d.month} · {d.year}</span>
          </div>
        )}
        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>→</span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow">{areaLabels[course.area]} · {formatLabels[course.format]}</p>
        <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.08] transition-colors group-hover:text-white">{course.title}</h3>
        {course.summary && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-bone/55">{course.summary}</p>}
        {!d && course.dateLabel && <p className="mt-3 text-sm text-bone/55">{course.dateLabel}</p>}
        {(course.workload || course.location) && (
          <p className="mt-auto pt-4 text-xs uppercase tracking-[0.14em] text-bone/40">
            {[course.workload, course.location].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}
