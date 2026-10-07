"use client";
import { useState } from "react";
import type { BlogCategory, Post } from "@/data/content";
import { BlogCard } from "@/components/sections/BlogCard";
import { cn } from "@/lib/utils";

const CATS: BlogCategory[] = ["Harmonização Facial", "Odontologia", "Ciência", "Clínica", "Carreira", "Eventos", "Institucional"];

export function BlogIndex({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<"Todos" | BlogCategory>("Todos");
  const list = posts.filter((p) => cat === "Todos" || p.category === cat);
  const [first, ...rest] = list;
  return (
    <div>
      <div role="tablist" aria-label="Categorias do blog" className="no-scrollbar flex gap-2 overflow-x-auto">
        {(["Todos", ...CATS] as const).map((c) => {
          const n = c === "Todos" ? posts.length : posts.filter((p) => p.category === c).length;
          return (
            <button key={c} type="button" role="tab" aria-selected={cat === c} disabled={n === 0} onClick={() => setCat(c)}
              className={cn("chip shrink-0", cat === c ? "border-bone bg-bone text-ink" : "border-bone/15 text-bone/70 hover:border-bone/50", n === 0 && "opacity-35")}>
              {c} <span className="text-[0.6rem] opacity-50">{n}</span>
            </button>
          );
        })}
      </div>
      {first && (
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 lg:row-span-2"><BlogCard post={first} large /></div>
          {rest.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      )}
    </div>
  );
}
