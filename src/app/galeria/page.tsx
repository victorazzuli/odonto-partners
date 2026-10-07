import { gallery } from "@/data/content";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Galeria",
  description: "Galeria de fotos e vídeos da Odonto Partners: estrutura clínica, aulas, prática com pacientes, professores e alunos.",
  path: "/galeria",
});

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Início", path: "/" }, { name: "Galeria", path: "/galeria" }]), { "@context": "https://schema.org", "@type": "ImageGallery", name: "Galeria Odonto Partners", image: gallery.filter((g) => !g.video).map((g) => g.src) }]} />
      <PageHero
        eyebrow="Galeria"
        crumbs={[{ name: "Galeria", href: "/galeria" }]}
        title={["Por dentro da", <><em>Odonto Partners.</em></>]}
        intro="Aulas, live shows, prática clínica com pacientes e a estrutura da nossa sede no Brooklin."
      />
      <section className="bg-ink pb-28 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12"><Gallery items={gallery} /></div>
      </section>
      <CtaBand title={["Venha conhecer", "a nossa estrutura."]} primary={{ label: "Ver cursos", href: "/cursos" }} />
    </>
  );
}
