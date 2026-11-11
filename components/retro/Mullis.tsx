"use client";

import { useId } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { assistant, MULLIS_CHAT_ID } from "@/data/assistant";
import { MullisSprite } from "./MullisSprite";
import { useWindowManager } from "./WindowManager";

// Cola de la burbuja: escalones de píxeles que apuntan hacia la gata.
function BubbleTail() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 4"
      shapeRendering="crispEdges"
      className="-mt-0.5 mr-12 h-2 w-4"
    >
      <rect x="0" y="0" width="1" height="1" />
      <rect x="1" y="0" width="6" height="1" className="fill-[var(--retro-field)]" />
      <rect x="7" y="0" width="1" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="2" y="1" width="4" height="1" className="fill-[var(--retro-field)]" />
      <rect x="6" y="1" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="3" y="2" width="2" height="1" className="fill-[var(--retro-field)]" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="3" y="3" width="2" height="1" />
    </svg>
  );
}

// Mullis, la gata asistente: botón en la esquina inferior derecha del escritorio.
export default function Mullis() {
  const { language } = usePreferences();
  const { windows, open } = useWindowManager();
  const bubbleId = useId();
  const chatOpen = windows.some((win) => win.id === MULLIS_CHAT_ID);

  return (
    <div
      // Los iconos del escritorio miden esta zona para no quedar debajo.
      data-mullis-zone
      className="pointer-events-none absolute bottom-2 right-3 z-[5] flex flex-col items-end"
    >
      {/* Con el chat abierto la burbuja se oculta pero sigue ocupando su sitio. */}
      <div
        aria-hidden={chatOpen || undefined}
        className={`flex flex-col items-end ${chatOpen ? "invisible" : ""}`}
      >
        <p id={bubbleId} className="mullis-bubble mb-1 max-w-56 text-lg">
          <span>{assistant.bubble[language]}</span>
        </p>
        <BubbleTail />
      </div>
      <button
        type="button"
        // El chat devuelve el foco a este botón al cerrarse.
        id={`retro-icono-${MULLIS_CHAT_ID}`}
        onClick={() => open(MULLIS_CHAT_ID)}
        aria-label={assistant.openLabel[language]}
        aria-describedby={chatOpen ? undefined : bubbleId}
        className="pointer-events-auto block"
      >
        <MullisSprite className="mullis-bob h-[130px] w-[120px]" />
      </button>
    </div>
  );
}
