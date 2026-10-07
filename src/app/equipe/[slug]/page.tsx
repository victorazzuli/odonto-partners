import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { professors, getProfessor } from "@/data/professors";
import { courses } from "@/data/courses";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { CourseCard } from "@/components/courses/CourseCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return professors.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProfessor((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} — Professor(a)`, description: `${p.name}${p.cro ? ` (${p.cro})` : ""}: ${p.credentials.slice(0, 3).join("; ")}.`, path: `/equipe/${p.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProfessor((await params).slug);
  if (!p) notFound();
  const teaches = courses.filter((c) => c.professors?.includes(p.slug));
  const idx = professors.findIndex((x) => x.slug === p.slug);
  const next = professors[(idx + 1) % professors.length];

  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }, { name: p.name, path: `/equipe/${p.slug}` }]),
        { "@context": "https://schema.org", "@type": "Person", name: p.name, jobTitle: p.role, image: p.photo, worksFor: { "@type": "EducationalOrganization", name: site.name, url: site.url }, description: p.credentials.join(". ") },
      ]} />
      <section className="bg-ink pb-20 pt-32 text-bone md:pt-44">
        <div className="mx-auto grid max-w-wide gap-12 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-700">
                <SmartImage src={p.photo} alt={`Foto de ${p.name}`} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" label={p.name} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <nav aria-label="Trilha de navegação" className="text-xs uppercase tracking-[0.16em] text-bone/45">
              <Link href="/" className="hover:text-bone">Início</Link> / <Link href="/equipe" className="hover:text-bone">Equipe</Link> / <span className="text-bone/75">{p.name}</span>
            </nav>
            <p className="eyebrow mt-10">{p.role}</p>
            <h1 className="mt-5 font-serif text-display-md"><RevealLines lines={[p.name]} /></h1>
            {p.cro && <p className="mt-4 text-sm uppercase tracking-[0.18em] text-bone/45">{p.cro}</p>}

            <h2 className="eyebrow mt-14">Formação e credenciais</h2>
            <ul className="mt-6 border-t border-bone/10">
              {p.credentials.map((c, i) => (
                <Reveal as="li" key={c} delay={Math.min(i * 0.03, 0.3)} className="flex gap-6 border-b border-bone/10 py-4 text-[1rem] leading-relaxed text-bone/80">
                  <span className="pt-1 text-xs tracking-[0.2em] text-bone/30">{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-xs text-bone/40">Informações conforme publicadas pela Odonto Partners.</p>

            <div className="mt-12 flex flex-wrap gap-3">
              <MagneticButton href="/cursos">Ver cursos</MagneticButton>
              <MagneticButton href={`/equipe/${next.slug}`} variant="ghost">Próximo: {next.name}</MagneticButton>
            </div>
          </div>
        </div>
      </section>
      {teaches.length > 0 && (
        <section className="border-t border-bone/10 bg-ink py-20 text-bone">
          <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
            <h2 className="font-serif text-4xl">Cursos com {p.name.split(" ").slice(0, 2).join(" ")}</h2>
            <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {teaches.map((c) => <li key={c.slug}><CourseCard course={c} /></li>)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
