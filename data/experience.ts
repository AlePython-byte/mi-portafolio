import type { ExperienceData } from "./types";

const organizer = { es: "Organizador", en: "Organizer" };
const participant = { es: "Participante", en: "Participant" };
const pasto = { es: "Pasto", en: "Pasto" };
const ucc = {
  es: "Universidad Cooperativa de Colombia",
  en: "Universidad Cooperativa de Colombia",
};

// De lo más reciente a lo más antiguo dentro de cada bloque.
// null = dato por completar (la página muestra "Por completar").
export const experienceSection: ExperienceData = {
  headline: { es: "Experiencia", en: "Experience" },
  academicTitle: { es: "Experiencia académica", en: "Academic experience" },
  workTitle: { es: "Experiencia laboral", en: "Work experience" },
  pending: { es: "Por completar", en: "To be completed" },
  ongoing: { es: "En curso", en: "Ongoing" },
  items: [
    {
      id: "iv-seminario",
      kind: "academic",
      title: {
        es: "IV Seminario de Ingeniería de Software",
        en: "4th Software Engineering Seminar",
      },
      organization: ucc,
      organizationLabel: organizer,
      role: participant,
      location: pasto,
      period: { es: "Segundo periodo de 2026", en: "Second term of 2026" },
    },
    {
      id: "iii-seminario",
      kind: "academic",
      title: {
        es: "III Seminario de Ingeniería de Software",
        en: "3rd Software Engineering Seminar",
      },
      organization: ucc,
      organizationLabel: organizer,
      role: participant,
      location: pasto,
      period: { es: "Segundo periodo de 2025", en: "Second term of 2025" },
    },
    {
      id: "ii-seminario",
      kind: "academic",
      title: {
        es: "II Seminario de Ingeniería de Software",
        en: "2nd Software Engineering Seminar",
      },
      organization: ucc,
      organizationLabel: organizer,
      role: participant,
      location: pasto,
      period: { es: "Primer periodo de 2025", en: "First term of 2025" },
    },
    {
      id: "i-seminario-nacional",
      kind: "academic",
      title: {
        es: "I Seminario Nacional de Ingeniería de Software: “La industria del desarrollo del software en Colombia”",
        en: "1st National Software Engineering Seminar: “The software development industry in Colombia”",
      },
      organization: ucc,
      organizationLabel: organizer,
      role: participant,
      location: pasto,
      // TODO: fecha del seminario.
      period: null,
      periodLabel: { es: "Fecha", en: "Date" },
    },
    {
      id: "ingenieria-de-software",
      kind: "academic",
      title: { es: "Ingeniería de Software", en: "Software Engineering" },
      organization: {
        es: "Universidad Cooperativa de Colombia (sede Pasto)",
        en: "Universidad Cooperativa de Colombia (Pasto campus)",
      },
      role: { es: "Quinto semestre", en: "Fifth semester" },
      // TODO: fecha de inicio de la carrera.
      period: null,
      periodLabel: { es: "Fecha de inicio", en: "Start date" },
      ongoing: true,
    },
    {
      id: "desarrollador-freelance",
      kind: "work",
      title: { es: "Desarrollador freelance", en: "Freelance developer" },
      period: {
        es: "Desde el segundo periodo de 2024 hasta hoy",
        en: "From the second term of 2024 to today",
      },
      ongoing: true,
      // TODO: dos o tres líneas con los tipos de proyectos y tecnologías.
      description: null,
    },
  ],
};
