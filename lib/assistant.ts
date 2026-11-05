import { assistant } from "@/data/assistant";
import type { Language } from "@/data/types";

// Turno previo de la conversación, tal como lo recibe /api/chat.
export type AssistantTurn = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 6; // el servidor acepta como máximo 6 mensajes
const REQUEST_TIMEOUT_MS = 20_000;

// Quita mayúsculas, tildes y signos para comparar preguntas.
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Plan B: respuestas de ejemplo de data/assistant.ts.
function sampleAnswer(question: string, language: Language): string {
  const asked = normalize(question);
  const match = assistant.quickQuestions.find((quick) =>
    (["es", "en"] as const).some(
      (code) => normalize(quick.question[code]) === asked,
    ),
  );
  return match ? match.answer[language] : assistant.fallback[language];
}

// Reciente y bien formada: empieza con una pregunta y acaba con la actual.
function buildMessages(
  question: string,
  history: AssistantTurn[],
): AssistantTurn[] {
  const recent = [...history, { role: "user" as const, content: question }].slice(
    -MAX_HISTORY,
  );
  while (recent.length > 1 && recent[0].role !== "user") recent.shift();
  return recent;
}

// Pregunta a /api/chat. Si el servicio no está disponible o falla la red,
// responde con los textos de ejemplo; si hay demasiadas peticiones, pide esperar.
export async function askAssistant(
  question: string,
  language: Language,
  history: AssistantTurn[] = [],
): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: buildMessages(question, history),
        language,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (response.status === 429) return assistant.rateLimited[language];
    if (!response.ok) return sampleAnswer(question, language);
    const data: unknown = await response.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "answer" in data &&
      typeof data.answer === "string" &&
      data.answer.trim() !== ""
    ) {
      return data.answer;
    }
    return sampleAnswer(question, language);
  } catch {
    return sampleAnswer(question, language);
  }
}
