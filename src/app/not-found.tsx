import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink px-5 pt-32 text-bone md:px-12">
      <div className="mx-auto w-full max-w-wide">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-6 font-serif text-display-lg">Esta página <em>não existe</em> — ou mudou de endereço.</h1>
        <p className="mt-6 max-w-lg text-bone/60">O novo site da Odonto Partners reorganizou o conteúdo. Comece pelos cursos ou volte ao início.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="/cursos">Ver cursos</MagneticButton>
          <MagneticButton href="/" variant="ghost" arrow={false}>Página inicial</MagneticButton>
        </div>
      </div>
    </section>
  );
}
