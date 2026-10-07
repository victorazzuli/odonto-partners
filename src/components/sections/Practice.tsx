import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal, ImageReveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

const WP = "https://odontopartners.com.br/wp-content/uploads";

const pillars = [
  { n: "Professor", t: "Live show do planejamento à execução, passo a passo, conduzido por professores com currículo internacional." },
  { n: "Aluno", t: "Dentistas já formados que vêm de todo o Brasil — e do exterior — para aprimorar uma nova técnica." },
  { n: "Paciente real", t: "Atendimento clínico a pacientes modelo, triados toda semana pelo setor exclusivo da clínica." },
  { n: "Estrutura clínica", t: "Sede própria inaugurada em 2020, com área clínica totalmente equipada para os cursos." },
];

export function Practice() {
  return (
    <section className="relative bg-ink text-bone" aria-labelledby="pratica">
      <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-36 xl:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="pratica"
              eyebrow="Aqui você não aprende apenas teoria"
              title={["Conhecimento ganha", <>valor quando <em>vira prática.</em></>]}
              intro="Um dos diferenciais da Odonto Partners é ter surgido de dentro de uma clínica odontológica. Isso nos permite entender as reais necessidades dos pacientes e transformar esse conhecimento em formação de excelência — os alunos aprendem exatamente aquilo que o mercado mais procura."
            />
            <Reveal delay={0.3} className="mt-10">
              <MagneticButton href="/paciente-modelo" variant="ghost">Conheça a clínica-escola</MagneticButton>
            </Reveal>
          </div>

          <div className="grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-3 lg:col-span-6" style={{ aspectRatio: "1 / 1.05" }}>
            <ImageReveal className="relative col-span-4 row-span-4 overflow-hidden rounded-2xl">
              <SmartImage src={`${WP}/2021/10/DSC05144.jpg`} alt="Atendimento clínico durante curso na Odonto Partners" fill sizes="(min-width:1024px) 33vw, 66vw" className="object-cover" label="Clínica" />
            </ImageReveal>
            <ImageReveal className="relative col-span-2 row-span-3 overflow-hidden rounded-2xl">
              <SmartImage src={`${WP}/2021/10/DSC05106.jpg`} alt="Professor demonstrando técnica aos alunos" fill sizes="20vw" className="object-cover" label="Professor" />
            </ImageReveal>
            <ImageReveal className="relative col-span-2 row-span-3 overflow-hidden rounded-2xl">
              <SmartImage src={`${WP}/2021/10/DSC05198.jpg`} alt="Alunos em aula prática" fill sizes="20vw" className="object-cover" label="Alunos" />
            </ImageReveal>
            <ImageReveal className="relative col-span-4 row-span-2 overflow-hidden rounded-2xl">
              <SmartImage src={`${WP}/2021/10/DSC05142.jpg`} alt="Estrutura clínica da Odonto Partners" fill sizes="(min-width:1024px) 33vw, 66vw" className="object-cover" label="Estrutura" />
            </ImageReveal>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.08} className="bg-ink p-8">
              <p className="flex items-center gap-3 font-serif text-3xl">
                {i > 0 && <span className="text-bone/25" aria-hidden>+</span>}
                {p.n}
              </p>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-bone/60">{p.t}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
