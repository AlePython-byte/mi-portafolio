"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import { RetroModeProvider, useRetroMode } from "./RetroModeProvider";

// La capa retro solo existe en el cliente y se descarga bajo demanda.
const RetroDesktop = dynamic(() => import("./retro/RetroDesktop"), {
  ssr: false,
});

function Shell({ children }: { children: ReactNode }) {
  const { active } = useRetroMode();

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
      {active && <RetroDesktop />}
    </>
  );
}

export default function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <RetroModeProvider>
      <Shell>{children}</Shell>
    </RetroModeProvider>
  );
}
