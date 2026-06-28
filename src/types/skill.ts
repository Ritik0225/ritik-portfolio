export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Shopify"
  | "Dev Tools";

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  years?: number;
}

export interface SkillGroup {
  category: SkillCategory;
  title: string;
  description: string;
  skills: Skill[];
}
