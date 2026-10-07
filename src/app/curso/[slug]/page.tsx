import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse, areaLabels, formatLabels } from "@/data/courses";
import { getProfessor } from "@/data/professors";
import { gallery, testimonials } from "@/data/content";
import { getStatus, sortCatalog } from "@/lib/course-status";
import { pageMeta, courseLd, breadcrumbLd } from "@/lib/seo";
import { site, waLink } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/courses/StatusBadge";
import { CourseCard } from "@/components/courses/CourseCard";
import { ProfessorCard } from "@/components/sections/Professors";
import { TestimonialCard } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCourse((await params).slug);
  if (!c) return {};
  const when = c.dateLabel && c.start ? ` ${c.dateLabel.replace(/^Início:\s*/, "")}.` : "";
  return pageMeta({
    title: c.title,
    description: (c.summary ?? `${c.title} — curso de ${areaLabels[c.area]} na Odonto Partners, clínica-escola no Brooklin, São Paulo.`) + when,
    path: `/curso/${c.slug}`,
    image: c.image || undefined,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCourse((await params).slug);
  if (!c) notFound();
  const status = getStatus(c);
  const closed = status === "esgotado" || status === "esgotado-aguardando" || status === "realizado";
  const profs = (c.professors ?? []).map(getProfessor).filter((p): p is NonNullable<typeof p> => !!p);
  const related = sortCatalog(courses.filter((x) => x.area === c.area && x.slug !== c.slug)).slice(0, 4);
  const rich = !!(c.objective || c.modules);
  const enroll = `/ficha-de-inscricao?curso=${c.slug}`;
  const wa = waLink("inscricoes", `Olá, gostaria de mais informações sobre o curso ${c.title}`);
  const photos = gallery.filter((g) => !g.video).slice(0, 6);

  const facts = [
    { k: "Data", v: c.start ? c.dateLabel : undefined },
    { k: "Local", v: c.location ?? (c.international ? undefined : `${site.address.district}, ${site.address.city}`) },
    { k: "Carga horária", v: c.workload },
    { k: "Horário", v: c.schedule },
    { k: "Público-alvo", v: c.audience },
    { k: "Categoria", v: c.category },
  ].filter((f) => f.v);

  return (
    <>
      <JsonLd data={[courseLd(c), breadcrumbLd([{ name: "Início", path: "/" }, { name: "Cursos", path: "/cursos" }, { name: c.title, path: `/curso/${c.slug}` }])]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-bone md:pt-44">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(185,181,172,0.10),transparent_70%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-wide gap-12 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-7">
            <nav aria-label="Trilha de navegação" className="text-xs uppercase tracking-[0.16em] text-bone/45">
              <Link href="/" className="hover:text-bone">Início</Link> / <Link href={c.area === "hof" ? "/cursos/harmonizacao-facial" : "/cursos/odontologia-classica"} className="hover:text-bone">{areaLabels[c.area]}</Link>
            </nav>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <StatusBadge course={c} initial={status} className="!bg-bone/10" />
              <span className="eyebrow">{formatLabels[c.format]}{c.international ? " · Internacional" : ""}</span>
            </div>
            <h1 className="mt-6 font-serif text-display-lg"><RevealLines lines={[c.title]} /></h1>
            {c.summary && <Reveal delay={0.2} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/70">{c.summary}</Reveal>}
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              {closed ? (
                <MagneticButton href={wa} external>Avise-me das próximas datas</MagneticButton>
              ) : (
                <MagneticButton href={enroll}>Quero participar</MagneticButton>
              )}
              <MagneticButton href={wa} external variant="ghost" arrow={false}>Tirar dúvidas no WhatsApp</MagneticButton>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-ink-700">
              <SmartImage src={c.image} alt={c.title} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" label={c.title} />
            </div>
          </Reveal>
        </div>

        {facts.length > 0 && (
          <dl className="relative mx-auto mt-16 grid max-w-wide grid-cols-2 gap-px border-y border-bone/10 bg-bone/10 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
            {facts.map((f) => (
              <div key={f.k} className="bg-ink px-5 py-6 md:px-8">
                <dt className="eyebrow">{f.k}</dt>
                <dd className="mt-3 text-[0.95rem] leading-snug text-bone/85">{f.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* CORPO */}
      <section className="bg-ink pb-24 text-bone">
        <div className="mx-auto grid max-w-wide gap-16 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="space-y-20 lg:col-span-8">
            {c.objective && (
              <div>
                <h2 className="eyebrow">Objetivo do curso</h2>
                <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-bone/75">
                  {c.objective.map((o) => <p key={o.slice(0, 30)}>{o}</p>)}
                </div>
              </div>
            )}

            {c.highlights && (
              <div>
                <h2 className="eyebrow">Por que a Odonto Partners</h2>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 sm:grid-cols-2">
                  {c.highlights.map((h) => <li key={h} className="bg-ink p-6 font-serif text-xl leading-snug">{h}</li>)}
                </ul>
              </div>
            )}

            {c.modules && (
              <div>
                <h2 className="font-serif text-display-sm">Conteúdo programático</h2>
                <ol className="mt-8 border-t border-bone/10">
                  {c.modules.map((m, i) => (
                    <li key={m.title} className="border-b border-bone/10">
                      <details className="group" open={i === 0}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                          <span className="flex gap-6">
                            <span className="pt-1.5 text-xs tracking-[0.2em] text-bone/35">{String(i + 1).padStart(2, "0")}</span>
                            <span>
                              <span className="block text-lg md:text-xl">{m.title}</span>
                              {m.professors && <span className="mt-1 block text-sm text-bone/45">{m.professors.join(" · ")}</span>}
                            </span>
                          </span>
                          <span className="mt-2 h-3 w-3 shrink-0 rotate-45 border-b border-r border-bone/50 transition-transform duration-500 group-open:-rotate-[135deg]" aria-hidden />
                        </summary>
                        <ul className="grid gap-x-8 gap-y-2 pb-8 pl-10 text-[0.95rem] leading-relaxed text-bone/65 md:grid-cols-2">
                          {m.topics.map((t) => <li key={t} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-bone/30">{t}</li>)}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {!rich && (
              <div className="rounded-3xl border border-bone/10 bg-ink-800 p-8 md:p-12">
                <p className="eyebrow">Programa completo</p>
                <p className="mt-5 font-serif text-3xl leading-tight md:text-4xl">Receba o conteúdo programático, professores e condições deste curso diretamente com a nossa equipe.</p>
                {/* ⚠ PLACEHOLDER: descrição completa deste curso a ser migrada do site/CMS */}
                <div className="mt-8"><MagneticButton href={wa} external>Receber programa pelo WhatsApp</MagneticButton></div>
              </div>
            )}

            {rich && (
              <div className="rounded-3xl border border-bone/10 p-8 md:p-10">
                <p className="eyebrow">Atendimento clínico a pacientes</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-bone/70">
                  A prática acontece na clínica própria da Odonto Partners, com pacientes modelo triados pelo nosso setor exclusivo e sempre com a supervisão dos professores.
                </p>
              </div>
            )}

            {profs.length > 0 && (
              <div>
                <h2 className="font-serif text-display-sm">Professores</h2>
                <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                  {profs.map((p, i) => <ProfessorCard key={p.slug} p={p} index={i} />)}
                </div>
              </div>
            )}

            {rich && (
              <div>
                <h2 className="eyebrow">Galeria do curso</h2>
                <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {photos.map((g, i) => (
                    <li key={g.src} className={`relative overflow-hidden rounded-2xl bg-ink-700 ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Card fixo de inscrição (desktop) */}
          <aside className="hidden lg:col-span-4 lg:block" aria-label="Inscrição">
            <div className="sticky top-28 rounded-3xl border border-bone/10 bg-ink-800 p-8">
              <p className="eyebrow">Inscrição</p>
              <p className="mt-4 font-serif text-3xl leading-tight">{c.title}</p>
              {c.dateLabel && <p className="mt-4 text-bone/70">{c.dateLabel}</p>}
              <div className="mt-8 grid gap-3">
                {!closed && <Link href={enroll} className="btn btn-primary w-full">Quero participar</Link>}
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">{closed ? "Avise-me das novas datas" : "WhatsApp de inscrições"}</a>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-bone/45">
                Antes de efetuar o depósito para garantir a sua reserva, confirme com a equipe a disponibilidade de vagas. Inscrições: {site.whatsapp.inscricoes.display}.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {rich && (
        <section className="light bg-bone py-24 text-ink">
          <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
            <h2 className="font-serif text-display-sm">O que dizem nossos alunos</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => <li key={t.name}><TestimonialCard {...t} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-ink py-24 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <h2 className="font-serif text-display-sm lg:col-span-4">Dúvidas sobre a inscrição</h2>
            <div className="lg:col-span-8">
              <FAQ items={[
                { q: "Como garanto minha vaga?", a: "Fale com a equipe pelo WhatsApp de inscrições para confirmar a disponibilidade de vagas antes de efetuar o depósito. Depois, envie a ficha de inscrição." },
                { q: "Haverá prática em pacientes?", a: rich ? "Sim. Este curso inclui atendimento clínico a pacientes na clínica da Odonto Partners, com supervisão dos professores." : "Consulte a equipe sobre o formato prático deste curso." },
                { q: "Existe suporte após o curso?", a: "Sim. A Odonto Partners oferece suporte técnico contínuo pós-curso." },
              ]} />
            </div>
          </div>
          {related.length > 0 && (
            <>
              <h2 className="mt-28 font-serif text-4xl">Outros cursos de {areaLabels[c.area]}</h2>
              <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => <li key={r.slug}><CourseCard course={r} /></li>)}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Barra fixa de inscrição (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-bone/10 bg-ink/90 p-3 pr-20 backdrop-blur-xl lg:hidden">
        {!closed && <Link href={enroll} className="btn btn-primary flex-1 !px-3 !text-[0.68rem] !tracking-[0.1em]">Inscrever-se</Link>}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !px-3 !text-[0.68rem] !tracking-[0.1em]">{closed ? "Avise-me" : "WhatsApp"}</a>
      </div>
    </>
  );
}
