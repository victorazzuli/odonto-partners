import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "@/data/content";
import { courses } from "@/data/courses";
import { upcoming } from "@/lib/course-status";
import { pageMeta, articleLd, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { RevealLines } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/sections/BlogCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { ...pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}` }), openGraph: { type: "article", title: p.title, description: p.excerpt } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug && x.category === p.category).concat(posts.filter((x) => x.slug !== p.slug && x.category !== p.category)).slice(0, 3);
  const course = upcoming(courses)[0];

  return (
    <>
      <JsonLd data={[articleLd(p), breadcrumbLd([{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }])]} />
      <article className="bg-ink pb-24 pt-36 text-bone md:pt-48">
        <header className="mx-auto max-w-4xl px-5 md:px-8">
          <nav aria-label="Trilha de navegação" className="text-xs uppercase tracking-[0.16em] text-bone/45">
            <Link href="/blog" className="hover:text-bone">Blog</Link> / <span className="text-bone/75">{p.category}</span>
          </nav>
          <h1 className="mt-10 font-serif text-display-md"><RevealLines lines={[p.title]} /></h1>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-bone/50">
            <span>{p.author ?? "Odonto Partners"}</span>
            {p.date && <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("pt-BR")}</time>}
          </p>
          <div className="rule-metal mt-10" />
        </header>
        <div className="mx-auto mt-12 max-w-[42rem] px-5 text-[1.15rem] leading-[1.8] text-bone/80 md:px-0">
          <p className="font-serif text-[1.6rem] leading-snug text-bone">{p.excerpt}</p>
          {p.body ? (
            p.body.map((para) => <p key={para.slice(0, 24)} className="mt-6">{para}</p>)
          ) : (
            <div className="mt-10 rounded-3xl border border-bone/10 bg-ink-800 p-8">
              {/* ⚠ PLACEHOLDER: migrar o texto integral do WordPress para `body` em src/data/content.ts */}
              <p className="text-base text-bone/65">O artigo completo está disponível no acervo original da Odonto Partners.</p>
              <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">Ler o artigo completo</a>
            </div>
          )}
        </div>
      </article>
      {course && (
        <section className="border-t border-bone/10 bg-ink py-20 text-bone">
          <div className="mx-auto grid max-w-wide gap-10 px-5 md:px-8 lg:grid-cols-12 lg:items-center xl:px-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Leve para a prática</p>
              <h2 className="mt-5 font-serif text-display-sm">O conhecimento ganha valor quando vira prática.</h2>
              <div className="mt-8"><MagneticButton href="/cursos">Ver cursos</MagneticButton></div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9"><CourseCard course={course} /></div>
          </div>
        </section>
      )}
      <section className="bg-ink pb-24 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
          <h2 className="font-serif text-4xl">Continue lendo</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{more.map((m) => <BlogCard key={m.slug} post={m} />)}</div>
        </div>
      </section>
    </>
  );
}
