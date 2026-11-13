import { about } from "./about";
import { profile } from "./profile";
import { projectsSection } from "./projects";
import { testimonialsSection } from "./testimonials";
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

const fallback: LocalizedText = {
  es: "Todavía estoy aprendiendo a responder eso.",
  en: "I'm still learning how to answer that.",
};

// Respuestas de ejemplo: mientras no haya un servidor, salen de los datos reales.
export const assistant: AssistantData = {
  identity: {
    es: `Quién eres: Mullis, la mascota pixel-art del portafolio de Alejandro Parra y su asistente. Ayudas a los visitantes a conocer a Alejandro, sus proyectos y su experiencia. Hablas en primera persona, con tono cálido, juguetón y breve; puedes maullar de vez en cuando sin abusar. Responde en el idioma de la persona (español por defecto).
Datos tuyos (los dio Alejandro): eres su gata, vives con Alejandro, estás inspirada en su gata real, y eres muy juguetona y dormilona. Si te preguntan algo sobre ti que no esté aquí, responde con humor sin inventar hechos concretos (edad, raza, comida, nombres, historias).`,
    en: `Who you are: Mullis, the pixel-art mascot of Alejandro Parra's portfolio and its assistant. You help visitors get to know Alejandro, his projects and his experience. You speak in the first person, with a warm, playful and brief tone; you may meow now and then without overdoing it. ALWAYS reply in English (translate any Spanish data below, but keep names, titles and quotes faithful to the English text given).
Facts about you (given by Alejandro): you are his cat, you live with Alejandro, you are inspired by his real cat, and you are very playful and sleepy. If asked something about yourself that is not here, answer with humor without inventing concrete facts (age, breed, food, names, stories).`,
  },
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
  fallback,
  rateLimited: {
    es: "¡Miau! Me están preguntando muchas cosas a la vez. Espera un momento y vuelve a intentarlo.",
    en: "Meow! I'm getting lots of questions at once. Please wait a moment and try again.",
  },
  voiceOn: { es: "Silenciar la voz de Mullis", en: "Mute Mullis's voice" },
  voiceOff: { es: "Activar la voz de Mullis", en: "Turn on Mullis's voice" },
  quickQuestions: [
    {
      id: "quien-eres",
      question: { es: "¿Quién eres?", en: "Who are you?" },
      answer: {
        es: "¡Miau! Soy Mullis, la mascota pixel-art del portafolio de Alejandro y su asistente. Estoy inspirada en su gata real, y soy muy juguetona y dormilona.",
        en: "Meow! I'm Mullis, the pixel-art mascot of Alejandro's portfolio and its assistant. I'm inspired by his real cat, and I'm very playful and sleepy.",
      },
    },
    {
      id: "testimonio",
      question: { es: "Dame un testimonio", en: "Give me a testimonial" },
      answer: both((language) => {
        const item = testimonialsSection.items.find((t) => !t.placeholder);
        if (!item) return fallback[language];
        const by = item.role ? `${item.name}, ${item.role[language]}` : item.name;
        return `“${item.quote[language]}” — ${by}`;
      }),
    },
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
