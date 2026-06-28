export type ProjectCategory =
  | "MERN"
  | "Shopify"
  | "Full Stack"
  | "Frontend"
  | "Backend";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  url: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  cover?: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  client?: string;
  role?: string;
  stack: string[];
  metrics: ProjectMetric[];
  problem: string;
  architecture: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  optimizations: string[];
  screenshots: ProjectScreenshot[];
  liveUrl?: string;
  repoUrl?: string;
  confidential?: boolean;
}
