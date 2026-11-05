import { assistant, MULLIS_CHAT_ID } from "@/data/assistant";
import { retro } from "@/data/retro";
import type { Language } from "@/data/types";

// Título de una ventana (barra de título y botón de la barra de tareas).
export function windowTitle(id: string, language: Language): string {
  if (id === MULLIS_CHAT_ID) return assistant.chatTitle[language];
  return retro.apps.find((app) => app.id === id)?.label[language] ?? id;
}
