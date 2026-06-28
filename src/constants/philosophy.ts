export interface PhilosophyPrinciple {
  number: string;
  title: string;
  description: string;
}

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: "01",
    title: "Architect for scale before you need it",
    description:
      "Design boundaries that hold up under 10x load. Composable services, idempotent contracts, and observable seams — not premature optimization, but durable shape.",
  },
  {
    number: "02",
    title: "Performance is a feature",
    description:
      "Every millisecond of TTFB is a UX promise. Budget it like a constraint, measure it in production, defend it in CI.",
  },
  {
    number: "03",
    title: "Clean code, honestly applied",
    description:
      "Readable names, narrow modules, explicit data flow. Abstractions earn their place by erasing duplication — never by anticipating it.",
  },
  {
    number: "04",
    title: "Maintainability over cleverness",
    description:
      "Code is read ten times more than it is written. Optimize for the next engineer — including the one I'll be in six months.",
  },
  {
    number: "05",
    title: "UI/UX is engineering",
    description:
      "Pixel craft, motion, accessibility, and feedback are not polish layers — they are core product surface and they deserve the same rigor as any backend system.",
  },
];
