export type Project = {
  id: string;
  title: string;
  summary: string;
  description?: string;
  image?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year?: number;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company?: string;
  quote: string;
  avatar?: string;
};

export type Experience = {
  id: string;
  kind: "academic" | "work";
  role: string;
  company: string;
  location?: string;
  startDate: string; // ISO "YYYY-MM"
  endDate?: string; // omitido = actual
  highlights: string[];
  stack?: string[];
};

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  id: string;
  name: string;
  category: "frontend" | "backend" | "herramientas" | "otros";
  level: SkillLevel;
  icon?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Language = {
  code: string;
  label: string;
};

export type UiLabels = {
  navAriaLabel: string;
  menuOpen: string;
  menuClose: string;
  themeToLight: string;
  themeToDark: string;
  languageGroup: string;
  downloadCv: string;
  viewProjects: string;
  projectsHref: string;
  socialAriaLabel: string;
};

export type Profile = {
  name: string;
  initials: string;
  photo: string;
  photoAlt: string;
  role: string;
  tagline: string;
  location: string;
  semester: string;
  cvUrl: string;
  social: SocialLink[];
};

export type ExtraItem = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  icon?: string;
};
