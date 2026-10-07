/**
 * Conteúdo editorial reaproveitado do site atual.
 * Depoimentos: transcritos da página da Residência Clínica Avançada em HOF.
 * Vídeos: incorporados na home e nas páginas de curso do site atual (YouTube).
 */
const WP = "https://odontopartners.com.br/wp-content/uploads";

// ─────────────────────────── DEPOIMENTOS ───────────────────────────
export interface Testimonial {
  name: string;
  text: string;
  course?: string; // ⚠ PLACEHOLDER: o site não informa o curso de cada depoente
}

export const testimonials: Testimonial[] = [
  { name: "Dra. Paulina Noal Maekawa", text: "Como sempre, OP superando todas as expectativas! Equipe de profissionais muito bem preparados, solícitos. Equipe de funcionários impecável, em especial a funcionária Neia, com seu cafezinho delicioso e sempre muito simpática. Professora Raquel uma grata surpresa, muito atenciosa, paciente e capaz. Sentiremos saudades!" },
  { name: "Dra. Andrea Benevenuto Koschinitzki", text: "Amo a equipe, amo os professores, amo tudo!!! Vontade de deixar um colchão por aqui e assistir curso todos os dias! Parabéns por tudo! Feliz em ter feito a escolha pela melhor escola e equipe em HOF! Gratidão." },
  { name: "Dra. Debora Hilário", text: "Hoje eu termino uma primeira etapa junto de vocês, queridos Partners, e não tenho palavras para agradecer pela brilhante maestria que tive nessa escola. Queridos mestres, minha gratidão infinita." },
  { name: "Dra. Ana Karina Cardoso", text: "Feliz por essa grande conquista. Todo o esforço na realização do curso valeu a pena! Encantada com a seriedade e conhecimento clínico e científico de toda a equipe." },
  { name: "Dra. Carine Mendes Barbosa Ferreira", text: "Agradeço toda equipe Odonto Partners, dando ênfase nos professores pelo conhecimento, atenção, carinho com todos os alunos. Gostaria de elogiar os professores, que além do conhecimento que têm, sabem passar informação com perfeição aos alunos. Grata por essa experiência." },
  { name: "Dra. Rogeria L. C. Altiari", text: "A equipe da Odonto Partners está de parabéns, por toda dedicação e excelentes serviços prestados, sempre muito educados, prestativos e com professores de alto nível técnico e científico. Obrigada por tudo! Valeu a pena vir do Pará." },
  { name: "Dra. Ana Carolina Serra Silva", text: "Achei o curso excelente, os professores são maravilhosos, o acompanhamento dado aos alunos durante e pós-curso é muito bom." },
  { name: "Dr. Aécio Moura Barbosa", text: "Perfeito!!! Desde a recepção até as informações e técnicas passadas pela equipe docente. Coffee break também excelente!" },
  { name: "Dra. Melissa Ribeiro de Souza", text: "Todos os professores são excelentes, amei as dicas da professora Luciana, muito atenciosa, delicada e didática. Todos estão de parabéns!" },
  { name: "Dra. Vanessa Guandalim Damaso", text: "Curso excelente, com excelentes professores e conteúdo. Volto e indico!!!" },
  { name: "Dra. Luciane Teixeira da Silva", text: "A equipe está de parabéns, organizada e a estrutura de ótima qualidade!" },
  { name: "Dra. Solange Aparecida de Oliveira e Silva", text: "Gratidão, Dra. Erika, pela disposição e atenção." },
];

/** IDs de vídeos de depoimento publicados no site atual */
export const testimonialVideos = [
  "KIj3lgpnx5E",
  "OjTO754uGdk",
  "RRo20vV25CA",
  "BLRtFJW7BEQ",
  "o4j_pkRmH5I",
  "grxsjfNciuc",
  "vyYPVTQMGCI",
];

