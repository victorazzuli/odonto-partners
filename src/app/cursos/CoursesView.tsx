import { Suspense } from "react";
import { courses } from "@/data/courses";
import { upcoming } from "@/lib/course-status";
import { PageHero } from "@/components/sections/PageHero";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { FeaturedCourse } from "@/components/courses/FeaturedCourse";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqStudents } from "@/data/content";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { site } from "@/config/site";

export function CoursesView({
  area, eyebrow, title, intro, path, crumb,
}: {
  area?: "hof" | "classica";
  eyebrow: string;
  title: React.ReactNode[];
  intro: string;
  path: string;
  crumb: { name: string; href: string }[];
}) {
  const list = area ? courses.filter((c) => c.area === area) : courses;
  const next = upcoming(list);
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: "Início", path: "/" }, ...crumb.map((c) => ({ name: c.name, path: c.href }))]),
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: list.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/curso/${c.slug}`, name: c.title })) },
        faqLd(faqStudents),
      ]} />
      <PageHero eyebrow={eyebrow} crumbs={crumb} title={title} intro={intro}>
        <p className="text-sm text-bone/50">
          Antes de efetuar o depósito para garantir a sua reserva, entre em contato para confirmar a disponibilidade de vagas.
        </p>
      </PageHero>

      <section className="bg-ink pb-24 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
          <Suspense fallback={<div className="h-40" />}>
            <CourseCatalog courses={courses} lockArea={area} />
          </Suspense>
        </div>
      </section>

      {next[0] && <FeaturedCourse course={next[0]} others={next.slice(1, 5)} />}

      <section className="border-t border-bone/10 bg-ink py-24 text-bone md:py-32">
        <div className="mx-auto grid max-w-wide gap-12 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 className="mt-6 font-serif text-display-sm">Antes de escolher o seu curso.</h2>
          </div>
          <div className="lg:col-span-8"><FAQ items={faqStudents} /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
