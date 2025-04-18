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