// ─────────────────────────── TIMELINE ───────────────────────────
/** Somente fatos publicados em "Quem Somos" e nas páginas de curso/equipe */
export const timeline = [
  {
    year: "2011",
    title: "A fundação",
    text: "Inaugurada com o Curso de Habilitação em Toxina Botulínica e Preenchimento, fundada pelo Dr. Flávio Luposeli — cirurgião-dentista e diretor clínico do SPA Odontológico Luposeli — e por Ana Carolina Renda.",
  },
  {
    year: "Pioneirismo",
    title: "Referência em HOF e Especialização",
    text: "A Odonto Partners se consolida como pioneira em cursos de Harmonização Facial e Especialização, com a marca registrada de ensinar corretamente, com alto nível de qualidade e embasamento científico.",
  },
  {
    year: "DNA clínico",
    title: "Nascida dentro de uma clínica",
    text: "Ter surgido de dentro de uma clínica odontológica permite entender as reais necessidades dos pacientes e transformar esse conhecimento em formação de excelência.",
  },
  {
    year: "2020",
    title: "Nova sede no Brooklin",
    text: "Inauguração da nova sede, com área clínica totalmente equipada para atendimentos durante os cursos e um setor exclusivo de triagem de pacientes modelo.",
  },
  {
    year: "Internacional",
    title: "Formação além das fronteiras",
    text: "Alunos que atravessam o Brasil — e fronteiras internacionais — para estudar na Odonto Partners, e programas complementares com parceiros como o M.A.R.C. (Miami) e a American Society of Anatomy (Harvard Medical School e Cambridge College).",
  },
  {
    year: "Hoje",
    title: "Mais de 20.000 alunos",
    text: "Mais de 700 edições no Brasil e no exterior e média 9,7 nas avaliações dos alunos.",
  },
];

// ─────────────────────────── PROCEDIMENTOS (PACIENTE MODELO) ───────────────────────────
/** Lista integral da página /paciente-modelo */
export const procedures = {
  classica: [
    "Limpeza e Profilaxia",
    "Clareamento Dental",
    "Restaurações em Resina",
    "Laminados Cerâmicos",
    "Retrações Gengivais",
    "Plástica Gengival",
  ],
  hof: [
    "Bichectomia",
    "Bioestimulador Ellansé",
    "Bioestimulador Diamond",
    "Bioestimulador Radiesse",
    "Bioestimulador Sculptra",
    "Protocolo HarmonyCa",
    "Emagrecimento Facial",
    "Fios Faciais Lisos para Estímulo de Colágeno e Fios Faciais de Tração",
    "Hidratação (Skinbooster)",
    "Jato de Plasma",
    "Laser CO2",
    "Lipoaspiração Cirúrgica da Papada",
    "Lipólise Química de Papada (redução de papada)",
    "MD Codes (preenchimento e volumização em pontos específicos da face)",
    "Microagulhamento (Dermaroller)",
    "Micropigmentação de Lábios",
    "Ozonioterapia e IPRF",
    "Pacote de Harmonização Facial",
    "Peeling",
    "Peptídeo Botulínico",
    "Preenchimento de Bigode Chinês (SNG)",
    "Preenchimento de Lábio",
    "Preenchimento de Olheira",
    "Toxina Botulínica (Botox)",
    "Ultrassonografia de Pele (exame/laudo para auxiliar no planejamento)",
    "Ultrassom Microfocado",
    "Volumização de Malar (maçã do rosto)",
    "Volumização de Mandíbula",
    "Volumização de Mento (queixo)",
    "Volumização de Têmporas",
  ],
};

// ─────────────────────────── GALERIA ───────────────────────────
export type GalleryCategory = "Estrutura" | "Cursos" | "Alunos" | "Professores" | "Procedimentos" | "Eventos";
export interface GalleryItem {
  src: string;
  thumb?: string;
  alt: string;
  category: GalleryCategory;
  video?: string; // YouTube ID
}

/**
 * Fotos publicadas nas galerias das páginas de curso do site atual.
 * ⚠ CATEGORIAS: classificadas provisoriamente como "Cursos" (local onde
 * aparecem no site). Ajuste cada item para Estrutura/Alunos/Professores/
 * Procedimentos/Eventos — filtros vazios ficam ocultos automaticamente.
 */
const galleryPhotos = [
  "2021/10/DSC05098.jpg", "2021/10/DSC05106.jpg", "2021/10/DSC05105.jpg", "2021/10/DSC05142.jpg",
  "2021/10/DSC05144.jpg", "2021/10/DSC05146.jpg", "2021/10/DSC05111.jpg", "2021/10/DSC05112.jpg",
  "2021/10/DSC05203.jpg", "2021/10/DSC05198.jpg", "2021/10/DSC05201.jpg", "2021/10/DSC05205.jpg",
  "2021/10/DSC05165.jpg", "2021/09/GAB5228-scaled.jpg", "2021/09/006-1.jpg",
  "2026/06/Design-sem-nome-40-scaled.jpg", "2026/06/Design-sem-nome-39-scaled.jpg",
  "2026/06/Design-sem-nome-1-scaled.jpg", "2026/06/Design-sem-nome-42-scaled.jpg",
  "2026/06/Design-sem-nome-43-scaled.jpg", "2026/06/Design-sem-nome-44-scaled.jpg",
  "2026/06/Design-sem-nome-45-1-scaled.jpg",
];

