"use client";
import Link from "next/link";
import { site, waLink } from "@/config/site";
import { Honeypot, useProtectedSubmit } from "./useProtectedSubmit";

const subjects = ["Informações sobre cursos", "Inscrição e vagas", "Quero ser paciente modelo", "Área do aluno", "Parcerias e imprensa", "Outro assunto"];

export function ContactForm() {
  const { onSubmit, state, error, viaWhatsApp } = useProtectedSubmit({
    endpoint: site.forms.contactEndpoint,
    fallback: (d) => {
      const kind = d.assunto === "Quero ser paciente modelo" ? "pacientes" : "cursos";
      return waLink(kind, `Olá! Sou ${d.nome} (${d.email}${d.telefone ? `, ${d.telefone}` : ""}).\nAssunto: ${d.assunto}\n\n${d.mensagem}`);
    },
  });

  if (state === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-bone/15 p-10">
        <p className="eyebrow">Mensagem enviada</p>
        <p className="mt-4 font-serif text-4xl">Obrigado pelo contato.</p>
        <p className="mt-4 text-bone/65">{viaWhatsApp ? "Abrimos o WhatsApp com a sua mensagem pronta — é só confirmar o envio." : "Nossa equipe retornará em breve, de segunda a sábado, das 8h às 18h."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8 md:grid-cols-2" aria-describedby="form-note">
      <Honeypot />
      <label className="md:col-span-1">
        <span className="field-label">Nome *</span>
        <input name="nome" required autoComplete="name" className="field" />
      </label>
      <label>
        <span className="field-label">E-mail *</span>
        <input name="email" type="email" required autoComplete="email" className="field" />
      </label>
      <label>
        <span className="field-label">Telefone / WhatsApp</span>
        <input name="telefone" type="tel" autoComplete="tel" inputMode="tel" className="field" pattern="[0-9()+\-\s]{8,20}" />
      </label>
      <label>
        <span className="field-label">Assunto *</span>
        <select name="assunto" required className="field bg-ink" defaultValue="">
          <option value="" disabled>Selecione</option>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="md:col-span-2">
        <span className="field-label">Mensagem *</span>
        <textarea name="mensagem" required rows={5} maxLength={2000} className="field resize-none" />
      </label>
      <label className="flex items-start gap-3 text-sm text-bone/65 md:col-span-2">
        <input type="checkbox" name="consentimento" value="sim" required className="mt-1 h-5 w-5 shrink-0 accent-bone" />
        <span>Concordo com o uso dos meus dados para responder a este contato, conforme a <Link href="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</Link>. *</span>
      </label>
      {state === "error" && <p role="alert" className="text-sm text-signal-live md:col-span-2">{error}</p>}
      <div className="flex flex-wrap items-center gap-5 md:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar mensagem"}</button>
        <p id="form-note" className="text-xs text-bone/40">Não solicitamos dados sensíveis. Campos com * são obrigatórios.</p>
      </div>
      <p className="text-xs text-bone/40 md:col-span-2">Para ser paciente modelo, é necessário entrar em contato com a Central de Pacientes <a className="underline" href={waLink("pacientes")} target="_blank" rel="noopener noreferrer">{site.whatsapp.pacientes.display}</a> e passar por uma avaliação.</p>
    </form>
  );
}
