/**
 * Design tokens. Source of truth for non-Tailwind references.
 * The Tailwind theme in `tailwind.config.ts` mirrors these values.
 */
export const tokens = {
  color: {
    ink: {
      950: "#050816",
      900: "#0B1120",
      800: "#111827",
    },
    brand: {
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
    },
    surface: "rgba(255,255,255,0.04)",
    lightBg: {
      0: "#F8FAFC",
      1: "#E2E8F0",
    },
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
  motion: {
    easeOutExpo: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
} as const;