export const gallery: GalleryItem[] = [
  ...galleryPhotos.map((p, i) => ({
    src: `${WP}/${p}`,
    alt: `Odonto Partners — registro de aula e prática clínica ${i + 1}`,
    category: "Cursos" as GalleryCategory,
  })),
  ...testimonialVideos.slice(0, 3).map((id) => ({
    src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    alt: "Depoimento em vídeo de aluno da Odonto Partners",
    category: "Alunos" as GalleryCategory,
    video: id,
  })),
];

/** Fotos usadas como fallback cinematográfico do hero e na seção de estrutura */
export const cinematicStills = [
  `${WP}/2021/10/DSC05198.jpg`,
  `${WP}/2021/10/DSC05144.jpg`,
  `${WP}/2021/10/DSC05106.jpg`,
  `${WP}/2021/09/GAB5228-scaled.jpg`,
  `${WP}/2021/10/DSC05142.jpg`,
];

// ─────────────────────────── BLOG ───────────────────────────
export type BlogCategory = "Harmonização Facial" | "Odontologia" | "Ciência" | "Clínica" | "Carreira" | "Eventos" | "Institucional";
export interface Post {
  slug: string;
  title: string;
  category: BlogCategory;
  author?: string;
  excerpt: string;
  /** ⚠ PLACEHOLDER: corpo integral a migrar do WordPress (link original preservado) */
  body?: string[];
  date?: string; // ⚠ PLACEHOLDER: a listagem atual não exibe datas
  sourceUrl: string;
  image?: string;
}

