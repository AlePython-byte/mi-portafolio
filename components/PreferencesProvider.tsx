"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Language } from "@/data/types";

type Theme = "light" | "dark";

type PreferencesContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);
const preferenceEvent = "portfolio-preference-change";

function subscribeToPreferences(callback: () => void) {
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLanguageSnapshot(): Language {
  try {
    const storedLanguage = window.localStorage.getItem("portfolio-language");
    if (storedLanguage === "es" || storedLanguage === "en") {
      return storedLanguage;
    }
  } catch {}

  return document.documentElement.lang === "en" ? "en" : "es";
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeToPreferences,
    getLanguageSnapshot,
    () => "es" as Language,
  );
  const theme = useSyncExternalStore<Theme>(
    subscribeToPreferences,
    getThemeSnapshot,
    () => "light" as Theme,
  );

  const setLanguage = (nextLanguage: Language) => {
    document.documentElement.lang = nextLanguage;
    try {
      window.localStorage.setItem("portfolio-language", nextLanguage);
    } catch {}
    window.dispatchEvent(new Event(preferenceEvent));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch {}
    window.dispatchEvent(new Event(preferenceEvent));
  };

  return (
    <PreferencesContext.Provider
      value={{ language, theme, setLanguage, toggleTheme }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}
