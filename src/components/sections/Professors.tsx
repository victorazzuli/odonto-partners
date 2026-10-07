import Link from "next/link";
import type { Professor } from "@/data/professors";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

export function ProfessorCard({ p, index = 0 }: { p: Professor; index?: number }) {
  return (
    <Reveal as="article" delay={(index % 4) * 0.06} className="group relative">
      <Link href={`/equipe/${p.slug}`} className="block" aria-label={`Conheça ${p.name}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink-700">
          <SmartImage
            src={p.photo}
            alt={`Foto de ${p.name}`}
            fill
            sizes="(min-width:1280px) 25vw, (min-width:640px) 45vw, 90vw"
            className="object-cover object-top grayscale transition duration-[1.4s] ease-luxe group-hover:scale-[1.03] group-hover:grayscale-0"
            label={p.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/0 to-transparent" aria-hidden />
          <span className="absolute bottom-4 right-4 rounded-full border border-bone/30 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-bone opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100">
            Conheça
          </span>
        </div>
        <h3 className="mt-5 font-serif text-[1.65rem] leading-tight">{p.name}</h3>
        <p className="mt-2 text-sm text-bone/60">{p.role}</p>
        {p.cro && <p className="mt-1 text-xs uppercase tracking-[0.16em] text-bone/35">{p.cro}</p>}
        <ul className="mt-4 space-y-1.5 border-t border-bone/10 pt-4 text-[0.82rem] leading-snug text-bone/50">
          {p.credentials.slice(1, 3).map((c) => <li key={c} className="line-clamp-2">— {c}</li>)}
        </ul>
      </Link>
    </Reveal>
  );
}

export function ProfessorsSpotlight({ lead, rest }: { lead: Professor; rest: Professor[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <Link href={`/equipe/${lead.slug}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-700">
            <SmartImage src={lead.photo} alt={`Foto de ${lead.name}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top grayscale transition duration-[1.6s] ease-luxe group-hover:grayscale-0" label={lead.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 p-7 md:p-9">
              <p className="eyebrow">Diretor Científico</p>
              <p className="mt-3 font-serif text-4xl md:text-5xl">{lead.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-bone/50">{lead.cro}</p>
            </div>
          </div>
        </Link>
      </Reveal>
      <div className="lg:col-span-7">
        <ul className="space-y-4 text-bone/75">
          {lead.credentials.filter((c) => /Harvard|Miami|SBTI|Texas|Unifesp|20 anos/.test(c)).map((c, i) => (
            <Reveal as="li" key={c} delay={i * 0.06} className="flex gap-5 border-b border-bone/10 pb-4 text-[0.98rem] leading-relaxed">
              <span className="pt-1 text-xs tracking-[0.2em] text-bone/30">0{i + 1}</span>
              <span>{c}</span>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rest.slice(0, 4).map((p) => (
            <Link key={p.slug} href={`/equipe/${p.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-700">
                <SmartImage src={p.photo} alt={`Foto de ${p.name}`} fill sizes="20vw" className="object-cover object-top grayscale transition duration-700 group-hover:grayscale-0" label={p.name} />
              </div>
              <p className="mt-3 text-sm leading-tight">{p.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
