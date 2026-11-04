import type { AboutData } from "./types";

export const about: AboutData = {
  headline: {
    es: "Curiosidad técnica, intención humana.",
    en: "Technical curiosity, human intent.",
  },
  paragraph: {
    es: "Soy estudiante de Ingeniería de Software de quinto semestre, con interés en backend, frontend, diseño UX/UI, bases de datos y desarrollo de software. Mi formación está enfocada en entender los sistemas con criterio, desde sus fundamentos hasta las personas que los utilizan.",
    en: "I am a fifth-semester Software Engineering student with an interest in backend, frontend, UX/UI design, databases, and software development. My training is focused on understanding systems with sound judgment, from their foundations to the people who use them.",
  },
  interestsTitle: { es: "Áreas de interés", en: "Areas of interest" },
  interests: [
    { es: "Backend", en: "Backend" },
    { es: "Frontend", en: "Frontend" },
    { es: "Diseño UX/UI", en: "UX/UI design" },
    { es: "Bases de datos", en: "Databases" },
    { es: "Desarrollo de software", en: "Software development" },
  ],
  educationTitle: { es: "Formación", en: "Education" },
  education: {
    degree: { es: "Ingeniería de Software", en: "Software Engineering" },
    institution: "Universidad Cooperativa de Colombia",
    campus: { es: "Sede Pasto", en: "Pasto campus" },
  },
  focusTitle: { es: "Enfoque", en: "Approach" },
  focus: {
    es: "Aprender, analizar y construir con atención al detalle.",
    en: "Learn, analyze, and build with attention to detail.",
  },
  locationLabel: { es: "Ubicación", en: "Location" },
  semesterLabel: { es: "Cursando", en: "Currently in" },
};
