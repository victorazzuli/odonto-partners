/**
 * CATÁLOGO DE CURSOS — dados reais de odontopartners.com.br (06/10/2026)
 * Páginas: /cursos-1 (Harmonização Facial) e /cursos-odontologia-classica
 *
 * STATUS
 *  - Cursos com data: o status é calculado automaticamente pela data
 *    (inscrições abertas → em andamento → realizado).
 *  - `manualStatus` sobrepõe o cálculo e reproduz exatamente o texto do site
 *    ("Vagas esgotadas!", "Vagas esgotadas, aguardando novas datas", "Reserve sua vaga!").
 *  - "ultimas-vagas" e "em-breve" existem no sistema, mas não são usados porque
 *    o site atual não os informa. Ative-os quando a equipe confirmar.
 */

const WP = "https://odontopartners.com.br/wp-content/uploads";

export type CourseArea = "hof" | "classica";
export type CourseFormat = "imersao" | "especializacao" | "residencia" | "mentoria" | "evento" | "programa";
export type ManualStatus = "esgotado" | "esgotado-aguardando" | "reserva" | "ultimas-vagas" | "em-breve" | "consulte";

export interface CourseModule {
  title: string;
  topics: string[];
  professors?: string[];
}

export interface Course {
  slug: string;
  title: string;
  area: CourseArea;
  format: CourseFormat;
  international?: boolean;
  online?: boolean;
  image: string;
  /** Texto de data exatamente como publicado */
  dateLabel?: string;
  /** Datas ISO para ordenação/status (início e fim) */
  start?: string;
  end?: string;
  manualStatus?: ManualStatus;
  location?: string;
  summary?: string;
  objective?: string[];
  audience?: string;
  workload?: string;
  schedule?: string;
  category?: string;
  professors?: string[];
  highlights?: string[];
  modules?: CourseModule[];
  /** URL da página original (WordPress), quando conhecida */
  sourceUrl?: string;
}

