import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
  if (input === "Present") return "Present";
  const [year, month] = input.split("-").map(Number);
  if (!year) return input;
  const date = new Date(year, (month ?? 1) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}

export function calcDuration(start: string, end: string): string {
  const [sy, sm] = start.split("-").map(Number);
  const endDate = end === "Present" ? new Date() : (() => {
    const [ey, em] = end.split("-").map(Number);
    return new Date(ey, (em ?? 1) - 1, 1);
  })();
  const startDate = new Date(sy, (sm ?? 1) - 1, 1);
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y && m) return `${y}y ${m}mo`;
  if (y) return `${y}y`;
  return `${m}mo`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
