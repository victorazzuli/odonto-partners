import Link from "next/link";
import type { Post } from "@/data/content";
import { cn } from "@/lib/utils";

export function BlogCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className={cn("group relative flex h-full flex-col justify-between rounded-3xl border border-bone/10 p-7 transition duration-700 ease-luxe hover:border-bone/30 hover:bg-ink-800 md:p-9", large && "bg-ink-800 md:p-12")}>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 rounded-3xl" aria-label={post.title} />
      <div>
        <p className="eyebrow">{post.category}</p>
        <h3 className={cn("mt-6 font-serif leading-[1.08]", large ? "text-[clamp(2rem,4vw,3.4rem)]" : "text-[1.7rem]")}>{post.title}</h3>
        <p className="mt-5 line-clamp-3 text-[0.95rem] leading-relaxed text-bone/55">{post.excerpt}</p>
      </div>
      <p className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-bone/45">
        <span>{post.author ?? "Odonto Partners"}</span>
        <span className="transition group-hover:translate-x-1 group-hover:text-bone">Ler →</span>
      </p>
    </article>
  );
}
