import Link from "next/link";
import { site, waLink, fullAddress } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { courses } from "@/data/courses";
import { upcoming } from "@/lib/course-status";

export function Footer() {
  const next = upcoming(courses).slice(0, 5);
  const year = new Date().getFullYear();
  const cols = [
    {
      title: "Instituição",
      links: [
        { label: "Quem somos", href: "/quem-somos" },
        { label: "Equipe docente", href: "/equipe" },
        { label: "Galeria", href: "/galeria" },
        { label: "Blog", href: "/blog" },
        { label: "Contato", href: "/contato" },
      ],
    },
    {
      title: "Formação",
      links: [
        { label: "Todos os cursos", href: "/cursos" },
        { label: "Harmonização Orofacial", href: "/cursos/harmonizacao-facial" },
        { label: "Odontologia Clássica", href: "/cursos/odontologia-classica" },
        { label: "Ficha de inscrição", href: "/ficha-de-inscricao" },
        { label: "Área do aluno", href: site.studentArea, external: true },
      ],
    },
    {
      title: "Pacientes",
      links: [
        { label: "Seja paciente modelo", href: "/paciente-modelo" },
        { label: "Procedimentos", href: "/procedimentos" },
        { label: `WhatsApp ${site.whatsapp.pacientes.display}`, href: waLink("pacientes"), external: true },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink text-bone">
      <div className="mx-auto max-w-wide px-5 pb-10 pt-20 md:px-8 md:pt-28 xl:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-bone/60">
              Clínica-escola no Brooklin, em São Paulo. Desde {site.foundingYear}, referência no aperfeiçoamento contínuo de profissionais em Harmonização Orofacial e Odontologia Clássica — com ciência, prática clínica supervisionada e professores com currículo internacional.
            </p>
            <div className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
              <a href={waLink("cursos")} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-bone/10 p-5 transition hover:border-bone/30">
                <span className="eyebrow">Cursos · WhatsApp</span>
                <span className="mt-3 block font-serif text-2xl">{site.whatsapp.cursos.display}</span>
              </a>
              <a href={waLink("pacientes")} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-bone/10 p-5 transition hover:border-bone/30">
                <span className="eyebrow">Central de pacientes</span>
                <span className="mt-3 block font-serif text-2xl">{site.whatsapp.pacientes.display}</span>
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="eyebrow">{c.title}</h2>
                <ul className="mt-6 space-y-3 text-[0.92rem]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline text-bone/75 hover:text-bone">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="link-underline text-bone/75 hover:text-bone">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {next.length > 0 && (
              <div className="sm:col-span-3">
                <h2 className="eyebrow">Próximas turmas</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {next.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/curso/${c.slug}`} className="chip border-bone/15 text-bone/70 hover:border-bone/50 hover:text-bone">{c.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="rule-metal mt-20" />

        <div className="grid gap-8 py-10 text-sm text-bone/55 md:grid-cols-3">
          <address className="not-italic leading-relaxed">
            <span className="eyebrow mb-3 block">Endereço</span>
            {fullAddress}
            <br />
            {site.contact.hours}
            <br />
            <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-bone">{site.contact.email}</a>
          </address>
          <div className="leading-relaxed">
            <span className="eyebrow mb-3 block">Responsabilidade técnica</span>
            Resp. Téc.: {site.legal.technicalResponsible} — {site.legal.technicalResponsibleCro}
            <br />
            {site.legal.clinicRegistration}
          </div>
          <div>
            <span className="eyebrow mb-3 block">Redes</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><a className="link-underline hover:text-bone" href={site.social.instagram.url} target="_blank" rel="noopener noreferrer">Instagram {site.social.instagram.handle}</a></li>
              <li><a className="link-underline hover:text-bone" href={site.social.youtube.url} target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a className="link-underline hover:text-bone" href={site.social.facebook.url} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-bone/10 pt-8 text-xs text-bone/40 md:flex-row">
          <p>© {year} {site.legalName}. Todos os direitos reservados.</p>
          <ul className="flex flex-wrap gap-6">
            <li><Link href="/politica-de-privacidade" className="hover:text-bone">Política de privacidade e cookies</Link></li>
            <li><button type="button" data-open-cookie-preferences className="hover:text-bone">Preferências de cookies</button></li>
          </ul>
        </div>
      </div>

      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap px-4 pb-4 text-center font-serif text-[18vw] leading-[0.8] text-bone/[0.035]">
        Odonto Partners
      </p>
    </footer>
  );
}
