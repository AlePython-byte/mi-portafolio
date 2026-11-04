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
        "Roguelike 3D de terror psicológico inspirado en The Binding of Isaac. Juego como Noah, un bebé atrapado en una pesadilla donde los juguetes y los recuerdos familiares se vuelven criaturas, y mi única defensa son sus lágrimas. En desarrollo.",
      image: "/images/projects/lullaby.png",
      imageAlt: "Captura de LULLABY, roguelike 3D de terror psicológico",
      tags: ["Godot .NET", "C#", "Blender", "Krita"],
      githubUrl: "https://github.com/AlePython-byte/LULLABY",
      // TODO: reemplazar por el enlace real de la demo.
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "vision2code",
      title: "Vision2Code",
      description: "App de escritorio que convierte capturas de pantalla en código.",
      image: "/images/projects/vision2code.png",
      imageAlt:
        "Captura de Vision2Code, app de escritorio que convierte capturas de pantalla en código",
      tags: ["Escritorio"],
      githubUrl: "https://github.com/AlePython-byte/vision2code",
      // TODO: reemplazar por el enlace real de la demo.
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "zerowaste-eats",
      title: "ZeroWaste Eats",
      // TODO: escribir una línea sobre qué hace el proyecto.
      description: "[TODO: una línea sobre qué hace]",
      image: "/images/projects/zerowaste-eats.png",
      imageAlt: "Captura de ZeroWaste Eats",
      // TODO: definir las etiquetas de tecnología.
      tags: ["TODO"],
      githubUrl: "https://github.com/AlePython-byte/zerowaste-eats",
      // TODO: reemplazar por el enlace real de la demo.
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
    {
      id: "luminawear",
      title: "LuminaWear",
      description: "App para reloj inteligente con Wear OS.",
      image: "/images/projects/luminawear.png",
      imageAlt: "Captura de LuminaWear, app para reloj inteligente con Wear OS",
      tags: ["Wear OS"],
      githubUrl: "https://github.com/AlePython-byte/lumina-wear",
      // TODO: reemplazar por el enlace real de la demo.
      demoUrl: "#",
      demoLabel: "Ver demo",
    },
  ],
};
