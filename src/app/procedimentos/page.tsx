import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { waLink } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProcedureExplorer } from "@/components/sections/ProcedureExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata = pageMeta({
  title: "Procedimentos para Pacientes",
  description: "Procedimentos disponíveis para pacientes modelo na Odonto Partners: limpeza, clareamento, restaurações, laminados, plástica gengival, toxina botulínica, preenchimentos, bioestimuladores, fios, laser e mais.",
  path: "/procedimentos",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }, { name: "Paciente Modelo", path: "/paciente-modelo" }, { name: "Procedimentos", path: "/procedimentos" }])} />
      <PageHero
        eyebrow="Procedimentos"
        crumbs={[{ name: "Paciente Modelo", href: "/paciente-modelo" }, { name: "Procedimentos", href: "/procedimentos" }]}
        title={["Odontologia Clássica", <>e Harmonização <em>Orofacial.</em></>]}
        intro="Todos os procedimentos disponíveis para pacientes modelo, realizados por dentistas em aperfeiçoamento com a supervisão de professores."
      >
        <MagneticButton href={waLink("pacientes")} external>Falar com a Central de Pacientes</MagneticButton>
      </PageHero>
      <section className="bg-ink pb-28 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12"><ProcedureExplorer /></div>
      </section>
      <CtaBand
        eyebrow="Paciente modelo"
        title={["Quer saber se o seu caso", "pode ser atendido?"]}
        text="A Central de Pacientes orienta sobre a avaliação, as datas dos cursos e os valores de cada procedimento."
        primary={{ label: "Quero ser paciente modelo", href: waLink("pacientes"), external: true }}
        secondary={{ label: "Como funciona", href: "/paciente-modelo" }}
      />
    </>
  );
}
