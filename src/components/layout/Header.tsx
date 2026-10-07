"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navigation, site, waLink } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/cursos" ? pathname === "/cursos" : pathname.startsWith(href));

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink">
        Pular para o conteúdo
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-luxe",
          scrolled && !open ? "border-b border-bone/10 bg-ink/70 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-wide items-center justify-between gap-6 px-5 md:px-8 xl:h-[84px] xl:px-12">
          <Link href="/" className="relative z-10 text-bone" aria-label="Odonto Partners — página inicial">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden 2xl:block">
            <ul className="flex items-center gap-7">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "link-underline pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                      isActive(n.href) ? "text-bone" : "text-bone/65 hover:text-bone",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <a href={site.studentArea} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-bone/25 px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-bone/85 transition hover:border-bone hover:text-bone md:inline-flex">
              Sou aluno
            </a>
            <Link href="/ficha-de-inscricao" className="hidden rounded-full bg-bone px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-white sm:inline-flex">
              Quero me inscrever
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 2xl:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-bone transition-transform duration-500 ease-luxe", open && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-bone transition-transform duration-500 ease-luxe", open && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pb-10 pt-28 md:px-8"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Menu móvel" className="flex-1">
              <ul className="divide-y divide-bone/10 border-y border-bone/10">
                {[{ label: "Início", href: "/" }, ...navigation].map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={n.href} className="flex items-baseline justify-between py-4 font-serif text-[2rem] leading-none text-bone md:text-5xl">
                      <span>{n.label}</span>
                      <span className="font-sans text-[0.65rem] tracking-[0.2em] text-bone/40">{String(i).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Link href="/ficha-de-inscricao" className="btn btn-primary">Quero me inscrever</Link>
              <a href={site.studentArea} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Área do aluno</a>
              <a href={waLink("pacientes")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost sm:col-span-2">Quero ser paciente modelo</a>
            </div>
            <p className="mt-8 text-sm text-bone/50">{site.contact.email} · {site.contact.hoursShort}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
