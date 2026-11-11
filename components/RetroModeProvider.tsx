"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const STORAGE_KEY = "portfolio-mode";

// El modo retro solo existe en escritorio con ratón (≥768 px).
const RETRO_QUERY =
  "(min-width: 768px) and (hover: hover) and (pointer: fine)";

type Phase = "flat" | "room" | "desktop";

type RetroModeValue = {
  available: boolean; // este dispositivo admite el modo retro
  active: boolean; // el modo retro está encendido (habitación o escritorio)
  phase: Phase;
  powerOn: () => void; // pasa a la habitación, sin guardar
  enterDesktop: () => void; // pasa al escritorio y guarda "retro"
  powerOff: () => void;
};

const RetroModeContext = createContext<RetroModeValue | null>(null);

function save(mode: "retro" | "flat") {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Se ignora: el cambio sigue valiendo para esta sesión.
  }
}

export function RetroModeProvider({ children }: { children: ReactNode }) {
  // Por defecto, modo plano.
  const [phase, setPhase] = useState<Phase>("flat");
  const available = useMediaQuery(RETRO_QUERY);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible: se usa el valor por defecto.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(saved === "retro" ? "desktop" : "flat");
  }, []);

  const value: RetroModeValue = {
    available,
    active: available && phase !== "flat",
    phase,
    powerOn: () => setPhase("room"),
    enterDesktop: () => {
      setPhase("desktop");
      save("retro");
    },
    powerOff: () => {
      setPhase("flat");
      save("flat");
    },
  };

  return (
    <RetroModeContext.Provider value={value}>
      {children}
    </RetroModeContext.Provider>
  );
}

export function useRetroMode() {
  const context = useContext(RetroModeContext);
  if (!context) {
    throw new Error("useRetroMode must be used within RetroModeProvider");
  }
  return context;
}
