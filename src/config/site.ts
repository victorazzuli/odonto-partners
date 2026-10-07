/**
 * ============================================================================
 *  CONFIGURAÇÃO CENTRAL — ODONTO PARTNERS
 * ============================================================================
 *  Tudo que muda com frequência mora aqui: telefones, WhatsApp, endereço,
 *  horários, redes sociais, números institucionais e mídia do hero.
 *
 *  Fonte de cada dado: odontopartners.com.br (levantamento em 06/10/2026).
 *  Itens marcados com  ⚠ PLACEHOLDER  não existem no site atual e devem ser
 *  preenchidos/validados antes de publicar.
 * ============================================================================
 */

export const site = {
  name: "Odonto Partners",
  legalName: "Odonto Partners", // ⚠ PLACEHOLDER: razão social completa + CNPJ
  url: "https://odontopartners.com.br",
  locale: "pt_BR",
  defaultTitle: "Odonto Partners | Formação em Odontologia e Harmonização Orofacial",
  titleTemplate: "%s | Odonto Partners",
  description:
    "Clínica-escola no Brooklin, São Paulo. Desde 2011 formando cirurgiões-dentistas e profissionais da saúde em Harmonização Orofacial e Odontologia Clássica, com embasamento científico e prática clínica supervisionada.",
  foundingYear: 2011,
  newHeadquartersYear: 2020,
  founders: ["Dr. Flávio Luposeli", "Ana Carolina Renda"],

  /** Logo: substitua por /images/logo.svg (ou .png) quando tiver o arquivo vetorial. null = wordmark tipográfico */
  logoSrc: null as string | null,

  contact: {
    email: "cursos@odontopartners.com.br",
    hours: "Segunda a sábado, das 8h às 18h",
    hoursShort: "Seg – Sáb · 8h às 18h",
    hoursSchema: "Mo-Sa 08:00-18:00",
    /** Telefones exibidos na página Contato do site atual */
    phones: [
      { label: "Inscrições", display: "(11) 98952-1884", tel: "+5511989521884" },
      { label: "Cursos", display: "(11) 93038-1888", tel: "+5511930381888" },
      { label: "Atendimento", display: "(11) 93338-1886", tel: "+5511933381886" },
    ],
  },

  whatsapp: {
    /** "CURSOS - (11) 93038-1888" (rodapé do site atual) */
    cursos: {
      number: "5511930381888",
      display: "(11) 93038-1888",
      message: "Olá, gostaria de saber mais sobre os cursos da Odonto Partners",
    },
    /** Botão "FAÇA SUA INSCRIÇÃO" das páginas de curso */
    inscricoes: {
      number: "5511989521884",
      display: "(11) 98952-1884",
      message: "Olá, gostaria de fazer minha inscrição em um curso da Odonto Partners",
    },
    /** "CENTRAL DE PACIENTES - (11) 94794-1467" (rodapé e página Contato) */
    pacientes: {
      number: "5511947941467",
      display: "(11) 94794-1467",
      message: "Olá, gostaria de ser paciente modelo da Odonto Partners",
    },
    /**
     * ⚠ VERIFICAR: a página Paciente Modelo (atualizada em 2023) cita o WhatsApp
     * da triagem (11) 99515-4546, enquanto Contato e rodapé (2026) citam a
     * Central de Pacientes (11) 94794-1467. Usamos o mais recente como principal.
     */
    triagemLegado: { number: "5511995154546", display: "(11) 99515-4546" },
  },

  address: {
    street: "Av. Nova Independência, 989",
    district: "Brooklin Paulista",
    city: "São Paulo",
    state: "SP",
    postalCode: "", // ⚠ PLACEHOLDER: CEP
    country: "BR",
    mapsQuery: "Odonto Partners, Av. Nova Independência, 989 - Brooklin Paulista, São Paulo - SP",
    geo: null as null | { lat: number; lng: number }, // ⚠ PLACEHOLDER: coordenadas para Schema.org
  },

  legal: {
    technicalResponsible: "Dr. Flávio Luposeli",
    technicalResponsibleCro: "CRO/SP 60.866",
    clinicRegistration: "Registro da clínica no CRO/SP: 022672",
  },

  social: {
    instagram: { handle: "@odontopartners_oficial", url: "https://www.instagram.com/odontopartners_oficial/" },
    facebook: { url: "https://www.facebook.com/odontopartners" },
    youtube: { url: "https://www.youtube.com/channel/UCcXQ9l_o8Fau_cKMMUMeTuA" },
  },

  /** Sistema externo existente (não recriado aqui) */
  studentArea: "http://odontopartners.pagina.store/login",

  /**
   * Formulários. Defina um endpoint (Formspree, RD Station, n8n, API própria…)
   * para receber os envios. Vazio = envio é encaminhado ao WhatsApp/e-mail.
   */
  forms: {
    contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
    enrollmentEndpoint: process.env.NEXT_PUBLIC_ENROLLMENT_ENDPOINT ?? "",
  },

  /** Google Tag Manager do site atual — carregado somente após consentimento */
  analytics: { gtmIds: ["GTM-5ZVBMNC", "GTM-MSRLBBK"] },

  /**
   * Mídia do hero. Substitua os arquivos em /public mantendo os nomes,
   * ou aponte para outra URL/CDN aqui. Se o vídeo falhar ou não existir,
   * o hero cai automaticamente para uma sequência cinematográfica de fotos.
   */
  hero: {
    video: {
      desktop: "/videos/hero.mp4",
      mobile: "/videos/hero-mobile.mp4",
      poster: "/images/hero-poster.webp",
      enabled: true,
    },
  },
} as const;

/**
 * Números institucionais. Somente números publicados no site atual
 * (página "Toxina e Preenchedores – Step One na HOF" e "Quem Somos").
 * Para ocultar um número, defina `visible: false`.
 */
export const stats = [
  {
    value: new Date().getFullYear() - 2011,
    prefix: "",
    suffix: "",
    label: "anos formando profissionais",
    note: "Inaugurada em 2011",
    visible: true,
  },
  { value: 20000, prefix: "+", suffix: "", label: "alunos formados", note: "Fonte: site oficial", visible: true },
  { value: 700, prefix: "+", suffix: "", label: "edições no Brasil e no exterior", note: "Fonte: site oficial", visible: true },
  { value: 9.7, prefix: "", suffix: "", decimals: 1, label: "nota média nas avaliações", note: "Avaliação dos alunos", visible: true },
] as const;

export const navigation = [
  { label: "Institucional", href: "/quem-somos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Harmonização Facial", href: "/cursos/harmonizacao-facial" },
  { label: "Odontologia Clássica", href: "/cursos/odontologia-classica" },
  { label: "Paciente Modelo", href: "/paciente-modelo" },
  { label: "Equipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
] as const;

export function waLink(kind: "cursos" | "inscricoes" | "pacientes", custom?: string) {
  const w = site.whatsapp[kind];
  return `https://wa.me/${w.number}?text=${encodeURIComponent(custom ?? w.message)}`;
}

export const fullAddress = `${site.address.street} – ${site.address.district}, ${site.address.city} – ${site.address.state}`;