/** Artigos reais da categoria "Artigos" do blog atual */
export const posts: Post[] = [
  {
    slug: "rinomodelacao-na-odontologia",
    title: "Rinomodelação na Odontologia: o que o profissional precisa saber a respeito?",
    category: "Harmonização Facial",
    author: "Dr. Flávio Luposeli",
    excerpt: "Responsável técnico da Odonto Partners, professor internacional e pesquisador, o Dr. Flávio Luposeli comenta o que o cirurgião-dentista precisa saber sobre a rinomodelação.",
    sourceUrl: "https://odontopartners.com.br/rinomodelacao-na-odontologia-o-que-o-profissional-precisa-saber-respeito/",
  },
  {
    slug: "importancia-dos-labios-na-harmonizacao-do-sorriso",
    title: "A importância dos lábios na harmonização do sorriso",
    category: "Harmonização Facial",
    author: "Dr. Flávio Luposeli",
    excerpt: "Durante décadas, a Odontologia tratou a estética do sorriso como sendo composta por dentes. O artigo discute o papel dos lábios no resultado estético.",
    sourceUrl: "https://odontopartners.com.br/importancia-dos-labios-na-harmonizacao-do-sorriso-pelo-dr-flavio-luposeli/",
  },
  {
    slug: "toxina-botulinica-controla-dores-faciais",
    title: "A Toxina Botulínica controla dores faciais?",
    category: "Ciência",
    excerpt: "As aplicações terapêuticas da toxina botulínica na Odontologia e o seu papel no controle das dores faciais.",
    sourceUrl: "https://odontopartners.com.br/toxina-botulinica-controla-dores-faciais/",
  },
  {
    slug: "envelhecimento-e-tecnicas-antienvelhecimento",
    title: "Envelhecimento e técnicas antienvelhecimento",
    category: "Harmonização Facial",
    author: "Dr. Flávio Luposeli",
    excerpt: "O processo de envelhecimento facial e as técnicas disponíveis para tratá-lo.",
    sourceUrl: "https://odontopartners.com.br/envelhecimento-e-tecnicas-antienvelhecimento-pelo-dr-flavio-luposeli/",
  },
  {
    slug: "atencao-a-bleachorexia",
    title: "Atenção à Bleachorexia: você tem pacientes com essa síndrome?",
    category: "Clínica",
    excerpt: "Um alerta sobre o desejo compulsivo por clareamento dental e como identificá-lo no consultório.",
    sourceUrl: "https://odontopartners.com.br/atencao-bleachorexia-voce-tem-pacientes-com-essa-sindrome/",
  },
  {
    slug: "dentista-pode-postar-antes-e-depois",
    title: "Dentista pode postar antes e depois?",
    category: "Carreira",
    excerpt: "O que o profissional precisa considerar antes de publicar imagens de antes e depois nas redes sociais.",
    sourceUrl: "https://odontopartners.com.br/dentista-%f0%9f%98%b7-pode-postar-antes-e-depois/",
  },
  {
    slug: "botox-antidoto-aranhas-viuvas-negras",
    title: "Botox: antídoto pode vir de aranhas viúvas-negras",
    category: "Ciência",
    excerpt: "Uma pesquisa sobre um possível antídoto para a toxina botulínica.",
    sourceUrl: "https://odontopartners.com.br/botox%ef%b8%8f-antidoto-pode-vir-de-aranhas-viuvas-negras/",
  },
  {
    slug: "toxina-botulinica-para-cefaleias-mitos-e-verdades",
    title: "Toxina Botulínica para cefaleias: mitos e verdades na Odontologia",
    category: "Odontologia",
    excerpt: "O uso da toxina botulínica no tratamento de cefaleias dentro da prática odontológica.",
    sourceUrl: "https://odontopartners.com.br/toxina-botulinica-para-cefaleias-mitos-e-verdades-na-odontologia/",
  },
  {
    slug: "debate-aspectos-legais-da-harmonizacao-orofacial",
    title: "Dr. Flávio Luposeli participa de debate sobre os aspectos legais da harmonização orofacial na Odontologia",
    category: "Eventos",
    excerpt: "A participação do diretor científico da Odonto Partners no debate sobre os aspectos legais da HOF.",
    sourceUrl: "https://odontopartners.com.br/dr-flavio-luposeli-participa-de-debate-sobre-os-aspectos-legais-da-harmonizacao-orofacial-na-odontologia/",
  },
  {
    slug: "comunicado-sbti-a-classe-odontologica",
    title: "Comunicado da Sociedade Brasileira de Toxina Botulínica e Implantes Faciais à classe odontológica",
    category: "Institucional",
    excerpt: "Posicionamento da SBTI dirigido à classe odontológica.",
    sourceUrl: "https://odontopartners.com.br/comunicado-classe-odontologica/",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// ─────────────────────────── FAQ ───────────────────────────
/** Respostas baseadas exclusivamente em informações publicadas no site atual */
export const faqStudents = [
  { q: "Quem pode fazer os cursos?", a: "Depende do curso. O Step One em Toxina e Preenchedores é voltado a Dentistas, Médicos, Biomédicos e Farmacêuticos; a Residência Clínica Avançada em HOF inclui também Enfermeiros; a Especialização em Harmonização Orofacial é exclusiva para Dentistas. Cada página de curso informa o público-alvo." },
  { q: "Os cursos têm prática em pacientes?", a: "Sim. Os cursos contam com atendimento clínico a pacientes na clínica própria da Odonto Partners, com supervisão dos professores, além de live shows com demonstração de casos completos." },
  { q: "Posso cursar os módulos da Residência separadamente?", a: "Sim. A Residência Clínica Avançada em HOF é realizada em 5 módulos e o aluno pode realizar os módulos individualmente." },
  { q: "Como garanto minha vaga?", a: "Antes de efetuar o depósito para garantir a sua reserva no curso, entre em contato com a equipe para confirmar se ainda existem vagas disponíveis. Depois, preencha a ficha de inscrição." },
  { q: "Onde acontecem as aulas?", a: "Na sede da Odonto Partners, na Av. Nova Independência, 989 – Brooklin Paulista, São Paulo – SP. Alguns programas acontecem no exterior, como o Residency Program em Boston." },
  { q: "Existe suporte depois do curso?", a: "Sim. A Odonto Partners oferece suporte técnico contínuo pós-curso." },
];

export const faqPatients = [
  { q: "O que é ser paciente modelo?", a: "Na clínica-escola da Odonto Partners, os procedimentos são realizados por dentistas já formados que estão fazendo aperfeiçoamento em uma nova técnica ou curso de Especialização, sempre com a supervisão de um professor." },
  { q: "Quanto custa?", a: "Os pacientes pagam taxas mínimas e, em alguns casos, os custos dos materiais. Os valores são informados na avaliação." },
  { q: "Como faço para agendar?", a: "Entre em contato com a Central de Pacientes pelo WhatsApp e passe por uma avaliação. A triagem de pacientes acontece todas as semanas — confirme o melhor horário antes de vir." },
  { q: "Quais áreas são atendidas?", a: "Restaurações estéticas em resina, Harmonização Orofacial, bruxismo, cirurgias gengivais e alguns procedimentos em periodontia — e, em breve, novos procedimentos odontológicos." },
];
