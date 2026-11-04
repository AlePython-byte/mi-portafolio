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
  moreInfo: "Más información",
  moreInfoAria: "Más información sobre {title}",
  close: "Cerrar",
  whatItDoes: "Qué hace",
  stackTitle: "Stack",
  detailsTitle: "Detalles",
  githubDisabledAria: "GitHub de {title}: próximamente",
  demoDisabledAria: "{kind} de {title}: próximamente",
  demoKinds: {
    "Ver demo": "Demo",
    "Ver video": "Video",
    "Ver release": "Release",
  },
  projects: [
    {
      id: "lullaby",
      title: "LULLABY",
      description:
        "Roguelike 3D de terror psicológico inspirado en The Binding of Isaac. Juego como Noah, un bebé atrapado en una pesadilla donde los juguetes y los recuerdos familiares se vuelven criaturas, y mi única defensa son sus lágrimas. En desarrollo.",
      image: "/images/projects/lullaby.png",
      imageAlt:
        "Menú principal de LULLABY: una cuna con juguetes y un panel con las opciones Jugar, Dificultad, Controles y Salir",
      imageFit: "cover",
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
        "Espacio de trabajo de Vision2Code con la zona para soltar una captura y los proyectos recientes",
      imageFit: "cover",
      imagePosition: "top",
      tags: ["Tauri", "Rust", "React", "TypeScript", "NestJS"],
      githubUrl: "https://github.com/AlePython-byte/vision2code",
      // TODO: reemplazar por el enlace real del release.
      demoUrl: "#",
      demoLabel: "Ver release",
      details: {
        summary:
          "Subes la captura de una interfaz y la app la convierte en un proyecto de código. La IA no escribe código: solo describe la interfaz como un esquema que se valida de forma estricta, y un generador determinista lo convierte en código. Así el resultado es predecible.",
        features: [
          "Captura de una imagen con fidelidad Rápido, Equilibrado o Preciso",
          "Código en un editor con vista previa en vivo",
          "Proyectos y Biblioteca para guardar y reabrir generaciones",
          "Exportación a una carpeta para abrirla en VS Code",
          "Cuentas, modo claro y oscuro, español e inglés",
        ],
        stack: [
          {
            label: "App de escritorio",
            items: ["Tauri 2", "Rust", "React", "TypeScript", "Vite", "Tailwind 4", "Monaco", "i18next"],
          },
          {
            label: "Servidor",
            items: ["NestJS", "Prisma", "PostgreSQL", "Supabase Auth", "Zod"],
          },
        ],
        highlights: [
          "Cerca de 950 pruebas automáticas",
          "CI en GitHub Actions",
          "Vista previa aislada con su propia política de seguridad",
        ],
      },
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
      details: {
        summary:
          "App Android nativa de rescate de comida. Los negocios publican a menor precio lo que les sobra al final del día; los compradores lo descubren, lo reservan y lo recogen en el local con un código corto.",
        features: [
          "Comprador: ofertas en lista, cuadrícula o mapa, filtros, favoritos y pedidos",
          "Negocio: panel, ofertas, reservas y canje del código con bloqueo tras 5 intentos fallidos",
          "IA: sube la foto del excedente y la app sugiere título, categoría, descripción y precio con descuento, todo editable",
          "Registro con rol, modo claro y oscuro, español e inglés",
        ],
        stack: [
          {
            label: "App Android",
            items: ["Kotlin", "Jetpack Compose", "Material 3", "Navigation Compose", "Maps Compose", "Retrofit"],
          },
          {
            label: "Servidor",
            items: ["NestJS", "Prisma", "Supabase Postgres", "Supabase Auth", "Supabase Storage"],
          },
        ],
        highlights: [
          "Identidad visual propia llamada “Rescate”",
          "Interruptor de datos de demostración",
        ],
      },
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
      details: {
        summary:
          "Controla las luces de la casa desde la muñeca: enciende, apaga y ajusta el brillo. Tiene escenas, favoritos y un asistente al que le hablas en texto, por ejemplo «pon la sala tranquila».",
        features: [
          "Escenas: Descanso, Lectura, Concentración y Buenas noches, con sugerencia según la hora y Deshacer",
          "Asistente con reglas locales y apoyo de IA; siempre pide confirmación antes de aplicar",
          "Una luz real: un bombillo físico que se controla a través de un hub propio",
          "Tema claro y oscuro, español e inglés",
        ],
        stack: [
          { label: "App del reloj", items: ["Kotlin", "Jetpack Compose para Wear OS", "Wear Compose Material 3"] },
          { label: "Hub", items: ["Python"] },
          { label: "Diseño", items: ["Figma", "Sistema de tokens"] },
        ],
      },
    },
  ],
};
