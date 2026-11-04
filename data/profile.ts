import type { LanguageOption, NavLink, Profile, UiLabels } from "./types";

export const profile: Profile = {
  name: "Alejandro Parra",
  initials: "AP",
  photo: "/images/profile-placeholder.svg",
  photoAlt: "Foto de perfil de Alejandro Parra",
  role: "Backend · Interfaces · Datos",
  tag: "Portafolio personal · 2026",
  tagline:
    "Exploro el desarrollo de software desde el backend y los datos hasta las interfaces y la experiencia de usuario.",
  location: "Pasto, Colombia",
  semester: "Quinto semestre",
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
  { label: "Inicio", href: "#inicio" },
  { label: "Acerca de mí", href: "#acerca-de-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Mi lado personal", href: "#mi-lado-personal" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Contacto", href: "#contacto" },
];

export const languages: LanguageOption[] = [
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
