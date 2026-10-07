import { pageMeta } from "@/lib/seo";
import { CoursesView } from "../CoursesView";

export const metadata = pageMeta({
  title: "Cursos de Odontologia Clássica",
  description: "Lentes de contato e laminados cerâmicos, facetas de resina e restaurações estéticas, dor orofacial e recobrimento radicular — cursos de Odontologia Clássica da Odonto Partners.",
  path: "/cursos/odontologia-classica",
});

export default function Page() {
  return (
    <CoursesView
      area="classica"
      eyebrow="Odontologia Clássica"
      crumb={[{ name: "Cursos", href: "/cursos" }, { name: "Odontologia Clássica", href: "/cursos/odontologia-classica" }]}
      title={["Odontologia Clássica,", <>com a profundidade <em>de quem é clínica.</em></>]}
      intro="Com conteúdo de alta qualidade e temas abordados com clareza e profundidade, nossos cursos aprimoram o conhecimento de cada profissional e contribuem para o aperfeiçoamento da sua prática — ampliando suas possibilidades de atuação e a qualidade de vida dos seus pacientes."
      path="/cursos/odontologia-classica"
    />
  );
}
