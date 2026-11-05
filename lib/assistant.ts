import { assistant } from "@/data/assistant";
import type { Language } from "@/data/types";

// Quita mayúsculas, tildes y signos para comparar preguntas.
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Por ahora responde con textos de ejemplo de data/assistant.ts. La firma es
// asíncrona para poder sustituir el cuerpo por una llamada a un servidor sin
// cambiar la interfaz del chat.
export async function askAssistant(
  question: string,
  language: Language,
): Promise<string> {
  // Pausa breve para que se vea el estado "escribiendo".
  await new Promise((resolve) => setTimeout(resolve, 700));

  const asked = normalize(question);
  const match = assistant.quickQuestions.find((quick) =>
    (["es", "en"] as const).some(
      (code) => normalize(quick.question[code]) === asked,
    ),
  );
  return match ? match.answer[language] : assistant.fallback[language];
}
