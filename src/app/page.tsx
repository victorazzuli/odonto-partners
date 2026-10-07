import Link from "next/link";
import { site, waLink } from "@/config/site";
import { courses } from "@/data/courses";
import { professors } from "@/data/professors";
import { posts, procedures } from "@/data/content";
import { upcoming, sortCatalog } from "@/lib/course-status";
import { pageMeta } from "@/lib/seo";
import { VideoHero } from "@/components/sections/VideoHero";
import { Stats } from "@/components/sections/Stats";
import { Narrative } from "@/components/sections/Narrative";
import { Timeline } from "@/components/sections/Timeline";
import { Practice } from "@/components/sections/Practice";
import { Structure } from "@/components/sections/Structure";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProfessorsSpotlight } from "@/components/sections/Professors";
import { BlogCard } from "@/components/sections/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedCourse } from "@/components/courses/FeaturedCourse";
import { CourseCard } from "@/components/courses/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata = pageMeta({
  description:
    "Clínica-escola de referência em Harmonização Orofacial e Odontologia Clássica no Brooklin, São Paulo. Desde 2011, mais de 20.000 alunos, prática clínica com pacientes e professores com currículo internacional.",
  path: "/",
});

export default function Home() {
  const next = upcoming(courses);
  const featured = next[0];
  const hof = sortCatalog(courses.filter((c) => c.area === "hof")).slice(0, 4);
  const lead = professors[0];
  const years = new Date().getFullYear() - site.foundingYear;

  return (
    <>
      <VideoHero nextCourse={featured} />

      {/* ───── UMA HISTÓRIA DE EXCELÊNCIA ───── */}
      <section className="bg-ink text-bone" aria-labelledby="historia">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-36 xl:px-12">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4"><span className="h-px w-10 bg-bone/30" aria-hidden /><p className="eyebrow">Uma história de excelência</p></Reveal>
              <h2 id="historia" className="mt-7 font-serif text-display-md">
                <RevealLines lines={["Mais de uma década", <>transformando conhecimento <em className="text-metal">em prática.</em></>]} />
              </h2>
            </div>
            <Reveal delay={0.2} className="space-y-5 text-[1.02rem] leading-relaxed text-bone/70 lg:col-span-5 lg:pt-14">
              <p>
                Fundada pelo cirurgião-dentista e diretor clínico do SPA Odontológico Luposeli, <strong className="font-semibold text-bone">Dr. Flávio Luposeli</strong>, e por <strong className="font-semibold text-bone">Ana Carolina Renda</strong>, a Odonto Partners nasceu com uma proposta única: ser referência no aperfeiçoamento contínuo dos profissionais de Odontologia.
              </p>
              <p>
                Inaugurada em {site.foundingYear}, com o Curso de Habilitação em Toxina Botulínica e Preenchimento, consolidou-se como pioneira em cursos de Harmonização Facial e Especialização — sempre com a marca registrada de ensinar corretamente, com alto nível de qualidade e embasamento científico.
              </p>
              <Link href="/quem-somos" className="link-underline inline-block pt-2 text-sm uppercase tracking-[0.18em] text-bone">Nossa história completa →</Link>
            </Reveal>
          </div>
          <Timeline />
        </div>
      </section>

      <Stats />
      <Narrative />
      <Practice />

      {/* ───── ÁREAS DE FORMAÇÃO ───── */}
      <section className="bg-ink text-bone" aria-labelledby="areas">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <SectionHeading
            id="areas"
            eyebrow="Cursos"
            title={["Duas escolas.", <>Um mesmo <em>padrão de excelência.</em></>]}
            intro="Com conteúdo de alta qualidade e temas abordados com clareza e profundidade, os cursos da Odonto Partners foram desenvolvidos para aprimorar suas habilidades, ampliar suas oportunidades de atuação e elevar os resultados entregues aos seus pacientes."
          />
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            {[
              { href: "/cursos/harmonizacao-facial", title: "Harmonização Orofacial", n: courses.filter((c) => c.area === "hof").length, img: courses.find((c) => c.slug === "residencia-clinica-avancada-em-hof")!.image, text: "Da imersão Step One à Especialização, Residências, Masters e programas internacionais." },
              { href: "/cursos/odontologia-classica", title: "Odontologia Clássica", n: courses.filter((c) => c.area === "classica").length, img: courses.find((c) => c.slug === "lentes-de-contato-e-laminados-ceramicos")!.image, text: "Lentes de contato, laminados cerâmicos, restaurações estéticas e dor orofacial." },
            ].map((a, i) => (
              <Reveal key={a.href} delay={i * 0.1}>
                <Link href={a.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-700 sm:aspect-[16/11]">
                  <SmartImage src={a.img} alt={a.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-70 grayscale transition duration-[1.6s] ease-luxe group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-10">
                    <div>
                      <p className="eyebrow">{a.n} cursos no catálogo</p>
                      <h3 className="mt-4 font-serif text-[clamp(2.2rem,4.5vw,4rem)] leading-none">{a.title}</h3>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/65">{a.text}</p>
                    </div>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-bone/30 transition duration-500 group-hover:bg-bone group-hover:text-ink" aria-hidden>→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 flex items-end justify-between gap-6">
            <h3 className="font-serif text-3xl md:text-5xl">Em destaque na Harmonização</h3>
            <Link href="/cursos" className="link-underline hidden shrink-0 text-sm uppercase tracking-[0.18em] text-bone/70 hover:text-bone sm:block">Catálogo completo →</Link>
          </div>
          <ul className="no-scrollbar -mx-5 mt-10 flex snap-x gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
            {hof.map((c) => (
              <li key={c.slug} className="w-[78vw] shrink-0 snap-start sm:w-[48vw] md:w-auto">
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
          <div className="mt-12 sm:hidden"><MagneticButton href="/cursos">Quero conhecer os cursos</MagneticButton></div>
        </div>
      </section>

      {featured && <FeaturedCourse course={featured} others={next.slice(1, 5)} />}

      {/* ───── PROFESSORES ───── */}
      <section className="border-t border-bone/10 bg-ink text-bone" aria-labelledby="professores">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-36 xl:px-12">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading id="professores" eyebrow="Corpo docente" title={["Aprenda com quem", <><em>vive a prática.</em></>]} intro={`${professors.length} professores e especialistas — anatomistas, cirurgiões, pesquisadores e especialistas em HOF com formação no Brasil e no exterior.`} />
            <MagneticButton href="/equipe" variant="ghost">Conheça a equipe</MagneticButton>
          </div>
          <ProfessorsSpotlight lead={lead} rest={professors.filter((p) => ["rachel-rocha", "daiana-scherer", "tania-de-carvalho-rocha", "eduardo-cottechia-ribeiro"].includes(p.slug))} />
        </div>
      </section>

      <Structure />

      {/* ───── PACIENTE MODELO ───── */}
      <section className="light relative overflow-hidden bg-bone text-ink" aria-labelledby="paciente">
        <div className="mx-auto grid max-w-wide gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-graphite">Para pacientes</p>
            <h2 id="paciente" className="mt-6 font-serif text-display-md">
              <RevealLines lines={["Seja paciente", <><em>modelo.</em></>]} />
            </h2>
            <Reveal delay={0.2} className="mt-8 max-w-lg space-y-4 leading-relaxed text-ink/70">
              <p>Na nossa clínica-escola, os procedimentos são realizados por <strong className="text-ink">dentistas já formados</strong> que estão se aperfeiçoando em uma nova técnica ou em um curso de Especialização — <strong className="text-ink">sempre com a supervisão de um professor</strong>.</p>
              <p>Os pacientes pagam taxas mínimas e, em alguns casos, os custos dos materiais. A triagem acontece todas as semanas.</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href={waLink("pacientes")} external variant="dark">Quero ser paciente modelo</MagneticButton>
              <MagneticButton href="/paciente-modelo" variant="ghost" arrow={false}>Como funciona</MagneticButton>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10">
              {[
                ["Odontologia Clássica", procedures.classica.length],
                ["Harmonização Orofacial", procedures.hof.length],
              ].map(([t, n]) => (
                <div key={t as string} className="bg-bone p-7 md:p-10">
                  <p className="font-serif text-6xl md:text-7xl">{n}</p>
                  <p className="mt-3 text-sm text-ink/60">procedimentos em {t}</p>
                </div>
              ))}
            </Reveal>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Clareamento Dental", "Restaurações em Resina", "Laminados Cerâmicos", "Plástica Gengival", "Toxina Botulínica (Botox)", "Preenchimento de Lábio", "Bioestimulador Sculptra", "Ultrassom Microfocado", "Bichectomia", "Laser CO2"].map((p) => (
                <li key={p} className="chip border-ink/15 text-ink/70">{p}</li>
              ))}
              <li><Link href="/procedimentos" className="chip border-ink bg-ink text-bone">Ver todos →</Link></li>
            </ul>
            <p className="mt-6 text-xs text-ink/50">Central de Pacientes · WhatsApp {site.whatsapp.pacientes.display} · Resp. Téc.: {site.legal.technicalResponsible} — {site.legal.technicalResponsibleCro}</p>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ───── BLOG ───── */}
      <section className="bg-ink text-bone" aria-labelledby="blog-home">
        <div className="mx-auto max-w-wide px-5 py-24 md:px-8 md:py-32 xl:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading id="blog-home" eyebrow="Blog" title={["Conhecimento que continua", <>depois da <em>sala de aula.</em></>]} />
            <MagneticButton href="/blog" variant="ghost">Acessar o blog</MagneticButton>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2"><BlogCard post={posts[0]} large /></div>
            <div className="grid gap-4">
              <BlogCard post={posts[1]} />
              <BlogCard post={posts[2]} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={[`${years} anos formando`, "profissionais de referência."]}
        primary={{ label: "Quero me inscrever", href: "/ficha-de-inscricao" }}
        secondary={{ label: "Fale com nossa equipe", href: waLink("cursos"), external: true }}
      />
    </>
  );
}
