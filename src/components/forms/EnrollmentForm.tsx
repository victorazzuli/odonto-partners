"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site, waLink } from "@/config/site";
import { courses } from "@/data/courses";
import { getStatus } from "@/lib/course-status";
import { Honeypot, useProtectedSubmit } from "./useProtectedSubmit";

const professions = ["Cirurgião(ã)-Dentista", "Médico(a)", "Biomédico(a)", "Farmacêutico(a)", "Enfermeiro(a)", "Outra"];
const states = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO Exterior".split(" ");

export function EnrollmentForm() {
  const params = useSearchParams();
  const preselected = params.get("curso") ?? "";
  const available = courses.filter((c) => !["realizado", "esgotado"].includes(getStatus(c)));

  const { onSubmit, state, error, viaWhatsApp } = useProtectedSubmit({
    endpoint: site.forms.enrollmentEndpoint,
    fallback: (d) => {
      const course = courses.find((c) => c.slug === d.curso)?.title ?? d.curso;
      return waLink(
        "inscricoes",
        `Olá! Quero me inscrever.\n\nCurso: ${course}\nNome: ${d.nome}\nE-mail: ${d.email}\nWhatsApp: ${d.telefone}\nProfissão: ${d.profissao}${d.cro ? ` — ${d.cro}` : ""}\nCidade/UF: ${d.cidade}/${d.uf}\nComo conheceu: ${d.origem || "-"}\n${d.observacoes ? `\nObservações: ${d.observacoes}` : ""}`,
      );
    },
  });

  if (state === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-bone/15 p-10">
        <p className="eyebrow">Pré-inscrição recebida</p>
        <p className="mt-4 font-serif text-4xl">Seu lugar começa aqui.</p>
        <p className="mt-4 max-w-lg text-bone/65">
          {viaWhatsApp
            ? "Abrimos o WhatsApp de inscrições com os seus dados — confirme o envio para que nossa equipe valide a disponibilidade de vagas e as condições."
            : "Nossa equipe entrará em contato para confirmar a disponibilidade de vagas e as condições de pagamento."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8 md:grid-cols-2">
      <Honeypot />
      <fieldset className="contents">
        <legend className="eyebrow md:col-span-2">01 · Curso de interesse</legend>
        <label className="md:col-span-2">
          <span className="field-label">Curso *</span>
          <select name="curso" required defaultValue={preselected} className="field bg-ink">
            <option value="" disabled>Selecione o curso</option>
            <optgroup label="Harmonização Orofacial">
              {available.filter((c) => c.area === "hof").map((c) => <option key={c.slug} value={c.slug}>{c.title}{c.dateLabel && c.start ? ` — ${c.dateLabel.replace(/^Início:\s*/, "")}` : ""}</option>)}
            </optgroup>
            <optgroup label="Odontologia Clássica">
              {available.filter((c) => c.area === "classica").map((c) => <option key={c.slug} value={c.slug}>{c.title}{c.dateLabel && c.start ? ` — ${c.dateLabel}` : ""}</option>)}
            </optgroup>
          </select>
        </label>
      </fieldset>

      <fieldset className="contents">
        <legend className="eyebrow mt-4 md:col-span-2">02 · Seus dados</legend>
        <label><span className="field-label">Nome completo *</span><input name="nome" required autoComplete="name" className="field" /></label>
        <label><span className="field-label">E-mail *</span><input name="email" type="email" required autoComplete="email" className="field" /></label>
        <label><span className="field-label">WhatsApp *</span><input name="telefone" type="tel" required inputMode="tel" autoComplete="tel" pattern="[0-9()+\-\s]{8,20}" className="field" /></label>
        <label>
          <span className="field-label">Profissão *</span>
          <select name="profissao" required defaultValue="" className="field bg-ink">
            <option value="" disabled>Selecione</option>
            {professions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label><span className="field-label">Registro profissional (CRO/CRM…)</span><input name="cro" className="field" placeholder="Ex.: CRO/SP 00000" /></label>
        <div className="grid grid-cols-[1fr_7rem] gap-4">
          <label><span className="field-label">Cidade *</span><input name="cidade" required autoComplete="address-level2" className="field" /></label>
          <label>
            <span className="field-label">UF *</span>
            <select name="uf" required defaultValue="" className="field bg-ink"><option value="" disabled>—</option>{states.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
        </div>
      </fieldset>

      <fieldset className="contents">
        <legend className="eyebrow mt-4 md:col-span-2">03 · Complementos</legend>
        <label>
          <span className="field-label">Como conheceu a Odonto Partners?</span>
          <select name="origem" defaultValue="" className="field bg-ink">
            <option value="">Prefiro não informar</option>
            {["Instagram", "Indicação de colega", "Google", "YouTube", "Congresso / evento", "Já fui aluno(a)"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label><span className="field-label">Observações</span><input name="observacoes" maxLength={500} className="field" /></label>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-bone/65 md:col-span-2">
        <input type="checkbox" name="consentimento" value="sim" required className="mt-1 h-5 w-5 shrink-0 accent-bone" />
        <span>Autorizo o uso destes dados para o processo de inscrição, conforme a <Link href="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</Link>. *</span>
      </label>

      {state === "error" && <p role="alert" className="text-sm text-signal-live md:col-span-2">{error}</p>}
      <div className="flex flex-wrap items-center gap-5 md:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar pré-inscrição"}</button>
        <p className="text-xs text-bone/40">Não pedimos CPF, documentos ou dados de pagamento neste formulário.</p>
      </div>
    </form>
  );
}
