"use client";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function FAQ({ items, light = false }: { items: { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className={cn("border-t", light ? "border-ink/15" : "border-bone/10")}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={cn("border-b", light ? "border-ink/15" : "border-bone/10")}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
              >
                <span>{f.q}</span>
                <span className={cn("relative h-4 w-4 shrink-0 transition-transform duration-500 ease-luxe", isOpen && "rotate-45")} aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              role="region"
              className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-luxe", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <p className={cn("overflow-hidden pr-10 leading-relaxed", isOpen && "pb-7", light ? "text-ink/65" : "text-bone/65")}>{f.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
