import { Suspense } from "react";
import { site, waLink } from "@/config/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { EnrollmentForm } from "@/components/forms/EnrollmentForm";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Ficha de Inscrição",
  description: "Faça a sua pré-inscrição nos cursos da Odonto Partners. Nossa equipe confirma a disponibilidade de vagas e as condições antes de qualquer pagamento.",
  path: "/ficha-de-inscricao",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }, { name: "Ficha de Inscrição", path: "/ficha-de-inscricao" }])} />
      <PageHero
        eyebrow="Ficha de inscrição"
        crumbs={[{ name: "Ficha de Inscrição", href: "/ficha-de-inscricao" }]}
        title={["Garanta o seu lugar", <>na <em>próxima turma.</em></>]}
        intro="Preencha a pré-inscrição em menos de 2 minutos. Em seguida, nossa equipe confirma a disponibilidade de vagas e as condições de pagamento."
      />
      <section className="bg-ink pb-28 text-bone">
        <div className="mx-auto grid max-w-wide gap-16 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <aside className="lg:col-span-4">
            <ol className="space-y-8 border-l border-bone/15 pl-8">
              {[
                ["Pré-inscrição", "Você escolhe o curso e envia seus dados."],
                ["Confirmação de vaga", "Nossa equipe confirma vagas e condições."],
                ["Reserva", "Somente após a confirmação, efetue o depósito da reserva."],
                ["Boas-vindas", "Você recebe as orientações e acesso à Área do Aluno."],
              ].map(([t, d], i) => (
                <li key={t} className="relative">
                  <span className="absolute -left-[2.35rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-bone text-[0.6rem] font-bold text-ink">{i + 1}</span>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-bone/55">{d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-3xl border border-bone/10 p-7">
              <p className="eyebrow">Prefere falar agora?</p>
              <a href={waLink("inscricoes")} target="_blank" rel="noopener noreferrer" className="mt-4 block font-serif text-3xl">{site.whatsapp.inscricoes.display}</a>
              <p className="mt-2 text-sm text-bone/50">WhatsApp de inscrições · {site.contact.hoursShort}</p>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-96" />}><EnrollmentForm /></Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
