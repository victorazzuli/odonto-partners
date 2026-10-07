import { cn } from "@/lib/utils";
import { RevealLines, Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow, title, intro, align = "left", className, size = "md", id,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode[];
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
          <span className="h-px w-10 bg-current opacity-30" aria-hidden />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <h2 id={id} className={cn("font-serif", size === "lg" ? "text-display-lg" : "text-display-md")}>
        <RevealLines lines={title} />
      </h2>
      {intro && (
        <Reveal delay={0.2} className={cn("mt-7 max-w-prose text-base leading-relaxed opacity-70 md:text-lg", align === "center" && "mx-auto")}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
