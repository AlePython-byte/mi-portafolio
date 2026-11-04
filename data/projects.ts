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
      details: {
        summary:
          "Roguelike 3D de terror psicológico inspirado en The Binding of Isaac. Juego como Noah, un bebé atrapado en una pesadilla donde los juguetes y los recuerdos familiares se vuelven criaturas. Su única defensa son sus lágrimas. Está en desarrollo, en la fase 1.",
        features: [
          "Combate roguelike en un entorno 3D",
          "Atmósfera de terror psicológico",
          "Modelado 3D en Blender y arte 2D en Krita",
        ],
        stack: [
          { label: "Motor y lenguaje", items: ["Godot 4 .NET", "C#"] },
          { label: "Arte", items: ["Blender", "Krita"] },
        ],
      },
    },
    {
      id: "vision2code",
      title: "Vision2Code",
      description:
        "App de escritorio que convierte la captura de una interfaz en un proyecto de código. La IA solo describe la interfaz como un esquema validado y un generador determinista produce el código, así el resultado es predecible.",
      image: "/images/projects/vision2code.png",
      imageAlt:
        "Captura de Vision2Code, app de escritorio que convierte capturas de pantalla en código",
      tags: ["Tauri", "Rust", "React", "TypeScript", "NestJS"],
      githubUrl: "https://github.com/AlePython-byte/vision2code",
      // TODO: reemplazar por el enlace real del release.
      demoUrl: "#",
      demoLabel: "Ver release",
    },
    {
      id: "zerowaste-eats",
      title: "ZeroWaste Eats",
      description:
        "App Android de rescate de comida: los negocios publican a menor precio lo que les sobra al final del día y los compradores lo reservan y lo recogen con un código. Incluye una función de IA que sugiere la oferta a partir de una foto del excedente.",
      image: "/images/projects/zerowaste-eats.png",
      imageAlt: "Captura de ZeroWaste Eats",
      tags: ["Kotlin", "Jetpack Compose", "NestJS", "Supabase"],
      githubUrl: "https://github.com/AlePython-byte/zerowaste-eats",
      // TODO: reemplazar por el enlace real del video.
      demoUrl: "#",
      demoLabel: "Ver video",
    },
    {
      id: "luminawear",
      title: "LuminaWear",
      description:
        "App de Wear OS para controlar las luces de tu casa desde la muñeca: enciendes, apagas, ajustas el brillo y activas escenas, y un asistente entiende órdenes en texto. Funciona con un bombillo físico a través de un hub propio.",
      image: "/images/projects/luminawear.png",
      imageAlt: "Captura de LuminaWear, app para reloj inteligente con Wear OS",
      tags: ["Kotlin", "Jetpack Compose", "Wear OS", "Python"],
      githubUrl: "https://github.com/AlePython-byte/lumina-wear",
      // TODO: reemplazar por el enlace real del video.
      demoUrl: "#",
      demoLabel: "Ver video",
    },
  ],
};
