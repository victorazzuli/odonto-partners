import { site, waLink, fullAddress } from "@/config/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMeta({
  title: "Contato",
  description: `Fale com a Odonto Partners: WhatsApp de cursos ${site.whatsapp.cursos.display}, Central de Pacientes ${site.whatsapp.pacientes.display}, ${site.contact.email}. ${fullAddress}.`,
  path: "/contato",
});

export default function Page() {
  const channels = [
    { k: "Cursos · WhatsApp", v: site.whatsapp.cursos.display, href: waLink("cursos"), ext: true },
    { k: "Inscrições · WhatsApp", v: site.whatsapp.inscricoes.display, href: waLink("inscricoes"), ext: true },
    { k: "Central de Pacientes", v: site.whatsapp.pacientes.display, href: waLink("pacientes"), ext: true },
    { k: "E-mail", v: site.contact.email, href: `mailto:${site.contact.email}` },
    { k: "Instagram", v: site.social.instagram.handle, href: site.social.instagram.url, ext: true },
    { k: "Horário", v: site.contact.hours },
  ];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }])} />
      <PageHero
        eyebrow="Fale conosco"
        crumbs={[{ name: "Contato", href: "/contato" }]}
        title={["Nossa equipe", <>está à sua <em>disposição.</em></>]}
        intro="Entre em contato e esclareça as suas dúvidas. Antes de efetuar o depósito para garantir a sua reserva em um curso, fale conosco para saber se ainda existem vagas disponíveis."
      />

      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 sm:grid-cols-2 xl:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.k} delay={i * 0.05} className="bg-ink">
                {c.href ? (
                  <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex h-full flex-col justify-between gap-6 p-7 transition hover:bg-ink-800 md:p-9">
                    <span className="eyebrow">{c.k}</span>
                    <span className="break-words font-serif text-[1.9rem] leading-tight">{c.v}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-bone/40 transition group-hover:text-bone">Abrir →</span>
                  </a>
                ) : (
                  <div className="flex h-full flex-col justify-between gap-6 p-7 md:p-9">
                    <span className="eyebrow">{c.k}</span>
                    <span className="font-serif text-[1.9rem] leading-tight">{c.v}</span>
                  </div>
                )}
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-bone/50">Outros telefones: {site.contact.phones.map((p) => p.display).join(" · ")}</p>
        </div>
      </section>

      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="mx-auto grid max-w-wide gap-16 px-5 md:px-8 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Formulário</p>
            <h2 className="mt-6 font-serif text-display-sm">Envie a sua mensagem.</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-bone/60">Respondemos de segunda a sábado, das 8h às 18h. Para ser paciente modelo, é necessário passar por uma avaliação com a Central de Pacientes.</p>
          </div>
          <div className="lg:col-span-7"><ContactForm /></div>
        </div>
      </section>

      <section className="bg-ink pb-24 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
          <div className="grid overflow-hidden rounded-[2rem] border border-bone/10 lg:grid-cols-12">
            <address className="flex flex-col justify-between gap-10 bg-ink-800 p-8 not-italic md:p-12 lg:col-span-4">
              <div>
                <p className="eyebrow">Endereço</p>
                <p className="mt-5 font-serif text-3xl leading-tight">{site.address.street}</p>
                <p className="mt-2 text-bone/60">{site.address.district} · {site.address.city} – {site.address.state}</p>
              </div>
              <div className="text-sm leading-relaxed text-bone/50">
                Resp. Téc.: {site.legal.technicalResponsible} — {site.legal.technicalResponsibleCro}
                <br />{site.legal.clinicRegistration}
              </div>
              <a className="btn btn-ghost self-start" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`}>Abrir no mapa</a>
            </address>
            <div className="relative min-h-[380px] lg:col-span-8">
              <iframe title="Mapa — Odonto Partners" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full grayscale invert-[0.92] hue-rotate-180" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
