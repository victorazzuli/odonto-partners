"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, waLink } from "@/config/site";

const Icon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="currentColor">
    <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.33-1.4a9.86 9.86 0 0 0 4.71 1.2h.01c5.44 0 9.87-4.43 9.87-9.87A9.86 9.86 0 0 0 12.04 2Zm5.77 14.07c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.27.53-.34.71-.34l.51.01c.16 0 .38-.06.6.46.23.54.77 1.87.84 2 .07.14.11.3.02.48-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.58-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.57.74 1.84.88.27.13.45.2.52.31.07.11.07.65-.17 1.33Z" />
  </svg>
);

/** Botão flutuante com dois destinos reais: Cursos e Central de Pacientes */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const options = [
    { label: "Quero informações sobre cursos", sub: site.whatsapp.cursos.display, href: waLink("cursos") },
    { label: "Quero ser paciente modelo", sub: site.whatsapp.pacientes.display, href: waLink("pacientes") },
  ];

  return (
    <div className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-700 ease-luxe md:bottom-8 md:right-8 ${visible || open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="wa-options"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(88vw,320px)] overflow-hidden rounded-2xl border border-bone/10 bg-ink-800/95 shadow-2xl backdrop-blur-xl"
          >
            {options.map((o) => (
              <li key={o.href} className="border-b border-bone/10 last:border-0">
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-bone/5">
                  <span>
                    <span className="block text-sm text-bone">{o.label}</span>
                    <span className="mt-1 block text-xs text-bone/50">{o.sub}</span>
                  </span>
                  <span aria-hidden className="text-bone/40">→</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="wa-options"
        aria-label="Falar pelo WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bone text-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition hover:scale-105"
      >
        <Icon />
      </button>
    </div>
  );
}
