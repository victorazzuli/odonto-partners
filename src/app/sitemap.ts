import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { courses } from "@/data/courses";
import { professors } from "@/data/professors";
import { posts } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = [
    ["", 1], ["/cursos", 0.95], ["/cursos/harmonizacao-facial", 0.9], ["/cursos/odontologia-classica", 0.9],
    ["/paciente-modelo", 0.9], ["/procedimentos", 0.8], ["/quem-somos", 0.8], ["/equipe", 0.8],
    ["/ficha-de-inscricao", 0.8], ["/contato", 0.7], ["/galeria", 0.6], ["/blog", 0.7], ["/politica-de-privacidade", 0.2],
  ] as const;
  return [
    ...statics.map(([p, priority]) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority })),
    ...courses.map((c) => ({ url: `${site.url}/curso/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 })),
    ...professors.map((p) => ({ url: `${site.url}/equipe/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
