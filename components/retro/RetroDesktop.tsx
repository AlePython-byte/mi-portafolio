"use client";

import { useState } from "react";
import { VT323 } from "next/font/google";
import { usePreferences } from "@/components/PreferencesProvider";
import { retro } from "@/data/retro";
import type { RetroApp } from "@/data/types";
import { RetroAssetsProvider, type RetroAssets } from "./RetroAssets";
import TaskBar from "./TaskBar";
import Window from "./Window";
import { WindowManagerProvider, useWindowManager } from "./WindowManager";
import { windowTitle } from "./windowTitles";
import { windowContents, windowSizes } from "./windows";

// La fuente pixelada solo se usa en el modo retro.
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

function FolderIcon({ kind }: { kind: RetroApp["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-10 w-10"
      shapeRendering="crispEdges"
    >
      {kind === "folder" ? (
        <>
          <path d="M2 7h11l3 3h14v17H2z" fill="#e8c34a" stroke="#000" />
          <path d="M3 13h26v13H3z" fill="#f6dc7a" />
        </>
      ) : (
        <>
          <path d="M7 3h14l5 5v21H7z" fill="#fff" stroke="#000" />
          <path d="M11 13h10M11 17h10M11 21h10" stroke="#000" />
        </>
      )}
    </svg>
  );
}

function DesktopIcon({ app }: { app: RetroApp }) {
  const { language } = usePreferences();
  const { open } = useWindowManager();
  const [selected, setSelected] = useState(false);

  return (
    <li>
      <button
        type="button"
        id={`retro-icono-${app.id}`}
        onClick={(event) => {
          // El clic de ratón solo selecciona; Enter y Espacio (detail 0) abren.
          if (event.detail === 0) open(app.id);
          else setSelected(true);
        }}
        onDoubleClick={() => open(app.id)}
        onBlur={() => setSelected(false)}
        className="flex w-24 flex-col items-center gap-1 p-1 text-center text-white"
      >
        <FolderIcon kind={app.icon} />
        <span
          className={`px-1 ${
            selected
              ? "bg-[var(--retro-select)] text-[var(--retro-select-text)]"
              : "[text-shadow:1px_1px_0_#000]"
          }`}
        >
          {app.label[language]}
        </span>
      </button>
    </li>
  );
}

function Desktop() {
  const { language } = usePreferences();
  const { windows } = useWindowManager();

  return (
    <>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <ul
          aria-label={retro.iconsLabel[language]}
          className="absolute left-2 top-2 flex flex-col gap-2"
        >
          {retro.apps.map((app) => (
            <DesktopIcon key={app.id} app={app} />
          ))}
        </ul>

        {windows.map((win, index) => {
          const Content = windowContents[win.id];
          return (
            <Window
              key={win.id}
              id={win.id}
              title={windowTitle(win.id, language)}
              zIndex={10 + index}
              minimized={win.minimized}
              spawn={win.spawn}
              width={windowSizes[win.id]?.width}
              height={windowSizes[win.id]?.height}
            >
              {Content ? <Content /> : <p>{retro.placeholder[language]}</p>}
            </Window>
          );
        })}
      </div>
      <TaskBar />
    </>
  );
}

export default function RetroDesktop({ assets }: { assets: RetroAssets }) {
  const { language } = usePreferences();

  return (
    <div
      id="escritorio-retro"
      role="region"
      aria-label={retro.desktopLabel[language]}
      className={`retro-root fixed inset-0 z-50 flex flex-col ${vt323.className}`}
    >
      <RetroAssetsProvider assets={assets}>
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </RetroAssetsProvider>
    </div>
  );
}
