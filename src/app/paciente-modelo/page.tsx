import Link from "next/link";
import { site, waLink, fullAddress } from "@/config/site";
import { procedures, faqPatients } from "@/data/content";
import { pageMeta, breadcrumbLd, faqLd, clinicId } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcedureExplorer } from "@/components/sections/ProcedureExplorer";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMeta({
  title: "Seja Paciente Modelo",
  description: "Seja paciente modelo na clínica-escola Odonto Partners, no Brooklin (SP): Harmonização Orofacial, restaurações estéticas, clareamento, cirurgias gengivais e mais, com supervisão de professores e taxas mínimas.",
  path: "/paciente-modelo",
});

const steps = [
  { t: "Fale com a Central de Pacientes", d: `Envie uma mensagem pelo WhatsApp ${site.whatsapp.pacientes.display} contando qual procedimento deseja.` },
  { t: "Agende sua avaliação", d: "A triagem de pacientes acontece todas as semanas. Antes de vir, confirme o melhor horário com a equipe." },
  { t: "Passe pela triagem", d: "Nosso setor exclusivo de triagem de pacientes modelo avalia o seu caso." },
  { t: "Seja atendido(a) com supervisão", d: "O procedimento é realizado por um dentista já formado, em aperfeiçoamento, sempre com a supervisão de um professor." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Paciente Modelo", path: "/paciente-modelo" }]),
        faqLd(faqPatients),
        { "@context": "https://schema.org", "@type": "MedicalWebPage", about: { "@id": clinicId }, name: "Seja Paciente Modelo — Odonto Partners", specialty: "Dentistry",
          mainEntity: { "@type": "OfferCatalog", name: "Procedimentos para pacientes modelo", itemListElement: [...procedures.classica, ...procedures.hof].map((p) => ({ "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: p } })) } },
      ]} />

      <PageHero
        eyebrow="Para pacientes"
        crumbs={[{ name: "Paciente Modelo", href: "/paciente-modelo" }]}
        title={["Seja paciente", <><em>modelo.</em></>]}
        intro={<>Atendimento em Harmonização Orofacial, restaurações estéticas em resina, cirurgias gengivais, bruxismo e periodontia — com <strong className="text-bone">taxas mínimas</strong> e <strong className="text-bone">supervisão de professores</strong>, na nossa clínica-escola no Brooklin.</>}
        image="https://odontopartners.com.br/wp-content/uploads/2021/10/DSC05144.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <MagneticButton href={waLink("pacientes")} external>Quero ser paciente modelo</MagneticButton>
          <MagneticButton href="#procedimentos" variant="ghost" arrow={false}>Ver procedimentos</MagneticButton>
        </div>
      </PageHero>

      {/* O QUE É */}
      <section className="light bg-bone text-ink">
        <div className="mx-auto grid max-w-wide gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="O que é" title={["Tratamento de qualidade,", <>com quem está se <em>aperfeiçoando.</em></>]} />
          </div>
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink/75 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <Reveal><p>Somos uma clínica-escola localizada no Brooklin Paulista, em São Paulo ({site.address.street}). Em nossa clínica atendemos diariamente pacientes modelo para a realização de diversos procedimentos.</p></Reveal>
            <Reveal delay={0.05}><p>Os procedimentos são realizados <strong className="text-ink">com a supervisão de um professor</strong>, por <strong className="text-ink">dentistas já formados</strong> que estão fazendo o aperfeiçoamento em uma nova técnica ou curso de Especialização em nossa escola.</p></Reveal>
            <Reveal delay={0.1}><p>Os pacientes pagam <strong className="text-ink">taxas mínimas</strong> e, em alguns casos, os custos dos materiais.</p></Reveal>
            <Reveal delay={0.15}>
              <ul className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
                {[["Quem atende", "Dentistas já formados, em aperfeiçoamento"], ["Supervisão", "Professores da Odonto Partners"], ["Investimento", "Taxas mínimas e, em alguns casos, materiais"]].map(([k, v]) => (
                  <li key={k} className="bg-bone p-6"><span className="eyebrow !text-graphite">{k}</span><span className="mt-3 block font-serif text-xl leading-snug text-ink">{v}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <SectionHeading eyebrow="Como funciona" title={["Quatro passos", <>até o seu <em>atendimento.</em></>]} />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="bg-ink p-8 md:p-10">
                <span className="font-serif text-6xl text-metal">0{i + 1}</span>
                <h3 className="mt-8 text-lg font-semibold">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-bone/60">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 grid gap-6 rounded-3xl border border-bone/10 bg-ink-800 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="eyebrow">Contato da triagem · Central de Pacientes</p>
              <p className="mt-4 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-none">{site.whatsapp.pacientes.display}</p>
              <p className="mt-4 text-sm text-bone/55">{fullAddress} · {site.contact.hoursShort}</p>
            </div>
            <MagneticButton href={waLink("pacientes")} external>Agendar avaliação</MagneticButton>
          </div>
        </div>
      </section>

      {/* PROCEDIMENTOS */}
      <section id="procedimentos" className="light scroll-mt-24 bg-bone text-ink">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <SectionHeading eyebrow="Procedimentos disponíveis" title={[`${procedures.classica.length + procedures.hof.length} procedimentos`, <>em duas <em>especialidades.</em></>]} intro="Toque em um procedimento para falar diretamente com a Central de Pacientes." />
          <div className="mt-14"><ProcedureExplorer light /></div>
          <p className="mt-10 text-sm text-ink/55">Os pacientes modelo contam com atendimento em Harmonização Orofacial, remodelação dos dentes com resina, cirurgias gengivais e, em breve, novos procedimentos odontológicos.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="mx-auto grid max-w-wide gap-12 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="mt-6 font-serif text-display-sm">Estamos ansiosos para receber você aqui.</h2>
            <div className="mt-8"><MagneticButton href={waLink("pacientes")} external>Quero ser paciente modelo</MagneticButton></div>
          </div>
          <div className="lg:col-span-8"><FAQ items={faqPatients} /></div>
        </div>
      </section>

      <section className="border-t border-bone/10 bg-ink py-16 text-bone">
        <div className="mx-auto flex max-w-wide flex-col justify-between gap-6 px-5 md:flex-row md:items-center md:px-8 xl:px-12">
          <p className="max-w-2xl text-bone/70">É dentista e quer conhecer a nossa escola? Agende a sua visita.</p>
          <a href={waLink("cursos", "Olá! Sou dentista e gostaria de agendar uma visita à escola.")} target="_blank" rel="noopener noreferrer" className="link-underline text-sm uppercase tracking-[0.18em]">Agendar visita →</a>
        </div>
        <p className="mx-auto mt-10 max-w-wide px-5 text-xs text-bone/40 md:px-8 xl:px-12">Resp. Téc.: {site.legal.technicalResponsible} — {site.legal.technicalResponsibleCro} | {site.legal.clinicRegistration}. <Link href="/procedimentos" className="underline">Lista completa de procedimentos</Link>.</p>
      </section>
    </>
  );
}
