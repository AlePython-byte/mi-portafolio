import { assistant, MULLIS_CHAT_ID } from "@/data/assistant";
import { retro } from "@/data/retro";
import type { Language } from "@/data/types";
import type { PixelGrid } from "@/lib/pixelGrid";
import { RETRO_ICONS_SMALL, START_ICON } from "@/lib/retroIcons";

// Título de una ventana (barra de título y botón de la barra de tareas).
export function windowTitle(id: string, language: Language): string {
  if (id === MULLIS_CHAT_ID) return assistant.chatTitle[language];
  return retro.apps.find((app) => app.id === id)?.label[language] ?? id;
}

// Icono de 16×16 de la ventana; el chat es la cabeza de Mullis.
export function windowIcon(id: string): PixelGrid | undefined {
  if (id === MULLIS_CHAT_ID) return START_ICON;
  const app = retro.apps.find((item) => item.id === id);
  return app ? RETRO_ICONS_SMALL[app.icon] : undefined;
}
