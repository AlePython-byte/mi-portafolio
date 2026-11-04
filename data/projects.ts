import type { ProjectsData } from "./types";

export const projectsSection: ProjectsData = {
  label: "04 · Proyectos",
  headline: "Una selección de mi trabajo.",
  subtitle:
    "Código, decisiones y aprendizajes reunidos en proyectos de software.",
  countSingular: "proyecto",
  countPlural: "proyectos",
  githubLabel: "GitHub",
  comingSoon: "Próximamente",
  placeholderImage: "/images/projects/placeholder.svg",
  projects: [
    {
      id: "lullaby",
      title: "LULLABY",
      description:
        "Mi videojuego 3D roguelike de terror psicológico, hecho con Godot .NET y C#.",
      image: "/images/projects/lullaby.png",
      imageAlt: "Captura de LULLABY, videojuego 3D roguelike de terror psicológico",
      tags: ["Godot .NET", "C#"],
      // TODO: reemplazar por los enlaces reales.
      githubUrl: "#",
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "luminawear",
      title: "LuminaWear",
      description: "Mi app para reloj inteligente con Wear OS.",
      image: "/images/projects/luminawear.png",
      imageAlt: "Captura de LuminaWear, app para reloj inteligente con Wear OS",
      tags: ["Wear OS"],
      // TODO: reemplazar por los enlaces reales.
      githubUrl: "#",
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "vision2code",
      title: "Vision2Code",
      description:
        "Mi app de escritorio que convierte capturas de pantalla en código.",
      image: "/images/projects/vision2code.png",
      imageAlt:
        "Captura de Vision2Code, app de escritorio que convierte capturas de pantalla en código",
      tags: ["Escritorio"],
      // TODO: reemplazar por los enlaces reales.
      githubUrl: "#",
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "pixelforge",
      title: "PixelForge",
      description:
        "Mi herramienta que dimensiona una carga real y la lleva hasta el fallo.",
      image: "/images/projects/pixelforge.png",
      imageAlt:
        "Captura de PixelForge, herramienta que dimensiona una carga real y la lleva hasta el fallo",
      tags: ["Arquitectura computacional"],
      // TODO: reemplazar por los enlaces reales.
      githubUrl: "#",
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
  ],
};
