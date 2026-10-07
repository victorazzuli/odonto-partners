"use client";
import { useRef, useState } from "react";

/**
 * Proteção anti-spam sem CAPTCHA intrusivo:
 *  1) honeypot invisível ("website")
 *  2) tempo mínimo de preenchimento (bots enviam em < 3s)
 *  3) limite de envios por sessão
 * Para produção com alto volume, combine com Cloudflare Turnstile no endpoint.
 */
export function useProtectedSubmit({
  endpoint,
  fallback,
}: {
  endpoint: string;
  fallback: (data: Record<string, string>) => string; // retorna URL (WhatsApp/mailto)
}) {
  const startedAt = useRef(Date.now());
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return setState("sent"); // honeypot: finge sucesso
    if (Date.now() - startedAt.current < 3000) {
      setError("Por favor, revise os dados e envie novamente.");
      return setState("error");
    }
    let count = 0;
    try { count = Number(sessionStorage.getItem("op-forms") ?? 0); sessionStorage.setItem("op-forms", String(count + 1)); } catch {}
    if (count >= 5) {
      setError("Limite de envios atingido. Fale com a equipe pelo WhatsApp.");
      return setState("error");
    }
    delete data.website;
    setState("sending");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        window.open(fallback(data), "_blank", "noopener,noreferrer");
      }
      setState("sent");
      form.reset();
    } catch {
      setError("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
      setState("error");
    }
  }

  return { onSubmit, state, error, viaWhatsApp: !endpoint };
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
