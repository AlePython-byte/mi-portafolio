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

type RetroModeValue = {
  available: boolean; // este dispositivo admite el modo retro
  active: boolean; // el escritorio retro está encendido
  powerOn: () => void;
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
  const [wanted, setWanted] = useState(false);
  const available = useMediaQuery(RETRO_QUERY);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible: se usa el valor por defecto.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWanted(saved === "retro");
  }, []);

  const value: RetroModeValue = {
    available,
    active: available && wanted,
    powerOn: () => {
      setWanted(true);
      save("retro");
    },
    powerOff: () => {
      setWanted(false);
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
