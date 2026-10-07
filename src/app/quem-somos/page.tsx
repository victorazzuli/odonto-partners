import { site } from "@/config/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { Stats } from "@/components/sections/Stats";
import { Narrative } from "@/components/sections/Narrative";
import { Structure } from "@/components/sections/Structure";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMeta({
  title: "Quem Somos",
  description: "Clínica-escola no Brooklin Paulista, fundada em 2011 pelo Dr. Flávio Luposeli e por Ana Carolina Renda. Pioneira em cursos de Harmonização Facial e Especialização, com embasamento científico e prática clínica.",
  path: "/quem-somos",
});

const pillars = [
  { t: "Ensinar corretamente", d: "Alto nível de qualidade e embasamento científico como marca registrada desde a fundação." },
  { t: "Nascida de uma clínica", d: "Entendemos as reais necessidades dos pacientes e transformamos isso em formação — especialmente em odontologia estética." },
  { t: "Profundidade e clareza", d: "Cursos que se destacam pelo cuidado em revelar cada detalhe e técnica essencial." },
  { t: "Prática de alto desempenho", d: "Milhares de alunos reconhecem na Odonto Partners uma escola que transforma conhecimento em prática clínica." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }, { name: "Quem Somos", path: "/quem-somos" }])} />
      <PageHero
        eyebrow="Institucional"
        crumbs={[{ name: "Quem Somos", href: "/quem-somos" }]}
        title={["Uma clínica-escola", <>criada para formar <em>referências.</em></>]}
        intro="Somos uma clínica-escola localizada no Brooklin Paulista, em São Paulo. Nossa proposta, desde o primeiro dia: ser referência no aperfeiçoamento contínuo dos profissionais de Odontologia."
        image="https://odontopartners.com.br/wp-content/uploads/2021/09/GAB5228-scaled.jpg"
      />

      <section className="bg-ink text-bone">
        <div className="mx-auto grid max-w-wide gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 xl:px-12">
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.15]">
              “Um dos diferenciais da Odonto Partners é ter surgido de dentro de uma clínica odontológica.”
            </p>
          </Reveal>
          <Reveal delay={0.15} className="space-y-6 text-[1.05rem] leading-relaxed text-bone/70 lg:col-span-6 lg:col-start-7">
            <p>Fundada pelo cirurgião-dentista e diretor clínico do SPA Odontológico Luposeli, <strong className="text-bone">Dr. Flávio Luposeli</strong>, e por <strong className="text-bone">Ana Carolina Renda</strong>, a Odonto Partners nasceu com uma proposta única: ser referência no <strong className="text-bone">aperfeiçoamento contínuo dos profissionais de Odontologia</strong>.</p>
            <p>Inaugurada em <strong className="text-bone">{site.foundingYear}</strong>, com o <strong className="text-bone">Curso de Habilitação em Toxina Botulínica e Preenchimento</strong>, a Odonto Partners se consolidou como <strong className="text-bone">pioneira em cursos de Harmonização Facial e Especialização</strong>, sempre com a marca registrada de ensinar corretamente, com alto nível de qualidade e embasamento científico.</p>
            <p>Ter surgido de dentro de uma clínica odontológica possibilita entender as reais necessidades dos pacientes e transformar esse conhecimento em formação de excelência. Assim, os alunos aprendem exatamente aquilo que o mercado mais procura, especialmente na área de odontologia estética.</p>
            <p>Nossos cursos se destacam pela profundidade, clareza e pelo cuidado em revelar cada detalhe e técnica essencial. Essa abordagem já conquistou milhares de alunos, que reconhecem na Odonto Partners uma escola que transforma conhecimento em prática clínica de alto desempenho.</p>
            <p>Em <strong className="text-bone">{site.newHeadquartersYear}</strong>, inauguramos nossa nova sede, planejada para oferecer ainda mais qualidade. O espaço conta com área clínica totalmente equipada para atendimentos durante os cursos, além de um setor exclusivo de <strong className="text-bone">triagem de pacientes modelo</strong>. Essa estrutura foi criada para garantir o melhor acolhimento aos alunos de especialização, que atravessam o Brasil, e até fronteiras internacionais, para estudar conosco.</p>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <SectionHeading eyebrow="Linha do tempo" title={["Desde 2011,", <>uma trajetória <em>de pioneirismo.</em></>]} />
          <Timeline />
        </div>
      </section>

      <Narrative />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <SectionHeading eyebrow="Nossos princípios" title={["O que nos guia", <>em cada <em>turma.</em></>]} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.06} className="bg-ink p-8 md:p-12">
                <span className="text-xs tracking-[0.2em] text-bone/35">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-3xl">{p.t}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-bone/60">{p.d}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-bone/45">Resp. Téc.: {site.legal.technicalResponsible} — {site.legal.technicalResponsibleCro} · {site.legal.clinicRegistration}</p>
        </div>
      </section>

      <Structure />
      <CtaBand />
    </>
  );
}
