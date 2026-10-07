"use client";
import { useMemo, useState } from "react";
import { procedures } from "@/data/content";
import { waLink } from "@/config/site";
import { cn } from "@/lib/utils";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
type Tab = "todos" | "classica" | "hof";

export function ProcedureExplorer({ light = false }: { light?: boolean }) {
  const [tab, setTab] = useState<Tab>("todos");
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const nq = norm(q.trim());
    const f = (l: string[]) => l.filter((p) => !nq || norm(p).includes(nq));
    return [
      { key: "classica" as const, title: "Odontologia Clássica", items: tab === "hof" ? [] : f(procedures.classica) },
      { key: "hof" as const, title: "Harmonização Orofacial", items: tab === "classica" ? [] : f(procedures.hof) },
    ].filter((g) => g.items.length);
  }, [tab, q]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const base = light ? "border-ink/15 text-ink/70 hover:border-ink/50" : "border-bone/15 text-bone/70 hover:border-bone/50";
  const active = light ? "border-ink bg-ink text-bone" : "border-bone bg-bone text-ink";

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Áreas" className="no-scrollbar flex gap-2 overflow-x-auto">
          {([["todos", "Todos"], ["classica", "Odontologia Clássica"], ["hof", "Harmonização Orofacial"]] as [Tab, string][]).map(([k, l]) => (
            <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)} className={cn("chip shrink-0", tab === k ? active : base)}>{l}</button>
          ))}
        </div>
        <label className="relative">
          <span className="sr-only">Buscar procedimento</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar procedimento…"
            className={cn("h-11 w-full rounded-full border bg-transparent px-5 text-sm focus:outline-none md:w-72", light ? "border-ink/20 placeholder:text-ink/40 focus:border-ink" : "border-bone/15 placeholder:text-bone/40 focus:border-bone")}
          />
        </label>
      </div>
      <p className={cn("mt-6 text-sm", light ? "text-ink/50" : "text-bone/50")} aria-live="polite">{total} procedimentos</p>

      <div className="mt-6 space-y-14">
        {groups.map((g) => (
          <div key={g.key}>
            <h3 className="font-serif text-3xl md:text-4xl">{g.title}</h3>
            <ul className={cn("mt-6 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 xl:grid-cols-3", light ? "border-ink/10 bg-ink/10" : "border-bone/10 bg-bone/10")}>
              {g.items.map((p) => (
                <li key={p} className={light ? "bg-bone" : "bg-ink"}>
                  <a
                    href={waLink("pacientes", `Olá! Gostaria de ser paciente modelo para: ${p}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("group flex h-full min-h-[84px] items-center justify-between gap-4 px-6 py-5 transition", light ? "hover:bg-bone-200" : "hover:bg-ink-800")}
                  >
                    <span className="text-[0.98rem] leading-snug">{p}</span>
                    <span className={cn("shrink-0 text-xs uppercase tracking-[0.16em] opacity-0 transition group-hover:opacity-100", light ? "text-ink/60" : "text-bone/60")}>Agendar →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {total === 0 && <p className="text-lg">Nenhum procedimento encontrado. Fale com a Central de Pacientes para tirar sua dúvida.</p>}
      </div>
    </div>
  );
}
