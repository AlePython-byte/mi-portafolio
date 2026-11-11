"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import type { RetroAssets } from "./retro/RetroAssets";
import { RetroModeProvider, useRetroMode } from "./RetroModeProvider";

// La capa retro solo existe en el cliente y se descarga bajo demanda.
const RetroDesktop = dynamic(() => import("./retro/RetroDesktop"), {
  ssr: false,
});

function Shell({
  assets,
  children,
}: {
  assets: RetroAssets;
  children: ReactNode;
}) {
  const { active, phase, enterDesktop } = useRetroMode();

  // Por ahora la habitación no existe: se pasa directo al escritorio.
  useEffect(() => {
    if (phase === "room") enterDesktop();
  }, [phase, enterDesktop]);

  // Con el escritorio encendido, el fondo no hace scroll.
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [active]);

  return (
    <>
      {/* El modo plano siempre se renderiza; tapado por el escritorio, queda inerte. */}
      <div className="contents" inert={active} aria-hidden={active || undefined}>
        {children}
      </div>
      {active && phase === "desktop" && <RetroDesktop assets={assets} />}
    </>
  );
}

export default function PortfolioShell({
  assets,
  children,
}: {
  // Comprobado en el servidor; lo usan las ventanas del escritorio retro.
  assets: RetroAssets;
  children: ReactNode;
}) {
  return (
    <RetroModeProvider>
      <Shell assets={assets}>{children}</Shell>
    </RetroModeProvider>
  );
}
