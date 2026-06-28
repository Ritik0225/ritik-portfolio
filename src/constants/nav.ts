export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Philosophy", href: "#philosophy", id: "philosophy" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const sectionIds = navItems.map((n) => n.id);