export const courses: Course[] = [
  // ───────────────────────── HARMONIZAÇÃO OROFACIAL ─────────────────────────
  {
    slug: "international-aesthetics-consensus",
    title: "International – Aesthetics Consensus",
    area: "hof",
    format: "evento",
    international: true,
    image: `${WP}/elementor/thumbs/eu-vou-harvard-300-x-300-px-rnw2utuhvh5ejybqevuop6r4ofe3rpo8yclidkbsu0.png`,
    dateLabel: "21, 22 e 23 de abril de 2027",
    start: "2027-04-21",
    end: "2027-04-23",
  },
  {
    slug: "facial-anatomy-immersion",
    title: "Facial Anatomy Immersion",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-rpx1fttuhwjxyz0ay61s4k3cl1z63feno1lij1pzug.jpg`,
    dateLabel: "19 de setembro de 2026",
    start: "2026-09-19",
    end: "2026-09-19",
  },
  {
    slug: "toxina-e-preenchedores-step-one-na-hof",
    title: "Toxina e Preenchedores – Step One na HOF",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-5-1-rtu8c6ljyoc9oo0uu5u213db77dt7qm0cie4kszu0o.jpg`,
    dateLabel: "22, 23 e 24 de outubro de 2026",
    start: "2026-10-22",
    end: "2026-10-24",
    location: "São Paulo",
    sourceUrl: "https://odontopartners.com.br/toxina-e-preenchedores/",
    summary:
      "Um curso feito para quem quer iniciar os primeiros passos na HOF e reconhece a importância de começar bem: embasamento científico, vídeos demonstrativos, live show com professor e muitos pacientes para treinar na clínica.",
    objective: [
      "Esse é um curso feito para você, que quer iniciar os primeiros passos na HOF e reconhece a importância de começar bem, com embasamento científico, aulas com vídeos demonstrativos, live show com professor, entrega de todo material didático, documentos, contratos, vasta literatura científica na íntegra e na nossa clínica, muitos pacientes para treinar os procedimentos aprendidos em sala de aula!",
      "Serão 3 dias em que você vai mergulhar no universo da Toxina Botulínica Full Face e nos Preenchedores a base de Ácido Hialurônico associado a tratamentos com ativos dérmicos.",
      "A Harmonização Orofacial traz uma gama de oportunidades que vai encantar você e os seus pacientes.",
    ],
    highlights: [
      "Mais de 700 edições no Brasil e no exterior",
      "Mais de 20.000 alunos já fizeram e aprovaram",
      "Média de nota de 9,7 nos quesitos avaliados",
      "Uma das equipes mais experientes do País",
      "Infraestrutura própria, com todo o conforto",
      "Professores com currículo internacional",
      "Escola com sede no Brasil, nos Estados Unidos e na Europa",
      "Suporte técnico contínuo pós-curso",
    ],
    audience: "Dentistas, Médicos, Biomédicos e Farmacêuticos",
    workload: "24 horas (3 dias inteiros)",
    category: "Cursos livres",
    professors: ["flavio-luposeli"],
    modules: [
      {
        title: "1º dia — Toxina Botulínica",
        topics: [
          "Introdução, estrutura da Toxina Botulínica e histórico",
          "Toxicidade e aspectos comparativos",
          "Toxina Botulínica como produto farmacêutico: diferenças fundamentais e farmacologia aplicada",
          "Marcas comerciais e aspectos comparativos entre as marcas disponíveis no Brasil",
          "Aspectos técnicos: reconstituições, armazenamento, cálculos de dose, pré-requisitos, indicações (on label e off label), contraindicações",
          "Procedimentos, recomendações, documentação exigida e aspectos legais",
          "Anatomia e fisiologia da pele e da tela subcutânea",
          "Fisiologia neuromuscular da face e exercícios de prática anatômica",
          "Aplicações terapêuticas: bruxismo, DTM, sialorreia, cefaleia ligada à DTM, dores neuropáticas",
          "Aplicações estéticas: sorriso gengival, protocolo 1/3 superior da face, bunny lines, pés de galinha, lifting de sobrancelhas, rugas de mento, lifting de ângulo de boca, linha da beleza, lifting facial e full face",
          "Apresentação e discussão de casos clínicos",
          "Prevenção e tratamento de intercorrências",
        ],
      },
      {
        title: "2º dia — Preenchedores",
        topics: [
          "Estrutura dos biomateriais preenchedores e características farmacológicas",
          "Produtos comerciais e aspectos comparativos entre as marcas disponíveis no Brasil",
          "Anatomia estratificada e planos anatômicos de relevância clínica",
          "Anatomia vascular de interesse clínico: artérias, veias e vasos linfáticos",
          "Preenchimento do sulco nasolabial e das linhas de marionete — técnica e protocolo passo a passo",
          "Tratamento de rugas finas e técnica de subincisão",
          "Skin care, microagulhamento e drug delivery",
          "Preenchimento labial: anatomia, produtos, técnica e protocolo",
          "Prevenção e tratamento de intercorrências e aspectos mercadológicos",
          "Live show: demonstração ao vivo de um caso completo pelos professores",
        ],
      },
      { title: "3º dia — Aula prática", topics: ["Clínica o dia todo com atendimento a pacientes pelos alunos"] },
    ],
  },
  {
    slug: "especializacao-em-harmonizacao-orofacial",
    title: "Especialização em Harmonização Orofacial",
    area: "hof",
    format: "especializacao",
    image: `${WP}/elementor/thumbs/capa-para-site-especializacao-em-hof-qy43nkpxv1aq1lzqrb0duk769frsv0svnpwgtl6vnc.jpg`,
    // ⚠ VERIFICAR: a listagem /cursos-1 mostra "21, 22 e 23 de setembro de 2026";
    // a home e a página do curso mostram "26, 27 e 28 de outubro de 2026" (usado aqui).
    dateLabel: "Início: 26, 27 e 28 de outubro de 2026",
    start: "2026-10-26",
    end: "2026-10-28",
    location: "São Paulo",
    sourceUrl: "https://odontopartners.com.br/especializacao-facial/",
    summary:
      "Proporcionar ao aluno a habilidade de diagnosticar e tratar pacientes que apresentam queixas estéticas de maneira abrangente, englobando tanto a face quanto o corpo.",
    objective: [
      "Preparar o aluno para desenvolver habilidades de diagnóstico, planejamento integrado e sequenciamento ideal dos procedimentos em HOF.",
      "Preparar o aluno para trabalhar com as diversas técnicas disponíveis em harmonização orofacial de maneira integrada e planejada, para atingir resultados mais duradouros, assertivos e naturais.",
      "Preparar o aluno para atuar de forma proativa na prevenção de intercorrências, contribuindo para uma HOF mais segura e assertiva.",
      "Preparar o aluno no desenvolvimento de habilidades científicas, aumentando significativamente o seu senso crítico das técnicas empregadas e as razões pelas quais devemos eleger produtos e determinar sequências de tratamentos específicas caso a caso.",
      "Preparar o aluno para tratar intercorrências em HOF de forma precisa e responsável.",
      "Proporcionar aos interessados a possibilidade de uma vivência internacional de formação complementar, por meio de parceiros internacionais, nas mais importantes universidades do mundo.",
      "Propiciar mais segurança ao aluno por meio de um sólido embasamento teórico e uma prática clínica supervisionada bastante ampla.",
    ],
    audience: "Dentistas",
    modules: [
      { title: "Módulo 1", topics: ["Toxina Botulínica e Preenchedores – nivelamento técnico", "Aspectos comparativos entre as principais marcas", "Mesobotox", "Aula prática de marcação de pontos", "Apresentação geral de produtos em HOF e reologia dos materiais preenchedores", "Princípios de envelhecimento: pele e seus anexos", "Introdução à clínica de HOF: regras e normas, reconstituição de materiais", "Demonstração de caso clínico com toxina e preenchimento labial"] },
      { title: "Módulo 2", topics: ["Anatomia descritiva de cabeça e pescoço: sistema esquelético, muscular, vascularização e inervação", "Neuroanatomia I e II (dores inflamatórias / neuropáticas)", "Anatomia aplicada à Harmonização Orofacial", "Aulas práticas de pintura facial, desenho anatômico e marcação de pontos", "Lab Safe HOF – Laboratório de Acuidade Manual"] },
      { title: "Módulo 3", topics: ["Ácido Hialurônico I: preenchimento, hidratação / meso / skinbooster, volumização de mento, malar e mandíbula, olheiras", "Ácido Hialurônico II: arquitetura e biomodelação labial, análise e diagnóstico do sorriso, técnicas de preenchimento labial", "Clínica (prática em pacientes)", "Metodologia Científica I: estratégias de busca em bases de dados e discussão de artigo científico"] },
      { title: "Módulo 4", topics: ["Ética / Bioética I", "Histofisiologia da pele e aula prática de desenho histológico", "MDcodes™ — aula prática de marcação dos Codes", "Profhilo — demonstração", "Clínica (prática em pacientes)"] },
      { title: "Módulo 5", topics: ["Bioestimuladores: Radiesse, Ellansé, Sculptra / Elleva / Aesthefill, HarmonyCa — demonstração clínica", "Emergências: PCR, RCP, angina, infarto, lipotimia, síncope, crises hiper/hipotensivas, taquicardia, AVC, asfixia, reação anafilática, crise epiléptica, crises hiper/hipoglicêmicas", "Tratamento de intercorrências em HOF: edema, ETIP, hematoma, efeito Tyndall, nódulos, granulomas, infecções, ptose, necrose, parestesia, amaurose, complicações em bichectomia, lesões arteriovenosas", "Ozonioterapia e laserterapia no tratamento de intercorrências", "Clínica (prática em pacientes)"] },
      { title: "Módulo 6", topics: ["Critérios de classificação da DTM e das cefaleias", "Toxina Botulínica, Dry Needling e terapias de suporte — prática em manequins e demonstração clínica", "Cosmiatria: microagulhamento, peelings, cosméticos e ativos", "Imunologia aplicada: metabolismo proteico, sistema imune, patologia, doenças de pele de interesse clínico", "Clínica (prática em pacientes)"] },
      { title: "Módulo 7", topics: ["Fios faciais: bioestimuladores sólidos (PDO lisos, parafusos, eyebag, filler, matrix) e fios de dermossustentação (PDO espiculados, PDO Sculpt, PLLA Double Needle, Silhouette)", "Face lifting, eyebrow lifting, fox eyes, nose lifting", "Ultrassom microfocado, emagrecimento facial e lipólise química submentual", "Clínica (prática em pacientes)"] },
      { title: "Módulo 8", topics: ["Planejamento e vendas em HOF", "Bichectomia — demonstração de cirurgia ao vivo", "Jato de plasma — demonstração prática ao vivo", "Cronologia de procedimentos e planejamento clínico em HOF", "Discussão de casos clínicos pelos alunos", "Clínica (prática em pacientes)"] },
      { title: "Módulo 9", topics: ["Preenchimento Labial II: Hidragloss e protocolo de hialuronidase", "Ácido Hialurônico III: rinomodelação — demonstração de procedimento clínico", "Clínica (prática em pacientes)"] },
      { title: "Módulo 10", topics: ["Diagnóstico por imagens — ultrassonografia guiada em HOF", "Laser / fototerapia na HOF", "Clínica com equipamentos: ultrassom microfocado e laser", "Farmacologia e farmacoterapia"] },
      { title: "Módulo 11 — Planejamento e Execução Avançada", topics: ["Volumização mandibular, olheiras, rinomodelação, SNL, marionete e mento", "Bioestimuladores de PLLA, hidroxiapatita de cálcio e PCL", "Procedimentos invasivos: lifting de ângulo nasolabial e fios de tração e indução de colágeno", "Procedimentos cirúrgicos: correção de sorriso gengival, lipoaspiração de papada, lips reshaping, queiloplastia, lip lifting, corner lifting, próteses faciais (preenchedores rígidos), bichectomia", "Treinamento de correção cirúrgica de intercorrência em bichectomia", "Aulas práticas na clínica com pacientes reais"] },
      { title: "Módulo 12", topics: ["Lipoaspiração de gordura submentual — cirurgia ao vivo", "Análise facial para cirurgias e discussão de casos", "Cirurgia demonstrativa de preenchedor rígido", "Clínica (prática em pacientes)", "Apresentação dos trabalhos e encerramento"] },
    ],
  },
  {
    slug: "mentoria-lipoaspiracao-cervical-3d",
    title: "Mentoria Lipoaspiração Cervical 3D",
    area: "hof",
    format: "mentoria",
    image: `${WP}/elementor/thumbs/Sem-nome-500-x-500-px-rshqy75kwvcpbrw46br8fj3u763g091qh5uenjkji0.jpg`,
    dateLabel: "27 de outubro de 2026",
    start: "2026-10-27",
    end: "2026-10-27",
  },
  {
    slug: "emergencias-medicas-em-odontologia",
    title: "Emergências Médicas em Odontologia",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-1-rtgmcj32j2zh5glr0tp59wcmo8zlghessc0uqphghk.jpg`,
    dateLabel: "29 de outubro de 2026",
    start: "2026-10-29",
    end: "2026-10-29",
    location: "São Paulo",
    sourceUrl: "https://odontopartners.com.br/emergencias-medicas-em-odontologia/",
    summary:
      "Primeiros-socorros e Suporte Básico de Vida (SBV) para a atuação do cirurgião-dentista em situações emergenciais — com prática em Desfibrilador Externo Automático (DEA) e bonecos simuladores.",
    objective: [
      "O que faria o cirurgião-dentista se, durante um tratamento odontológico, o paciente fosse surpreendido com uma forte dor no peito, ao qual se segue perda de consciência?",
      "Como profissionais de saúde, será que nós, que executamos procedimentos invasivos e não invasivos nos nossos pacientes, estamos preparados para enfrentar as emergências médicas que podem ocorrer durante um tratamento?",
      "O objetivo deste curso é ensinar aos alunos e profissionais da Odontologia os conhecimentos de primeiros-socorros e de Suporte Básico de Vida (SBV), necessários para a sua atuação em uma situação emergencial. Durante o curso, enfocaremos não apenas as técnicas de diagnóstico, como também as manobras práticas e terapêuticas necessárias à resolução dessas emergências.",
      "O curso possui também um conteúdo prático, familiarizando os alunos com o uso do Desfibrilador Externo Automático (DEA) e treinando-os para as manobras de ressuscitação cardiopulmonar a partir de bonecos simuladores.",
    ],
    audience: "Cirurgiões-Dentistas e Médicos",
    workload: "8h – 1 dia",
    modules: [
      {
        title: "Conteúdo programático",
        topics: ["Parada Cardiorrespiratória (PCR)", "Ressuscitação Cardiopulmonar (RCP)", "Angina do Peito", "Infarto do Miocárdio", "Lipotimia", "Síncope", "Crise Hipertensiva", "Crise Hipotensiva", "Taquicardia", "Acidente Vascular Cerebral (AVC)", "Asfixia e Engasgamento", "Reação Anafilática", "Crise Epiléptica", "Crise Hiperglicêmica", "Crise Hipoglicêmica"],
      },
    ],
  },
  {
    slug: "preenchimento-avancado-full-face",
    title: "Preenchimento Avançado Full Face",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-rpcgb8hvo0u12e22vc2b7b9b737z9ray3de765aw8o.jpg`,
    dateLabel: "05, 06 e 07 de outubro de 2026",
    start: "2026-10-05",
    end: "2026-10-07",
    summary: "Módulo 1 da Residência Clínica Avançada em HOF, que pode ser cursado individualmente.",
    professors: ["rachel-rocha"],
    modules: [
      {
        title: "Conteúdo (Módulo 1 da Residência)",
        topics: ["Anatomia aplicada: pele e tela subcutânea", "Ácido hialurônico: marcas comerciais, composições, reologia aplicada, planos de aplicação, técnicas e prevenção", "Análise facial aplicada à HOF: face adulta, senil, jovem, masculina e feminina", "Planejamento clínico passo a passo", "Preenchimento / volumização: têmporas, órbitas, região zigomática, lábios, mandíbula (mento, corpo e ângulo)", "Abordagem comparativa de técnicas, Protocolo MD Codes, PDRN", "Tratamento de intercorrências", "Live show com professores e clínica de atendimento a pacientes"],
      },
    ],
  },
  {
    slug: "residencia-clinica-avancada-em-hof",
    title: "Residência Clínica Avançada em HOF",
    area: "hof",
    format: "residencia",
    image: `${WP}/elementor/thumbs/residencia-na-odonto-partners-qy2xz5uekhcfhnfd48s78onxyd490b9kdd35vvv9vc.jpg`,
    dateLabel: "Início: 05, 06 e 07 de outubro de 2026",
    start: "2026-10-05",
    end: "2026-10-07",
    location: "São Paulo",
    sourceUrl: "https://odontopartners.com.br/residencia-clinica-avancada-em-hof/",
    summary:
      "Nosso curso avançado de Harmonização Orofacial, realizado em 5 módulos. O aluno poderá realizar os módulos individualmente.",
    objective: [
      "Nosso curso AVANÇADO de Harmonização Orofacial é ministrado nesse programa chamado RESIDÊNCIA CLÍNICA AVANÇADA EM HOF, realizado em 5 módulos. O aluno poderá realizar os módulos individualmente.",
      "Com a crescente variedade de recursos estéticos para Harmonização Facial, criou-se a necessidade de uma integração clínica entre esses diversos recursos, elegendo uma cronologia ideal de trabalho para cada caso, além de um protocolo clínico mais rigoroso e assertivo, entre os diversos produtos e técnicas disponíveis.",
      "Assim, o objetivo central desse Programa é possibilitar aos alunos o planejamento clínico cronológico sequencial, obtendo o melhor resultado de cada técnica, uma vez que é respeitado o tempo biológico necessário entre cada procedimento, além do tempo ideal para que o aluno absorva e tire suas dúvidas ao longo do curso. Com isso, o aluno obtém um refinamento nas técnicas básicas e avançadas, o que é indispensável quando usamos recursos diversos associados.",
    ],
    audience: "Dentistas, Médicos, Biomédicos, Farmacêuticos e Enfermeiros",
    workload: "5 módulos · 3 dias por mês",
    schedule: "Das 8h30 às 17h30",
    category: "Cursos livres",
    professors: ["flavio-luposeli", "rachel-rocha", "andrea-benevenuto", "daiana-scherer", "rivaldo-cidade", "paula-iannarella", "debora-costa"],
    modules: [
      { title: "Módulo 1 — Preenchimento Avançado Full Face", professors: ["Dra. Rachel Rocha"], topics: ["Anatomia aplicada: pele e tela subcutânea", "Ácido hialurônico: marcas, composições, reologia, planos de aplicação, técnicas, prevenção e tratamento de intercorrências", "Análise facial aplicada à HOF: face adulta, senil, jovem, masculina e feminina", "Planejamento clínico passo a passo", "Preenchimento/volumização: têmporas, órbitas, zigomático, lábios, mandíbula", "Protocolo MD Codes e PDRN", "Live show com professores e clínica de atendimento a pacientes"] },
      { title: "Módulo 2 — Bioestimuladores e Peelings", professors: ["Dra. Rachel Rocha", "Dra. Andréa Benevenuto"], topics: ["Revisão anatômica, envelhecimento intrínseco e extrínseco, diagnóstico avançado", "Tratamento da pele: manchas, cicatrizes de acne, intradermoterapia, microagulhamento e ativos", "Peelings: Lhala peel, químico, salicílico, Jessner, mandélico, ATA 10/20/30%, Vit. C, olheira — protocolos e prescrições", "Bioestimuladores de colágeno: PLLA (Sculptra / Elleva), hidroxiapatita de cálcio (HarmonyCa / Biocrystal / Radiesse), PCL (Ellansé)", "Prevenção e tratamento de intercorrências, nutracêuticos e formulações", "Live show e clínica de atendimento a pacientes"] },
      { title: "Módulo 3 — Perfiloplastia + Fotografia", professors: ["Dra. Daiana Scherer", "Dr. Rivaldo Cidade"], topics: ["Rinomodelação: documentação, anatomia, pontos de referência, análise facial, manobras de segurança, técnicas, complicações", "Mento: anatomia, indicações, seleção do ácido hialurônico, técnicas e manejo", "Lábio: anatomia labial, técnicas com cânula, agulha e mistas, complicações", "Prática clínica com pacientes", "Fotografia: conceitos, equipamentos, iluminação, protocolo foto e videográfico em HOF, planejamento digital"] },
      { title: "Módulo 4 — Tecnologia na Harmonização Facial", professors: ["Dra. Paula Iannarella", "Dra. Débora Costa"], topics: ["Laser: ética e regulação, lasers de alta potência (Thulium/Lavieen, CO2 fracionado, Erbium, Neodímio, Diodo), ablativos e não ablativos", "Jato de plasma: aspectos físico-químicos, rejuvenescimento palpebral, intercorrências", "Ultraformer: ultrassom microfocado, protocolos e associações", "Radiofrequência microagulhada e bioremoduladores (exossomos e PDRN)", "Prática clínica com protocolos passo a passo"] },
      { title: "Módulo 5 — Fios Faciais", professors: ["Dra. Débora Costa", "Dra. Daiana Scherer"], topics: ["Histórico, legislação, conceitos e características dos fios", "Anatomia aplicada e envelhecimento estrutural da face", "Fios lisos de PDO, fios de dermossustentação (PDO, PLLA, PLA)", "Terapias de bioestímulo de colágeno e reestruturação tecidual", "Lifting facial, fox eyes, eyebrow, lifting nasal", "Pós-operatório, terapia medicamentosa e intercorrências", "Clínica de atendimento a pacientes"] },
    ],
  },
  {
    slug: "tecnologia-na-hof",
    title: "Tecnologia na HOF",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Tecnologia-site-r3htcy8fl6fxd4yhdib3p46plpn1sjasyk2oy5uk6w.jpg`,
    dateLabel: "07, 08 e 09 de outubro de 2026",
    start: "2026-10-07",
    end: "2026-10-09",
    sourceUrl: "https://odontopartners.com.br/tecnologia-na-hof/",
    summary: "Laser, jato de plasma, ultrassom microfocado e radiofrequência microagulhada aplicados à Harmonização Orofacial (conteúdo do Módulo 4 da Residência).",
    professors: ["paula-iannarella", "debora-costa"],
  },
  {
    slug: "basic-skin-peptideos-e-outros-ativos",
    title: "Basic Skin – Peptídeos e Outros Ativos",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0017_PEPTIDEO-BOTULINICO-MEISKINBOLCA-qy2xvprpicmkx4fl8r5g3jz3ji3ss9kzwaz2jcz8oo.jpg`,
    dateLabel: "09 de outubro de 2026",
    start: "2026-10-09",
    end: "2026-10-09",
  },
  {
    slug: "master-program-fios-faciais",
    title: "Master Program – Reestruturação Tecidual com Fios Faciais",
    area: "hof",
    format: "programa",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-1-rpcgbwxolprhg92kwmmm053an3vitvzyuqctncanqw.jpg`,
    dateLabel: "28, 29 e 30 de outubro de 2026",
    start: "2026-10-28",
    end: "2026-10-30",
  },
  {
    slug: "ultrassonografia-guiada-da-face",
    title: "Ultrassonografia Guiada da Face",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0004_HOF-POR-ULTRASSONOGRAFIA-GUIADA-qy2xvmy6xuipyajop7xke2oprchp569svx0m3j3f7c.jpg`,
    dateLabel: "28, 29 e 30 de outubro de 2026",
    start: "2026-10-28",
    end: "2026-10-30",
  },
  {
    slug: "residency-program-ultrassonografia-facial",
    title: "Residency Program – Ultrassonografia Facial",
    area: "hof",
    format: "residencia",
    image: `${WP}/elementor/thumbs/Residency-Program-ultrassonografia-facial-e-corporal-300-x-300-px-rdleq1guo14489udj6rsomi18qkzuthealv97lkm9k.jpg`,
    dateLabel: "28, 29 e 30 de outubro de 2026",
    start: "2026-10-28",
    end: "2026-10-30",
  },
  {
    slug: "habilitacao-em-ozonioterapia-com-iprf",
    title: "Habilitação em Ozonioterapia com IPRF na Odontologia",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0006_HABILITACAO-EM-OZONIOTERAPIA-COM-IPRF-NA-ODONTOLOGIA-qy2xvmy6xuipyajop7xke2oprchp569svx0m3j3f7c.jpg`,
    dateLabel: "09, 10, 11 e 12 de novembro de 2026",
    start: "2026-11-09",
    end: "2026-11-12",
  },
  {
    slug: "perfiloplastia-nariz-boca-e-mento",
    title: "Perfiloplastia (Nariz, Boca e Mento)",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/perfiloplastia-foto-site-r3hsvqsshcvyu3y8ukjyjyhy4sg5vzzoxe5potd03c.jpg`,
    dateLabel: "25, 26 e 27 de novembro de 2026",
    start: "2026-11-25",
    end: "2026-11-27",
    professors: ["daiana-scherer", "rivaldo-cidade"],
  },
  {
    slug: "annual-hof-pass",
    title: "Annual HOF Pass",
    area: "hof",
    format: "programa",
    image: `${WP}/elementor/thumbs/fenol-eyes-qy2y0e0thp0wnbn6y9vnzvilvh2i234y7fqzfw1rqw.png`,
    manualStatus: "reserva",
    dateLabel: "Reserve sua vaga!",
  },
  {
    slug: "visagismo-aplicado-na-estetica-facial",
    title: "Visagismo Aplicado na Estética Facial",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/capa-foto-visagismo-qy2y1eoiw8f3845y07q4749l1i1tea6hch6x5ojf08.png`,
    manualStatus: "esgotado-aguardando",
  },
  {
    slug: "mentoria-avancada-em-estetica-corporal-e-facial",
    title: "Mentoria Avançada em Estética Corporal e Facial",
    area: "hof",
    format: "mentoria",
    image: `${WP}/elementor/thumbs/mentoria-vip-qy2y0mhd77chjtawkvjb4bdr7xwszd2j8lmcrdp86w.jpg`,
    manualStatus: "reserva",
    dateLabel: "Faça sua reserva!",
  },
  {
    slug: "master-skin-peelings-e-bioestimuladores",
    title: "Master Skin – Peelings e Bioestimuladores",
    area: "hof",
    format: "programa",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-2-rpcg9kc7imjofchgmm26rqft6fghl4o4j3n4gfs3aw.jpg`,
    manualStatus: "esgotado",
  },
  {
    slug: "iprf-ozonio-fios-lisos-e-venopuncao",
    title: "IPRF + Ozônio Associados aos Fios Lisos e Habilitação em Venopunção",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0023_IPRF-OZONIO-ASSOCIADOS-AOS-FIOS-LISOS-E-HABILITACAO-EM-VENOPUNCAO-qy2xvrndw0p5kccuxryp8ji0q9uj7nsgkka1hwwgc8.jpg`,
    manualStatus: "esgotado-aguardando",
  },
  {
    slug: "lips-preenchimento-labial-avancado",
    title: "Lips – Preenchimento Labial Avançado",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/lips-qy2xwh110jnw9tbztkxmlv3grodfzhl7o1w5gduto8.png`,
    manualStatus: "esgotado",
  },
  {
    slug: "fisiologia-hormonal-na-estetica-facial",
    title: "Fisiologia Hormonal na Estética Facial",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0007_FISIOLOGIA-HORMONAL-–-HORMONIOS-NA-ODONTOLOGIA-qy2xvnw14ok09wibjqc6ykg6cqd2cvdj81o3kt2114.jpg`,
    manualStatus: "esgotado-aguardando",
  },
  {
    slug: "exames-laboratoriais-fundamentais-em-saude",
    title: "Exames Laboratoriais Fundamentais em Saúde",
    area: "hof",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0013_ANALISES-CLINICAS-–-INTERPRETACAO-DE-EXAMES-LABORATORIAIS-qy2xvotvbilaligye8qtj27my48fkkh9k6bl230muw.jpg`,
    manualStatus: "esgotado-aguardando",
  },
  {
    slug: "residency-program-module-i-boston",
    title: "Residency Program – Module I · Scientific Evidence",
    area: "hof",
    format: "residencia",
    international: true,
    location: "Boston, Massachusetts — EUA",
    image: `${WP}/elementor/thumbs/modulo-1-qy2xzua7i69vvifv5jci1ihxedrskfyl4q1sd2v1dk.png`,
    manualStatus: "esgotado-aguardando",
  },

  // ───────────────────────── ODONTOLOGIA CLÁSSICA ─────────────────────────
  {
    slug: "lentes-de-contato-e-laminados-ceramicos",
    title: "Lentes de Contato e Laminados Cerâmicos",
    area: "classica",
    format: "imersao",
    image: `${WP}/elementor/thumbs/Capas-Site-Odonto-Parters-2-1-rtu7ztzw61fn53ynybnirpka7y972wkyzdtgkxb1rs.jpg`,
    dateLabel: "29, 30 e 31 de outubro de 2026",
    start: "2026-10-29",
    end: "2026-10-31",
  },
  {
    slug: "masterclass-experience-em-dor-orofacial",
    title: "Masterclass Experience em Dor Orofacial",
    area: "classica",
    format: "programa",
    image: `${WP}/elementor/thumbs/CURSO-DA-DOR-OROFACIAL-300-x-300-px-rek7vcp57bu5by8oh5yd3xrif6t6u97d4rq155m5ko.jpg`,
    manualStatus: "esgotado",
  },
  {
    slug: "facetas-de-resina-e-restauracoes-esteticas",
    title: "Facetas de Resina e Restaurações Estéticas",
    area: "classica",
    format: "imersao",
    image: `${WP}/elementor/thumbs/fotinhas-cursos_0003_IMERSAO-EM-RESTAURACOES-ESTETICAS-EM-RESINAS-COMPOSTAS-qy2xvmy6xuipyajop7xke2oprchp569svx0m3j3f7c.jpg`,
    manualStatus: "esgotado",
  },
  {
    // Aparece em "Outros cursos" nas páginas de curso do site atual
    slug: "recobrimento-radicular",
    title: "Recobrimento Radicular",
    area: "classica",
    format: "imersao",
    image: "",
    manualStatus: "consulte",
    sourceUrl: "https://odontopartners.com.br/recobrimento-radicular/",
  },
];

export const areaLabels: Record<CourseArea, string> = {
  hof: "Harmonização Orofacial",
  classica: "Odontologia Clássica",
};

export const formatLabels: Record<CourseFormat, string> = {
  imersao: "Imersão",
  especializacao: "Especialização",
  residencia: "Residência",
  mentoria: "Mentoria",
  evento: "Evento",
  programa: "Programa",
};

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
