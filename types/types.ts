export type NavItem = {
  label: string;
  href: string;
};

export type Technology = {
  name: string;
  icon: string;
};

export type EducationMeta = {
  field: string;
  itemType: string;
  educationalLevel: string;
};

export type Education = {
  year: string;
  degree: string;
  institution: string;
  description: string;
  meta: EducationMeta;
};

export type ProjectCategory = "web" | "mobile" | "fullstack" | "all";

export type Project = {
  id: string;
  title: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  description: string;
  datePublished: string;
  technologies: string[];
  category: ProjectCategory;
};
