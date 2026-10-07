"use client";
import { useEffect, useState } from "react";
import type { Course } from "@/data/courses";
import { getStatus, statusMeta, type StatusKey } from "@/lib/course-status";
import { cn } from "@/lib/utils";

const tone = {
  open: "bg-signal-open",
  soon: "bg-signal-soon",
  closed: "bg-signal-closed",
  live: "bg-signal-live",
};

/** Status recalculado no navegador (a data do dia muda sem precisar de novo deploy) */
export function useCourseStatus(c: Course, initial: StatusKey) {
  const [s, setS] = useState(initial);
  useEffect(() => setS(getStatus(c)), [c]);
  return s;
}

export function StatusBadge({ course, initial, className }: { course: Course; initial: StatusKey; className?: string }) {
  const s = useCourseStatus(course, initial);
  const m = statusMeta[s];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-bone backdrop-blur-md", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", tone[m.tone])} aria-hidden />
      {m.label}
    </span>
  );
}
