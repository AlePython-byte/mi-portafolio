import { about } from "./about";
import { profile } from "./profile";
import { projectsSection } from "./projects";
import type { AssistantData, Language, LocalizedText } from "./types";

// Id de la ventana del chat en el gestor de ventanas del escritorio retro.
export const MULLIS_CHAT_ID = "mullis-chat";

const languages: Language[] = ["es", "en"];

// Construye un texto bilingüe a partir de una función por idioma.
function both(build: (language: Language) => string): LocalizedText {
  const [es, en] = languages.map(build);
  return { es, en };
}

const interests = (language: Language) =>
  about.interests.map((interest) => interest[language]).join(", ");
const projectTitles = projectsSection.projects
  .map((project) => project.title)
  .join(", ");
const socialLabels = (language: Language) => {
  const names = profile.social.map((link) => link.label);
  const last = names[names.length - 1];
  return `${names.slice(0, -1).join(", ")} ${language === "es" ? "e" : "and"} ${last}`;
};

// Respuestas de ejemplo: mientras no haya un servidor, salen de los datos reales.
export const assistant: AssistantData = {
  openLabel: { es: "Hablar con Mullis", en: "Talk to Mullis" },
  bubble: {
    es: "¡Miau! ¿Quieres hablar conmigo? Tócame.",
    en: "Meow! Want to talk to me? Tap me.",
  },
  chatTitle: { es: "Mullis · chat", en: "Mullis · chat" },
  greeting: {
    es: "¡Miau! Soy Mullis. Pregúntame lo que quieras sobre Alejandro.",
    en: "Meow! I'm Mullis. Ask me anything about Alejandro.",
  },
  historyLabel: { es: "Conversación con Mullis", en: "Conversation with Mullis" },
  quickLabel: { es: "Preguntas rápidas", en: "Quick questions" },
  inputLabel: { es: "Escribe tu pregunta", en: "Type your question" },
  send: { es: "Enviar", en: "Send" },
  typing: { es: "Mullis está escribiendo…", en: "Mullis is typing…" },
  fallback: {
    es: "Todavía estoy aprendiendo a responder eso.",
    en: "I'm still learning how to answer that.",
  },
  rateLimited: {
    es: "¡Miau! Me están preguntando muchas cosas a la vez. Espera un momento y vuelve a intentarlo.",
    en: "Meow! I'm getting lots of questions at once. Please wait a moment and try again.",
  },
  quickQuestions: [
    {
      id: "estudios",
      question: { es: "¿Qué estudia Alejandro?", en: "What does Alejandro study?" },
      answer: both((language) =>
        language === "es"
          ? `Alejandro estudia ${about.education.degree.es} en la ${about.education.institution} (${about.education.campus.es.toLowerCase()}) y cursa el ${profile.semester.es.toLowerCase()}. Áreas de interés: ${interests("es")}.`
          : `Alejandro studies ${about.education.degree.en} at ${about.education.institution} (${about.education.campus.en}) and is in the ${profile.semester.en.toLowerCase()}. Areas of interest: ${interests("en")}.`,
      ),
    },
    {
      id: "proyectos",
      question: { es: "¿Qué proyectos tiene?", en: "What projects does Alejandro have?" },
      answer: both((language) =>
        language === "es"
          ? `Estos son los proyectos de Alejandro: ${projectTitles}. Puedes verlos con detalle en la carpeta Proyectos.`
          : `These are Alejandro's projects: ${projectTitles}. You can see them in detail in the Projects folder.`,
      ),
    },
    {
      id: "contacto",
      question: { es: "¿Cómo lo contacto?", en: "How do I contact Alejandro?" },
      answer: both((language) =>
        language === "es"
          ? `Puedes escribir a ${profile.email} o buscar a Alejandro en ${socialLabels("es")}. También está el formulario de la carpeta Contacto.`
          : `You can write to ${profile.email} or find Alejandro on ${socialLabels("en")}. There is also the form in the Contact folder.`,
      ),
    },
  ],
};
