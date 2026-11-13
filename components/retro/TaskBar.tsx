"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRetroMode } from "@/components/RetroModeProvider";
import { ui } from "@/data/profile";
import { retro } from "@/data/retro";
import { windowTitle } from "./windowTitles";
import { useWindowManager } from "./WindowManager";

function useClock(locale: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);
  return now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskBar() {
  const { language, theme, setLanguage, toggleTheme } = usePreferences();
  const { powerOff } = useRetroMode();
  const { windows, focusedId, open, toggle } = useWindowManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const startRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const time = useClock(language);
  const dark = theme === "dark";
  const nextLanguage = language === "es" ? "en" : "es";

  // El menú Inicio se cierra con Escape (y devuelve el foco) o al hacer clic fuera.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        startRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !startRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const button = "retro-button px-3 py-0.5";

  return (
    <div
      role="toolbar"
      aria-label={retro.taskbarLabel[language]}
      className="retro-raised relative z-[1000] flex shrink-0 items-center gap-2 p-1"
    >
      <button
        ref={startRef}
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-expanded={menuOpen}
        aria-controls="retro-menu-inicio"
        className={`${button} font-bold`}
      >
        {retro.start[language]}
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          id="retro-menu-inicio"
          role="group"
          aria-label={retro.startMenuLabel[language]}
          className="retro-raised absolute bottom-full left-1 mb-1 flex min-w-44 flex-col gap-1 p-1"
        >
          {retro.apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => {
                open(app.id);
                setMenuOpen(false);
              }}
              className="retro-press px-3 py-0.5 text-left hover:bg-[var(--retro-select)] hover:text-[var(--retro-select-text)] focus-visible:bg-[var(--retro-select)] focus-visible:text-[var(--retro-select-text)]"
            >
              {app.label[language]}
            </button>
          ))}
        </div>
      )}

      <ul
        aria-label={retro.windowsLabel[language]}
        className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden"
      >
        {windows.map((win) => (
          <li key={win.id} className="min-w-0 max-w-44 flex-1">
            <button
              type="button"
              onClick={() => toggle(win.id)}
              aria-pressed={focusedId === win.id}
              className={`${button} w-full truncate text-left`}
            >
              {windowTitle(win.id, language)}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={dark}
        aria-label={dark ? ui.themeToLight[language] : ui.themeToDark[language]}
        className={button}
      >
        <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage(nextLanguage)}
        aria-label={
          nextLanguage === "en"
            ? retro.languageToEn[language]
            : retro.languageToEs[language]
        }
        className={button}
      >
        {language.toUpperCase()}
      </button>
      <span className="retro-inset px-3 py-0.5 tabular-nums">{time}</span>
      <button type="button" onClick={powerOff} className={button}>
        {retro.shutdown[language]}
      </button>
    </div>
  );
}
