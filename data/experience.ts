import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "experiencia-laboral-1",
    kind: "work",
    role: { es: "Cargo", en: "Role" },
    company: "Empresa",
    location: { es: "Ciudad, País", en: "City, Country" },
    startDate: "2024-01",
    highlights: [
      {
        es: "Logro o responsabilidad principal.",
        en: "Main achievement or responsibility.",
      },
    ],
    stack: ["TypeScript"],
  },
  {
    id: "experiencia-academica-1",
    kind: "academic",
    role: { es: "Carrera o programa", en: "Degree or program" },
    company: "Institución",
    location: { es: "Ciudad, País", en: "City, Country" },
    startDate: "2022-01",
    highlights: [
      {
        es: "Dato académico relevante.",
        en: "Relevant academic detail.",
      },
    ],
  },
];
