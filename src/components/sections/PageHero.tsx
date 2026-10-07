import Link from "next/link";
import { RevealLines, Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow, title, intro, crumbs, children, image,
}: {
  eyebrow: string;
  title: React.ReactNode[];
  intro?: React.ReactNode;
  crumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-bone md:pb-24 md:pt-48">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" aria-hidden fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35 grayscale" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(185,181,172,0.10),transparent_70%)]" aria-hidden />
      <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12">
        {crumbs && (
          <nav aria-label="Trilha de navegação" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-bone/45">
              <li><Link href="/" className="hover:text-bone">Início</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {i === crumbs.length - 1 ? <span aria-current="page" className="text-bone/75">{c.name}</span> : <Link href={c.href} className="hover:text-bone">{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-bone/30" aria-hidden />
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="mt-7 max-w-6xl font-serif text-display-lg">
          <RevealLines lines={title} />
        </h1>
        {intro && <Reveal delay={0.25} className="mt-8 max-w-2xl text-base leading-relaxed text-bone/70 md:text-lg">{intro}</Reveal>}
        {children && <Reveal delay={0.35} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
