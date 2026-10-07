"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Imagem otimizada (AVIF/WebP, lazy, responsiva) com fallback elegante:
 * se a imagem falhar, exibe uma superfície grafite com o rótulo — nunca um quadro quebrado.
 */
export function SmartImage({ label, className, alt, ...props }: ImageProps & { label?: string }) {
  const [failed, setFailed] = useState(!props.src);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0 flex items-end bg-[radial-gradient(120%_90%_at_20%_0%,#2e3034_0%,#111113_60%)] p-5", className)}
      >
        {label && <span className="font-serif text-xl leading-tight text-bone/40">{label}</span>}
      </div>
    );
  }
  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
