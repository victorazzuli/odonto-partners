import { posts } from "@/data/content";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogIndex } from "./BlogIndex";

export const metadata = pageMeta({
  title: "Blog",
  description: "Artigos sobre Harmonização Orofacial, toxina botulínica, rinomodelação, estética do sorriso, carreira e ciência — conteúdo da Odonto Partners e do Dr. Flávio Luposeli.",
  path: "/blog",
});

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }]), { "@context": "https://schema.org", "@type": "Blog", name: "Blog Odonto Partners", url: `${site.url}/blog`, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}` })) }]} />
      <PageHero
        eyebrow="Blog · Portal editorial"
        crumbs={[{ name: "Blog", href: "/blog" }]}
        title={["Conhecimento que continua", <>depois da <em>sala de aula.</em></>]}
        intro="Ciência, clínica e carreira — artigos para profissionais que não param de evoluir."
      />
      <section className="bg-ink pb-28 text-bone">
        <div className="mx-auto max-w-wide px-5 md:px-8 xl:px-12"><BlogIndex posts={posts} /></div>
      </section>
      <CtaBand eyebrow="Formação" title={["Do artigo", "à prática clínica."]} primary={{ label: "Conhecer os cursos", href: "/cursos" }} />
    </>
  );
}
