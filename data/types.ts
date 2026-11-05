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

// Los testimonios no se traducen: son citas literales de otras personas.
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  placeholder: boolean; // true = contenido de ejemplo
};

export type TestimonialsData = {
  headline: LocalizedText;
  listLabel: LocalizedText;
  exampleBadge: LocalizedText;
  items: Testimonial[];
};

// En los campos que admiten null, null significa "por completar" y se muestra
// como un texto neutro; undefined significa que el dato no se muestra.
export type Experience = {
  id: string;
  kind: "academic" | "work";
  title: LocalizedText;
  organization?: LocalizedText | null; // institución, empresa u organizador
  organizationLabel?: LocalizedText; // p. ej. "Organizador"
  role?: LocalizedText;
  location?: LocalizedText;
  period?: LocalizedText | null;
  periodLabel?: LocalizedText; // p. ej. "Fecha de inicio"
  ongoing?: boolean; // muestra la etiqueta "En curso"
  description?: LocalizedText | null;
  // Ids de data/projects.ts; se muestran como "Proyectos destacados".
  relatedProjectIds?: string[];
  // Solo se muestra si el archivo existe en public/ (se comprueba en el servidor).
  badge?: { src: string; alt: LocalizedText };
};

export type ExperienceData = {
  headline: LocalizedText;
  academicTitle: LocalizedText;
  workTitle: LocalizedText;
  pending: LocalizedText;
  ongoing: LocalizedText;
  featuredProjectsTitle: LocalizedText;
  viewBadge: LocalizedText;
  viewBadgeAria: LocalizedText; // usa {title}
  close: LocalizedText;
  items: Experience[];
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
  profileCardLabel: LocalizedText;
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
  albumCover?: string; // etiqueta central del vinilo
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

export type RetroApp = {
  id: string;
  label: LocalizedText;
  icon: "folder" | "document";
};

export type RetroData = {
  powerOn: LocalizedText; // botón del modo plano
  desktopLabel: LocalizedText;
  iconsLabel: LocalizedText;
  windowsLabel: LocalizedText;
  taskbarLabel: LocalizedText;
  minimize: LocalizedText;
  close: LocalizedText;
  start: LocalizedText;
  startMenuLabel: LocalizedText;
  shutdown: LocalizedText;
  languageToEn: LocalizedText;
  languageToEs: LocalizedText;
  placeholder: LocalizedText;
  back: LocalizedText;
  projectListLabel: LocalizedText;
  skillGroupsLabel: LocalizedText;
  apps: RetroApp[];
};

export type AssistantQuickQuestion = {
  id: string;
  question: LocalizedText; // texto del botón y de la pregunta enviada
  answer: LocalizedText;
};

export type AssistantData = {
  openLabel: LocalizedText; // aria-label del botón con la gata
  bubble: LocalizedText;
  chatTitle: LocalizedText;
  greeting: LocalizedText;
  historyLabel: LocalizedText;
  quickLabel: LocalizedText;
  inputLabel: LocalizedText;
  send: LocalizedText;
  typing: LocalizedText;
  fallback: LocalizedText;
  rateLimited: LocalizedText;
  quickQuestions: AssistantQuickQuestion[];
};
