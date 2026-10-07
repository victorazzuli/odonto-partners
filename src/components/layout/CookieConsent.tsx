"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };
const KEY = "op-consent-v1";

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/**
 * Banner LGPD. Nada de analytics/marketing é carregado antes do consentimento.
 * O Google Tag Manager do site atual só é injetado se "analytics" ou "marketing" forem aceitos.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = read();
    setConsent(c);
    if (!c) {
      const t = setTimeout(() => setShow(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const open = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-open-cookie-preferences]");
      if (!el) return;
      const c = read();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setPrefs(true);
      setShow(true);
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);

  function save(a: boolean, m: boolean) {
    const c: Consent = { necessary: true, analytics: a, marketing: m, date: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
    setConsent(c);
    setShow(false);
    setPrefs(false);
  }

  const loadTags = consent && (consent.analytics || consent.marketing);

  return (
    <>
      {loadTags &&
        site.analytics.gtmIds.map((id) => (
          <Script key={id} id={`gtm-${id}`} strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
          </Script>
        ))}

      <AnimatePresence>
        {show && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Preferências de cookies"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-3xl border border-bone/10 bg-ink-800/95 p-6 text-bone shadow-2xl backdrop-blur-xl md:inset-x-auto md:left-8 md:bottom-8"
          >
            <p className="eyebrow">Privacidade</p>
            <p className="mt-3 text-sm leading-relaxed text-bone/75">
              Usamos cookies necessários para o funcionamento do site e, com a sua autorização, cookies de análise e de publicidade para entender a navegação e personalizar conteúdos. Saiba mais na{" "}
              <Link href="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</Link>.
            </p>

            {prefs && (
              <fieldset className="mt-5 space-y-3 border-t border-bone/10 pt-5 text-sm">
                <legend className="sr-only">Categorias de cookies</legend>
                <label className="flex items-center justify-between gap-4 text-bone/60">
                  <span>Necessários <span className="text-xs">(sempre ativos)</span></span>
                  <input type="checkbox" checked disabled className="h-5 w-5 accent-bone" />
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span>Análise e desempenho</span>
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-5 w-5 accent-bone" />
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span>Publicidade</span>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-5 w-5 accent-bone" />
                </label>
              </fieldset>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {prefs ? (
                <button type="button" onClick={() => save(analytics, marketing)} className="btn btn-primary !min-h-[44px] !px-5 !py-3">Salvar preferências</button>
              ) : (
                <>
                  <button type="button" onClick={() => save(true, true)} className="btn btn-primary !min-h-[44px] !px-5 !py-3">Aceitar todos</button>
                  <button type="button" onClick={() => save(false, false)} className="btn btn-ghost !min-h-[44px] !px-5 !py-3">Somente necessários</button>
                  <button type="button" onClick={() => setPrefs(true)} className="px-3 text-xs uppercase tracking-[0.16em] text-bone/60 underline-offset-4 hover:text-bone hover:underline">Personalizar</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
