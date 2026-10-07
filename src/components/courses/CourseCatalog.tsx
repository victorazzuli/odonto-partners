"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Course } from "@/data/courses";
import { getStatus, sortCatalog, statusMeta, todaySP } from "@/lib/course-status";
import { CourseCard } from "./CourseCard";
import { cn } from "@/lib/utils";

type FilterKey =
  | "todos" | "hof" | "classica" | "imersao" | "especializacao" | "residencia" | "mentoria" | "evento" | "internacional" | "online";

const FILTERS: { key: FilterKey; label: string; test: (c: Course) => boolean }[] = [
  { key: "todos", label: "Todos", test: () => true },
  { key: "hof", label: "Harmonização Facial", test: (c) => c.area === "hof" },
  { key: "classica", label: "Odontologia Clássica", test: (c) => c.area === "classica" },
  { key: "imersao", label: "Imersões", test: (c) => c.format === "imersao" },
  { key: "especializacao", label: "Especializações", test: (c) => c.format === "especializacao" },
  { key: "residencia", label: "Residências", test: (c) => c.format === "residencia" },
  { key: "mentoria", label: "Mentorias", test: (c) => c.format === "mentoria" },
  { key: "evento", label: "Eventos", test: (c) => c.format === "evento" || c.format === "programa" },
  { key: "internacional", label: "Internacional", test: (c) => !!c.international },
  { key: "online", label: "Online", test: (c) => !!c.online },
];

const STATUS_FILTERS = ["Todos os status", "Vagas abertas", "Últimas vagas", "Em breve", "Em andamento", "Vagas esgotadas", "Realizados"];

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function CourseCatalog({ courses, lockArea }: { courses: Course[]; lockArea?: "hof" | "classica" }) {
  const params = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>((params.get("filtro") as FilterKey) || "todos");
  const [q, setQ] = useState(params.get("q") ?? "");
  const [status, setStatus] = useState("Todos os status");
  const [month, setMonth] = useState("todas");
  const [today, setToday] = useState(todaySP());
  useEffect(() => setToday(todaySP()), []);

  // URL compartilhável (?filtro=residencia&q=toxina)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filter !== "todos") sp.set("filtro", filter);
    if (q) sp.set("q", q);
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [filter, q, router]);

  const base = useMemo(() => (lockArea ? courses.filter((c) => c.area === lockArea) : courses), [courses, lockArea]);
  const filters = FILTERS.filter((f) => !lockArea || !["hof", "classica"].includes(f.key));

  const months = useMemo(() => {
    const set = new Map<string, string>();
    base.forEach((c) => {
      if (c.start && c.start >= today.slice(0, 7)) {
        const key = c.start.slice(0, 7);
        const label = new Date(`${key}-15T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
        set.set(key, label);
      }
    });
    return [...set.entries()].sort();
  }, [base, today]);

  const results = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter)!;
    const nq = norm(q.trim());
    return sortCatalog(
      base.filter(
        (c) =>
          f.test(c) &&
          (!nq || norm(`${c.title} ${c.summary ?? ""} ${c.audience ?? ""}`).includes(nq)) &&
          (status === "Todos os status" || statusMeta[getStatus(c, today)].filter === status) &&
          (month === "todas" || c.start?.startsWith(month)),
      ),
      today,
    );
  }, [base, filter, q, status, month, today]);

  const reset = () => { setFilter("todos"); setQ(""); setStatus("Todos os status"); setMonth("todas"); };

  return (
    <div>
      {/* Barra de filtros */}
      <div className="sticky top-0 z-30 -mx-5 border-b border-bone/10 bg-ink/85 px-5 py-4 backdrop-blur-xl md:-mx-8 md:px-8 xl:-mx-12 xl:px-12">
        <div className="flex flex-col gap-3">
          <div role="tablist" aria-label="Categorias de curso" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {filters.map((f) => {
              const count = base.filter(f.test).length;
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  disabled={count === 0}
                  title={count === 0 ? "Nenhum curso nesta categoria no momento" : undefined}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "chip shrink-0",
                    active ? "border-bone bg-bone text-ink" : "border-bone/15 text-bone/70 hover:border-bone/50 hover:text-bone",
                    count === 0 && "cursor-not-allowed opacity-35 hover:border-bone/15 hover:text-bone/70",
                  )}
                >
                  {f.label}
                  <span className={cn("text-[0.6rem]", active ? "text-ink/50" : "text-bone/35")}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <label className="relative col-span-2 sm:col-span-1">
              <span className="sr-only">Buscar curso</span>
              <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/40" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5" /><path d="m11 11 3.5 3.5" /></svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar curso…"
                className="h-11 w-full rounded-full border border-bone/15 bg-transparent pl-11 pr-4 text-sm text-bone placeholder:text-bone/40 focus:border-bone focus:outline-none sm:w-72"
              />
            </label>
            <label>
              <span className="sr-only">Filtrar por status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 w-full sm:w-52 rounded-full border border-bone/15 bg-ink px-4 text-sm text-bone focus:border-bone focus:outline-none">
                {STATUS_FILTERS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Filtrar por data</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="h-11 w-full sm:w-52 rounded-full border border-bone/15 bg-ink px-4 text-sm capitalize text-bone focus:border-bone focus:outline-none">
                <option value="todas">Todas as datas</option>
                {months.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-bone/50" aria-live="polite">
        {results.length} {results.length === 1 ? "curso encontrado" : "cursos encontrados"}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-bone/10 p-10 text-center">
          <p className="font-serif text-3xl">Nenhum curso com esses filtros.</p>
          <button type="button" onClick={reset} className="btn btn-ghost mt-6">Limpar filtros</button>
        </div>
      ) : (
        <motion.ul layout className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((c, i) => (
              <motion.li
                layout
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <CourseCard course={c} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
