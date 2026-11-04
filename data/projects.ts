import type { ProjectsData } from "./types";

export const projectsSection: ProjectsData = {
  label: { es: "04 · Proyectos", en: "04 · Projects" },
  headline: {
    es: "Una selección de mi trabajo.",
    en: "A selection of my work.",
  },
  subtitle: {
    es: "Código, decisiones y aprendizajes reunidos en proyectos de software.",
    en: "Code, decisions, and lessons gathered in software projects.",
  },
  countSingular: { es: "proyecto", en: "project" },
  countPlural: { es: "proyectos", en: "projects" },
  githubLabel: { es: "GitHub", en: "GitHub" },
  comingSoon: { es: "Próximamente", en: "Coming soon" },
  placeholderImage: "/images/projects/placeholder.svg",
  moreInfo: { es: "Más información", en: "More information" },
  moreInfoAria: {
    es: "Más información sobre {title}",
    en: "More information about {title}",
  },
  close: { es: "Cerrar", en: "Close" },
  whatItDoes: { es: "Qué hace", en: "What it does" },
  stackTitle: { es: "Stack", en: "Stack" },
  detailsTitle: { es: "Detalles", en: "Details" },
  githubDisabledAria: {
    es: "GitHub de {title}: próximamente",
    en: "GitHub for {title}: coming soon",
  },
  demoDisabledAria: {
    es: "{kind} de {title}: próximamente",
    en: "{kind} for {title}: coming soon",
  },
  demoKinds: {
    "Ver demo": { es: "Demo", en: "Demo" },
    "Ver video": { es: "Video", en: "Video" },
    "Ver release": { es: "Release", en: "Release" },
  },
  demoLabels: {
    "Ver demo": { es: "Ver demo", en: "View demo" },
    "Ver video": { es: "Ver video", en: "Watch video" },
    "Ver release": { es: "Ver release", en: "View release" },
  },
  projects: [
    {
      id: "lullaby",
      title: "LULLABY",
      description: {
        es: "Roguelike 3D de terror psicológico inspirado en The Binding of Isaac. Juego como Noah, un bebé atrapado en una pesadilla donde los juguetes y los recuerdos familiares se vuelven criaturas, y mi única defensa son sus lágrimas. En desarrollo.",
        en: "3D psychological horror roguelike inspired by The Binding of Isaac. I play as Noah, a baby trapped in a nightmare where toys and family memories turn into creatures, and my only defense is his tears. In development.",
      },
      image: "/images/projects/lullaby.jpg",
      imageAlt: {
        es: "Menú principal de LULLABY: una cuna con juguetes y un panel con las opciones Jugar, Dificultad, Controles y Salir",
        en: "Main menu of LULLABY: a crib with toys and a panel with the options Play, Difficulty, Controls, and Quit",
      },
      imageFit: "cover",
      tags: ["Godot .NET", "C#", "Blender", "Krita"],
      githubUrl: "https://github.com/AlePython-byte/LULLABY",
      // TODO: reemplazar por el enlace real de la demo.
      demoUrl: "#",
      demoLabel: "Ver demo",
      details: {
        summary: {
          es: "Roguelike 3D de terror psicológico inspirado en The Binding of Isaac. Juego como Noah, un bebé atrapado en una pesadilla donde los juguetes y los recuerdos familiares se vuelven criaturas. Su única defensa son sus lágrimas. Está en desarrollo, en la fase 1.",
          en: "3D psychological horror roguelike inspired by The Binding of Isaac. I play as Noah, a baby trapped in a nightmare where toys and family memories turn into creatures. His only defense is his tears. It is in development, in phase 1.",
        },
        features: [
          {
            es: "Combate roguelike en un entorno 3D",
            en: "Roguelike combat in a 3D environment",
          },
          {
            es: "Atmósfera de terror psicológico",
            en: "Psychological horror atmosphere",
          },
          {
            es: "Modelado 3D en Blender y arte 2D en Krita",
            en: "3D modeling in Blender and 2D art in Krita",
          },
        ],
        stack: [
          {
            label: { es: "Motor y lenguaje", en: "Engine and language" },
            items: ["Godot 4 .NET", "C#"],
          },
          { label: { es: "Arte", en: "Art" }, items: ["Blender", "Krita"] },
        ],
      },
    },
    {
      id: "vision2code",
      title: "Vision2Code",
      description: {
        es: "App de escritorio que convierte la captura de una interfaz en un proyecto de código. La IA solo describe la interfaz como un esquema validado y un generador determinista produce el código, así el resultado es predecible.",
        en: "Desktop app that turns a screenshot of an interface into a code project. AI only describes the interface as a validated schema and a deterministic generator produces the code, so the result is predictable.",
      },
      image: "/images/projects/vision2code.png",
      imageAlt: {
        es: "Espacio de trabajo de Vision2Code con la zona para soltar una captura y los proyectos recientes",
        en: "Vision2Code workspace with the drop zone for a screenshot and recent projects",
      },
      imageFit: "cover",
      imagePosition: "top",
      tags: ["Tauri", "Rust", "React", "TypeScript", "NestJS"],
      githubUrl: "https://github.com/AlePython-byte/vision2code",
      // TODO: reemplazar por el enlace real del release.
      demoUrl: "#",
      demoLabel: "Ver release",
      details: {
        summary: {
          es: "Subes la captura de una interfaz y la app la convierte en un proyecto de código. La IA no escribe código: solo describe la interfaz como un esquema que se valida de forma estricta, y un generador determinista lo convierte en código. Así el resultado es predecible.",
          en: "You upload a screenshot of an interface and the app turns it into a code project. AI does not write code: it only describes the interface as a strictly validated schema, and a deterministic generator turns it into code. That way the result is predictable.",
        },
        features: [
          {
            es: "Captura de una imagen con fidelidad Rápido, Equilibrado o Preciso",
            en: "Image capture with Fast, Balanced, or Precise fidelity",
          },
          {
            es: "Código en un editor con vista previa en vivo",
            en: "Code in an editor with live preview",
          },
          {
            es: "Proyectos y Biblioteca para guardar y reabrir generaciones",
            en: "Projects and Library to save and reopen generations",
          },
          {
            es: "Exportación a una carpeta para abrirla en VS Code",
            en: "Export to a folder to open in VS Code",
          },
          {
            es: "Cuentas, modo claro y oscuro, español e inglés",
            en: "Accounts, light and dark mode, Spanish and English",
          },
        ],
        stack: [
          {
            label: { es: "App de escritorio", en: "Desktop app" },
            items: [
              "Tauri 2",
              "Rust",
              "React",
              "TypeScript",
              "Vite",
              "Tailwind 4",
              "Monaco",
              "i18next",
            ],
          },
          {
            label: { es: "Servidor", en: "Server" },
            items: ["NestJS", "Prisma", "PostgreSQL", "Supabase Auth", "Zod"],
          },
        ],
        highlights: [
          {
            es: "Cerca de 950 pruebas automáticas",
            en: "About 950 automated tests",
          },
          { es: "CI en GitHub Actions", en: "CI on GitHub Actions" },
          {
            es: "Vista previa aislada con su propia política de seguridad",
            en: "Isolated preview with its own security policy",
          },
        ],
      },
    },
    {
      id: "zerowaste-eats",
      title: "ZeroWaste Eats",
      description: {
        es: "App Android de rescate de comida: los negocios publican a menor precio lo que les sobra al final del día y los compradores lo reservan y lo recogen con un código. Incluye una función de IA que sugiere la oferta a partir de una foto del excedente.",
        en: "Android food-rescue app: businesses list their end-of-day leftovers at a lower price and buyers reserve them and pick them up with a code. It includes an AI feature that suggests the offer from a photo of the surplus.",
      },
      image: "/images/projects/zerowaste-eats.png",
      imageAlt: {
        es: "Pantalla de inicio de ZeroWaste Eats con la oferta Croissants del día a 40 % menos",
        en: "ZeroWaste Eats home screen with the offer Croissants of the day at 40% off",
      },
      imageFit: "contain",
      tags: ["Kotlin", "Jetpack Compose", "NestJS", "Supabase"],
      githubUrl: "https://github.com/AlePython-byte/zerowaste-eats",
      // TODO: reemplazar por el enlace real del video.
      demoUrl: "#",
      demoLabel: "Ver video",
      details: {
        summary: {
          es: "App Android nativa de rescate de comida. Los negocios publican a menor precio lo que les sobra al final del día; los compradores lo descubren, lo reservan y lo recogen en el local con un código corto.",
          en: "Native Android food-rescue app. Businesses list their end-of-day leftovers at a lower price; buyers discover them, reserve them, and pick them up at the store with a short code.",
        },
        features: [
          {
            es: "Comprador: ofertas en lista, cuadrícula o mapa, filtros, favoritos y pedidos",
            en: "Buyer: offers as list, grid, or map, filters, favorites, and orders",
          },
          {
            es: "Negocio: panel, ofertas, reservas y canje del código con bloqueo tras 5 intentos fallidos",
            en: "Business: dashboard, offers, reservations, and code redemption with a lock after 5 failed attempts",
          },
          {
            es: "IA: sube la foto del excedente y la app sugiere título, categoría, descripción y precio con descuento, todo editable",
            en: "AI: upload a photo of the surplus and the app suggests title, category, description, and discounted price, all editable",
          },
          {
            es: "Registro con rol, modo claro y oscuro, español e inglés",
            en: "Sign-up with role, light and dark mode, Spanish and English",
          },
        ],
        stack: [
          {
            label: { es: "App Android", en: "Android app" },
            items: [
              "Kotlin",
              "Jetpack Compose",
              "Material 3",
              "Navigation Compose",
              "Maps Compose",
              "Retrofit",
            ],
          },
          {
            label: { es: "Servidor", en: "Server" },
            items: [
              "NestJS",
              "Prisma",
              "Supabase Postgres",
              "Supabase Auth",
              "Supabase Storage",
            ],
          },
        ],
        highlights: [
          {
            es: "Identidad visual propia llamada “Rescate”",
            en: "Own visual identity called “Rescate”",
          },
          {
            es: "Interruptor de datos de demostración",
            en: "Demo data switch",
          },
        ],
      },
    },
    {
      id: "luminawear",
      title: "LuminaWear",
      description: {
        es: "App de Wear OS para controlar las luces de tu casa desde la muñeca: enciendes, apagas, ajustas el brillo y activas escenas, y un asistente entiende órdenes en texto. Funciona con un bombillo físico a través de un hub propio.",
        en: "Wear OS app to control your home lights from your wrist: turn on, turn off, adjust brightness, and activate scenes, and an assistant understands text commands. It works with a physical bulb through its own hub.",
      },
      image: "/images/projects/luminawear.png",
      imageAlt: {
        es: "Pantalla principal de LuminaWear en el reloj: 5 de 8 luces encendidas y el botón Apagar todo",
        en: "LuminaWear main screen on the watch: 5 of 8 lights on and the Turn all off button",
      },
      imageFit: "contain",
      tags: ["Kotlin", "Jetpack Compose", "Wear OS", "Python"],
      githubUrl: "https://github.com/AlePython-byte/lumina-wear",
      // TODO: reemplazar por el enlace real del video.
      demoUrl: "#",
      demoLabel: "Ver video",
      details: {
        summary: {
          es: "Controla las luces de la casa desde la muñeca: enciende, apaga y ajusta el brillo. Tiene escenas, favoritos y un asistente al que le hablas en texto, por ejemplo «pon la sala tranquila».",
          en: "Control the lights at home from your wrist: turn on, turn off, and adjust brightness. It has scenes, favorites, and an assistant you talk to in text, for example “make the living room calm”.",
        },
        features: [
          {
            es: "Escenas: Descanso, Lectura, Concentración y Buenas noches, con sugerencia según la hora y Deshacer",
            en: "Scenes: Rest, Reading, Focus, and Good night, with a suggestion based on the time and Undo",
          },
          {
            es: "Asistente con reglas locales y apoyo de IA; siempre pide confirmación antes de aplicar",
            en: "Assistant with local rules and AI support; it always asks for confirmation before applying",
          },
          {
            es: "Una luz real: un bombillo físico que se controla a través de un hub propio",
            en: "A real light: a physical bulb controlled through its own hub",
          },
          {
            es: "Tema claro y oscuro, español e inglés",
            en: "Light and dark theme, Spanish and English",
          },
        ],
        stack: [
          {
            label: { es: "App del reloj", en: "Watch app" },
            items: [
              "Kotlin",
              {
                es: "Jetpack Compose para Wear OS",
                en: "Jetpack Compose for Wear OS",
              },
              "Wear Compose Material 3",
            ],
          },
          { label: { es: "Hub", en: "Hub" }, items: ["Python"] },
          {
            label: { es: "Diseño", en: "Design" },
            items: [
              "Figma",
              { es: "Sistema de tokens", en: "Design token system" },
            ],
          },
        ],
      },
    },
  ],
};
