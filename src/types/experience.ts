export interface Experience {
  id: string;
  role: string;
  company: string;
  type: "Full-time" | "Contract" | "Freelance" | "Internship";
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  responsibilities: string[];
  technologies: string[];
  link?: string;
}
