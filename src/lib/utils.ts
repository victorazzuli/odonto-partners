export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}
export function initials(name: string) {
  return name
    .replace(/^(Dra?\.|Prof\.)\s*/i, "")
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}
