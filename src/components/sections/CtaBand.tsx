import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealLines, Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  eyebrow = "Próximo passo",
  title = ["Sua próxima turma", "começa com uma conversa."],
  text = "Nossa equipe orienta você na escolha do curso ideal para o seu momento profissional e confirma a disponibilidade de vagas.",
  primary = { label: "Quero me inscrever", href: "/ficha-de-inscricao" },
  secondary = { label: "Fale com nossa equipe", href: "/contato" },
}: {
  eyebrow?: string;
  title?: string[];
  text?: string;
  primary?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className="relative overflow-hidden bg-ink-800 text-bone">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgba(185,181,172,0.12),transparent_70%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-wide gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12 lg:items-end xl:px-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-6 font-serif text-display-md"><RevealLines lines={title} /></h2>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="max-w-md text-base leading-relaxed text-bone/65">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={primary.href} external={primary.external}>{primary.label}</MagneticButton>
            <MagneticButton href={secondary.href} external={secondary.external} variant="ghost" arrow={false}>{secondary.label}</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
