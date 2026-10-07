import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Wordmark tipográfico. Para usar o arquivo oficial, defina site.logoSrc. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  if (site.logoSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logoSrc} alt="Odonto Partners" className={cn("h-8 w-auto", className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-3 leading-none", className)} aria-label="Odonto Partners">
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <path d="M13 26V14h5.2a4.2 4.2 0 0 1 0 8.4H13" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M21.5 14h5.3a4.2 4.2 0 0 1 0 8.4h-5.3V28" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
      </svg>
      {!compact && (
        <span className="flex flex-col">
          <span className="font-serif text-[1.35rem] tracking-[0.01em]">Odonto Partners</span>
          <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.32em] opacity-60">Clínica · Escola · Desde 2011</span>
        </span>
      )}
    </span>
  );
}
