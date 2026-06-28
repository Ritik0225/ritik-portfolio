import personalRaw from "./personal.json";
import projectsRaw from "./projects.json";
import skillsRaw from "./skills.json";
import experienceRaw from "./experience.json";
import educationRaw from "./education.json";
import socialsRaw from "./socials.json";
import testimonialsRaw from "./testimonials.json";

import type {
  Personal,
  Project,
  SkillGroup,
  Experience,
  Education,
  Social,
  Testimonial,
} from "@/types";

export const personal: Personal = personalRaw as Personal;
export const projects: Project[] = projectsRaw as Project[];
export const skills: SkillGroup[] = skillsRaw as SkillGroup[];
export const experience: Experience[] = experienceRaw as Experience[];
export const education: Education[] = educationRaw as Education[];
export const socials: Social[] = socialsRaw as Social[];
export const testimonials: Testimonial[] = testimonialsRaw as Testimonial[];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
