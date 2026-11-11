"use client";

import { VT323 } from "next/font/google";
import { usePreferences } from "@/components/PreferencesProvider";
import { retro } from "@/data/retro";
import { RetroAssetsProvider, type RetroAssets } from "./RetroAssets";
import DesktopIcons from "./DesktopIcons";
import Mullis from "./Mullis";
import TaskBar from "./TaskBar";
import Window from "./Window";
import { WindowManagerProvider, useWindowManager } from "./WindowManager";
import { windowTitle } from "./windowTitles";
import { windowContents, windowSizes } from "./windows";

// La fuente pixelada solo se usa en el modo retro.
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

function Desktop() {
  const { language } = usePreferences();
  const { windows } = useWindowManager();

  return (
    <>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <DesktopIcons />

        <Mullis />

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
