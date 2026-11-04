"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

// La capa retro solo existe en el cliente y se descarga bajo demanda.
const RetroDesktop = dynamic(() => import("./retro/RetroDesktop"), {
  ssr: false,
});

const STORAGE_KEY = "portfolio-mode";

// Mientras RetroDesktop sea un placeholder, el botón y la capa retro quedan ocultos.
const RETRO_READY = false;

export default function PortfolioShell({ children }: { children: ReactNode }) {
  // El modo plano (children) siempre se renderiza; retro solo si el usuario lo eligió.
  const [retro, setRetro] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible: se usa el valor por defecto.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRetro(saved === "retro");
  }, []);

  function toggle() {
    const next = !retro;
    setRetro(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "retro" : "flat");
    } catch {
      // Se ignora: el cambio sigue valiendo para esta sesión.
    }
  }

  return (
    <>
      {children}
      {RETRO_READY && retro && <RetroDesktop />}
      {RETRO_READY && (
        <button
          type="button"
          onClick={toggle}
          className="fixed bottom-4 right-4 z-[60]"
        >
          {retro ? "Modo plano" : "Modo retro"}
        </button>
      )}
    </>
  );
}
