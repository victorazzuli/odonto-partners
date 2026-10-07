import { pageMeta } from "@/lib/seo";
import { CoursesView } from "../CoursesView";

export const metadata = pageMeta({
  title: "Cursos de Harmonização Facial (HOF)",
  description: "Toxina e Preenchedores, Especialização e Residência Clínica Avançada em HOF, Fios Faciais, Ultrassonografia, Perfiloplastia e programas internacionais — com atendimento clínico a pacientes.",
  path: "/cursos/harmonizacao-facial",
});

export default function Page() {
  return (
    <CoursesView
      area="hof"
      eyebrow="Harmonização Orofacial"
      crumb={[{ name: "Cursos", href: "/cursos" }, { name: "Harmonização Facial", href: "/cursos/harmonizacao-facial" }]}
      title={["Harmonização Orofacial", <>com ciência, <em>segurança e prática.</em></>]}
      intro="Procurando oferecer tratamentos mais completos, com resultados mais consistentes, sempre respaldados pela ética profissional e pela legislação vigente — da primeira imersão às residências e programas internacionais."
      path="/cursos/harmonizacao-facial"
    />
  );
}
