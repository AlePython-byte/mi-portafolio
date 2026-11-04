import type { LanguageOption, NavLink, Profile, UiLabels } from "./types";

export const profile: Profile = {
  name: "Alejandro Parra",
  initials: "AP",
  photo: "/images/profile-placeholder.svg",
  photoAlt: {
    es: "Foto de perfil de Alejandro Parra",
    en: "Profile photo of Alejandro Parra",
  },
  role: {
    es: "Backend · Interfaces · Datos",
    en: "Backend · Interfaces · Data",
  },
  tag: {
    es: "Portafolio personal · 2026",
    en: "Personal portfolio · 2026",
  },
  tagline: {
    es: "Exploro el desarrollo de software desde el backend y los datos hasta las interfaces y la experiencia de usuario.",
    en: "I explore software development from the backend and data to interfaces and user experience.",
  },
  location: { es: "Pasto, Colombia", en: "Pasto, Colombia" },
  semester: { es: "Quinto semestre", en: "Fifth semester" },
  email: "jorgealejandroparrab@outlook.com",
  cvUrl: "/cv.pdf",
  social: [
    { label: "GitHub", url: "https://github.com/AlePython-byte" },
    // TODO: reemplazar por la URL real de LinkedIn.
    { label: "LinkedIn", url: "https://www.linkedin.com/in/usuario" },
    { label: "Instagram", url: "https://www.instagram.com/usuario" },
  ],
};

export const navLinks: NavLink[] = [
  { label: { es: "Inicio", en: "Home" }, href: "#inicio" },
  { label: { es: "Acerca de mí", en: "About me" }, href: "#acerca-de-mi" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#proyectos" },
  { label: { es: "Testimonios", en: "Testimonials" }, href: "#testimonios" },
  { label: { es: "Experiencia", en: "Experience" }, href: "#experiencia" },
  {
    label: { es: "Mi lado personal", en: "Personal side" },
    href: "#mi-lado-personal",
  },
  { label: { es: "Habilidades", en: "Skills" }, href: "#habilidades" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contacto" },
];

export const languages: LanguageOption[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export const ui: UiLabels = {
  navAriaLabel: { es: "Navegación principal", en: "Main navigation" },
  menuOpen: { es: "Abrir menú", en: "Open menu" },
  menuClose: { es: "Cerrar menú", en: "Close menu" },
  themeToLight: {
    es: "Cambiar a tema claro",
    en: "Switch to light theme",
  },
  themeToDark: {
    es: "Cambiar a tema oscuro",
    en: "Switch to dark theme",
  },
  languageGroup: { es: "Idioma", en: "Language" },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  viewProjects: { es: "Ver proyectos", en: "View projects" },
  projectsHref: "#proyectos",
  socialAriaLabel: { es: "Redes sociales", en: "Social links" },
};
