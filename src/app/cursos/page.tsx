import { pageMeta } from "@/lib/seo";
import { CoursesView } from "./CoursesView";

export const metadata = pageMeta({
  title: "Cursos de Harmonização Orofacial e Odontologia",
  description: "Agenda completa de cursos da Odonto Partners: imersões, especialização, residências, mentorias e programas internacionais em Harmonização Orofacial e Odontologia Clássica, com prática clínica.",
  path: "/cursos",
});

export default function Page() {
  return (
    <CoursesView
      eyebrow="Catálogo de cursos"
      crumb={[{ name: "Cursos", href: "/cursos" }]}
      title={["Eleve sua prática.", <>Escolha a sua <em>próxima formação.</em></>]}
      intro="Cursos modernos, objetivos e extremamente didáticos — desenvolvidos para aprimorar suas habilidades, ampliar suas oportunidades de atuação e elevar os resultados entregues aos seus pacientes."
      path="/cursos"
    />
  );
}
