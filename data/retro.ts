import type { RetroData } from "./types";

export const retro: RetroData = {
  powerOn: { es: "Encender PC", en: "Turn on PC" },
  desktopLabel: { es: "Escritorio retro", en: "Retro desktop" },
  iconsLabel: { es: "Iconos del escritorio", en: "Desktop icons" },
  windowsLabel: { es: "Ventanas abiertas", en: "Open windows" },
  taskbarLabel: { es: "Barra de tareas", en: "Taskbar" },
  minimize: { es: "Minimizar", en: "Minimize" },
  close: { es: "Cerrar", en: "Close" },
  start: { es: "Inicio", en: "Start" },
  startMenuLabel: { es: "Menú Inicio", en: "Start menu" },
  shutdown: { es: "Apagar", en: "Shut down" },
  languageToEn: {
    es: "Cambiar el idioma a inglés",
    en: "Change the language to English",
  },
  languageToEs: {
    es: "Cambiar el idioma a español",
    en: "Change the language to Spanish",
  },
  placeholder: {
    es: "Esta ventana está en construcción.",
    en: "This window is under construction.",
  },
  apps: [
    { id: "perfil", label: { es: "Perfil", en: "Profile" }, icon: "folder" },
    { id: "gustos", label: { es: "Gustos", en: "Interests" }, icon: "folder" },
    {
      id: "proyectos",
      label: { es: "Proyectos", en: "Projects" },
      icon: "folder",
    },
    {
      id: "habilidades",
      label: { es: "Habilidades", en: "Skills" },
      icon: "folder",
    },
    {
      id: "experiencia",
      label: { es: "Experiencia", en: "Experience" },
      icon: "folder",
    },
    {
      id: "testimonios",
      label: { es: "Testimonios", en: "Testimonials" },
      icon: "folder",
    },
    {
      id: "contacto",
      label: { es: "Contacto", en: "Contact" },
      icon: "folder",
    },
    { id: "cv", label: { es: "CV", en: "CV" }, icon: "document" },
  ],
};
