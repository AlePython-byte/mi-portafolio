export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain"; // por defecto "cover"
  imagePosition?: "center" | "top"; // por defecto "center"
  tags: string[];
  githubUrl: string; // "#" = aún no disponible
  demoUrl: string; // "#" = aún no disponible
  demoLabel: "Ver demo" | "Ver video" | "Ver release";
  details: ProjectDetails;
};

export type ProjectDetails = {
  summary: string;
  features: string[];
  stack: { label: string; items: string[] }[];
  highlights?: string[];
};

export type ProjectsData = {
  label: string;
  headline: string;
  subtitle: string;
  countSingular: string;
  countPlural: string;
  githubLabel: string;
  comingSoon: string;
  placeholderImage: string;
  moreInfo: string;
  moreInfoAria: string; // usa {title}
  close: string;
  whatItDoes: string;
  stackTitle: string;
  detailsTitle: string;
  githubDisabledAria: string; // usa {title}
  demoDisabledAria: string; // usa {kind} y {title}
  demoKinds: Record<Project["demoLabel"], string>;
  projects: Project[];
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

export type SkillItem = {
  name: string;
  icon?: string; // clave del mapa de iconos; sin ella se muestra solo texto
};

export type SkillGroup = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: SkillItem[];
};

export type SkillsData = {
  label: string;
  headline: string;
  subtitle: string;
  hint: string;
  groups: SkillGroup[];
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
  tag: string;
  tagline: string;
  location: string;
  semester: string;
  email: string;
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

export type AboutEducation = {
  degree: string;
  institution: string;
  campus: string;
};

export type AboutData = {
  headline: string;
  paragraph: string;
  interestsTitle: string;
  interests: string[];
  educationTitle: string;
  education: AboutEducation;
  focusTitle: string;
  focus: string;
  locationLabel: string;
  semesterLabel: string;
};

export type PersonalCard = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  text: string;
  badge?: string;
  label?: string;
  subtitle?: string;
  note?: string;
  vinyl?: boolean;
};

export type PersonalData = {
  label: string;
  headline: string;
  subtitle: string;
  cardsLabel: string;
  thumbnailsLabel: string;
  backLabel: string;
  pauseLabel: string;
  resumeLabel: string;
  cards: PersonalCard[];
};
