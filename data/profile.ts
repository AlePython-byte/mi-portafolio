import type { Language, NavLink, Profile, UiLabels } from "./types";

export const profile: Profile = {
  name: "Tu Nombre",
  initials: "AP",
  photo: "/images/profile-placeholder.svg",
  photoAlt: "Foto de perfil",
  role: "Desarrollador web",
  tagline: "Frase corta que te describe.",
  location: "Ciudad, País",
  semester: "N.º semestre",
  cvUrl: "/cv.pdf",
  social: [
    { label: "GitHub", url: "https://github.com/usuario" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/usuario" },
    { label: "Instagram", url: "https://www.instagram.com/usuario" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Acerca de mí", href: "#sobre-mi" },
  { label: "Mi lado personal", href: "#personal" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export const languages: Language[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export const ui: UiLabels = {
  navAriaLabel: "Navegación principal",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  themeToLight: "Cambiar a tema claro",
  themeToDark: "Cambiar a tema oscuro",
  languageGroup: "Idioma",
  downloadCv: "Descargar CV",
  viewProjects: "Ver proyectos",
  projectsHref: "#proyectos",
  socialAriaLabel: "Redes sociales",
};
