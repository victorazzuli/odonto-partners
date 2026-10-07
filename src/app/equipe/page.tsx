import { professors } from "@/data/professors";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProfessorCard } from "@/components/sections/Professors";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Equipe Docente",
  description: "Conheça os professores da Odonto Partners: anatomistas da Escola Paulista de Medicina, cirurgiões, pesquisadores e especialistas em Harmonização Orofacial com formação no Brasil e no exterior.",
  path: "/equipe",
});

export default function Page() {
  const groups = [
    { title: "Direção científica", list: professors.filter((p) => p.group === "direcao") },
    { title: "Corpo docente", list: professors.filter((p) => p.group === "docente") },
    { title: "Gestão e carreira", list: professors.filter((p) => p.group === "gestao") },
  ];
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }]),
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: professors.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Person", name: p.name, jobTitle: p.role, url: `https://odontopartners.com.br/equipe/${p.slug}` } })) },
      ]} />
      <PageHero
        eyebrow="Equipe"
        crumbs={[{ name: "Equipe", href: "/equipe" }]}
        title={["Aprenda com quem", <><em>vive a prática.</em></>]}
        intro="Professores com currículo internacional — da anatomia da Escola Paulista de Medicina às residências no M.A.R.C. (Miami) e na American Society of Anatomy."
      />
      <section className="bg-ink pb-24 text-bone md:pb-32">
        <div className="mx-auto max-w-wide space-y-24 px-5 md:px-8 xl:px-12">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="flex items-baseline justify-between border-b border-bone/10 pb-6">
                <h2 className="font-serif text-3xl md:text-4xl">{g.title}</h2>
                <span className="text-xs tracking-[0.2em] text-bone/40">{String(g.list.length).padStart(2, "0")}</span>
              </div>
              <div className="mt-10 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {g.list.map((p, i) => <ProfessorCard key={p.slug} p={p} index={i} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title={["Aprenda com esta equipe", "na sua próxima turma."]} primary={{ label: "Ver cursos", href: "/cursos" }} />
    </>
  );
}
