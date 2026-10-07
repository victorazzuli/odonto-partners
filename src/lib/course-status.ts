import type { Course } from "@/data/courses";

export type StatusKey =
  | "abertas"
  | "andamento"
  | "realizado"
  | "esgotado"
  | "esgotado-aguardando"
  | "reserva"
  | "ultimas-vagas"
  | "em-breve"
  | "consulte";

export const statusMeta: Record<StatusKey, { label: string; tone: "open" | "soon" | "closed" | "live"; filter: string }> = {
  abertas: { label: "Inscrições abertas", tone: "open", filter: "Vagas abertas" },
  reserva: { label: "Reservas abertas", tone: "open", filter: "Vagas abertas" },
  "ultimas-vagas": { label: "Últimas vagas", tone: "soon", filter: "Últimas vagas" },
  "em-breve": { label: "Em breve", tone: "soon", filter: "Em breve" },
  andamento: { label: "Turma em andamento", tone: "live", filter: "Em andamento" },
  esgotado: { label: "Vagas esgotadas", tone: "closed", filter: "Vagas esgotadas" },
  "esgotado-aguardando": { label: "Esgotado · aguardando novas datas", tone: "closed", filter: "Vagas esgotadas" },
  realizado: { label: "Turma realizada", tone: "closed", filter: "Realizados" },
  consulte: { label: "Consulte datas", tone: "soon", filter: "Em breve" },
};

/** Dia atual em São Paulo (YYYY-MM-DD) */
export function todaySP(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(d);
}

export function getStatus(c: Course, today = todaySP()): StatusKey {
  if (c.manualStatus) return c.manualStatus;
  if (c.start && c.end) {
    if (today < c.start) return "abertas";
    if (today <= c.end) return "andamento";
    return "realizado";
  }
  return "consulte";
}

/** Próximos cursos ordenados por data (somente futuros) */
export function upcoming(list: Course[], today = todaySP()) {
  return list
    .filter((c) => c.start && getStatus(c, today) === "abertas")
    .sort((a, b) => (a.start! < b.start! ? -1 : 1));
}

const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
export function shortDate(c: Course) {
  if (!c.start) return null;
  const [y, m, d] = c.start.split("-");
  const [, m2, d2] = (c.end ?? c.start).split("-");
  const range = c.end && c.end !== c.start ? (m === m2 ? `${d}–${d2}` : `${d}/${m}–${d2}/${m2}`) : d;
  return { day: range, month: months[Number(m) - 1], year: y };
}

/** Ordenação do catálogo: abertos por data → andamento → reserva/consulte → esgotados → realizados */
export function sortCatalog(list: Course[], today = todaySP()) {
  const rank: Record<StatusKey, number> = {
    "ultimas-vagas": 0, abertas: 0, andamento: 1, reserva: 2, "em-breve": 2, consulte: 3,
    esgotado: 4, "esgotado-aguardando": 4, realizado: 5,
  };
  return [...list].sort((a, b) => {
    const ra = rank[getStatus(a, today)], rb = rank[getStatus(b, today)];
    if (ra !== rb) return ra - rb;
    return (a.start ?? "9999") < (b.start ?? "9999") ? -1 : 1;
  });
}
