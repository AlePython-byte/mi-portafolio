export type DemoLabel = "Ver demo" | "Ver video" | "Ver release";

export type Project = {
  id: string;
  title: string;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  imageFit?: "cover" | "contain"; // por defecto "cover"
  imagePosition?: "center" | "top"; // por defecto "center"
  tags: string[];
  githubUrl: string; // "#" = aún no disponible
  demoUrl: string; // "#" = aún no disponible
  demoLabel: DemoLabel;
  details: ProjectDetails;
};

// Un nombre de tecnología (texto único) o un texto traducible.
export type StackItem = string | LocalizedText;

export type ProjectDetails = {
  summary: LocalizedText;
  features: LocalizedText[];
  stack: { label: LocalizedText; items: StackItem[] }[];
  highlights?: LocalizedText[];
};

export type ProjectsData = {
  label: LocalizedText;
  headline: LocalizedText;
  subtitle: LocalizedText;
  countSingular: LocalizedText;
  countPlural: LocalizedText;
  githubLabel: LocalizedText;
  comingSoon: LocalizedText;
  placeholderImage: string;
  moreInfo: LocalizedText;
  moreInfoAria: LocalizedText; // usa {title}
  close: LocalizedText;
  whatItDoes: LocalizedText;
  stackTitle: LocalizedText;
  detailsTitle: LocalizedText;
  githubDisabledAria: LocalizedText; // usa {title}
  demoDisabledAria: LocalizedText; // usa {kind} y {title}
  demoKinds: Record<DemoLabel, LocalizedText>;
  demoLabels: Record<DemoLabel, LocalizedText>;
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
  role: LocalizedText;
  company: string;
  location?: LocalizedText;
  startDate: string; // ISO "YYYY-MM"
  endDate?: string; // omitido = actual
  highlights: LocalizedText[];
  stack?: string[];
};

export type SkillItem = {
  name: string;
  icon?: string; // clave del mapa de iconos; sin ella se muestra solo texto
};

export type SkillGroup = {
  id: string;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  items: SkillItem[];
};

export type SkillsData = {
  label: LocalizedText;
  headline: LocalizedText;
  subtitle: LocalizedText;
  hint: LocalizedText;
  groups: SkillGroup[];
};

export type SocialLink = {
  label: string;
  url: string;
};

export type NavLink = {
  label: LocalizedText;
  href: string;
};

export type Language = "es" | "en";

export type LocalizedText = Record<Language, string>;

export type LanguageOption = {
  code: Language;
  label: string;
};

export type UiLabels = {
  navAriaLabel: LocalizedText;
  menuOpen: LocalizedText;
  menuClose: LocalizedText;
  themeToLight: LocalizedText;
  themeToDark: LocalizedText;
  languageGroup: LocalizedText;
  downloadCv: LocalizedText;
  viewProjects: LocalizedText;
  projectsHref: string;
  socialAriaLabel: LocalizedText;
};

export type Profile = {
  name: string;
  initials: string;
  photo: string;
  photoAlt: LocalizedText;
  role: LocalizedText;
  tag: LocalizedText;
  tagline: LocalizedText;
  location: LocalizedText;
  semester: LocalizedText;
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
  degree: LocalizedText;
  institution: string;
  campus: LocalizedText;
};

export type AboutData = {
  headline: LocalizedText;
  paragraph: LocalizedText;
  interestsTitle: LocalizedText;
  interests: LocalizedText[];
  educationTitle: LocalizedText;
  education: AboutEducation;
  focusTitle: LocalizedText;
  focus: LocalizedText;
  locationLabel: LocalizedText;
  semesterLabel: LocalizedText;
};

export type PersonalCard = {
  id: string;
  image: string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  badge?: LocalizedText;
  label?: LocalizedText;
  subtitle?: LocalizedText;
  note?: LocalizedText;
  vinyl?: boolean;
};

export type PersonalData = {
  label: LocalizedText;
  headline: LocalizedText;
  subtitle: LocalizedText;
  cardsLabel: LocalizedText;
  thumbnailsLabel: LocalizedText;
  backLabel: LocalizedText;
  pauseLabel: LocalizedText;
  resumeLabel: LocalizedText;
  cards: PersonalCard[];
};

export type FooterData = {
  quickLinksLabel: LocalizedText;
  socialLabel: LocalizedText;
  backToTop: LocalizedText;
  credits: LocalizedText;
};

export type ContactFormData = {
  title: LocalizedText;
  name: LocalizedText;
  email: LocalizedText;
  message: LocalizedText;
  submit: LocalizedText;
  sending: LocalizedText;
  success: LocalizedText;
  error: LocalizedText;
  missingEndpoint: LocalizedText;
};

export type ContactData = {
  label: LocalizedText;
  headline: LocalizedText;
  body: LocalizedText;
  copy: LocalizedText;
  copied: LocalizedText;
  copyError: LocalizedText;
  socialLabel: LocalizedText;
  form: ContactFormData;
};
