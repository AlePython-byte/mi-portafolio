"use client";

import { useEffect, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { languages, navLinks, profile, ui } from "@/data/profile";

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(SECTION_IDS[0]);
  const { language, theme, setLanguage, toggleTheme } = usePreferences();
  const dark = theme === "dark";

  // Cierra el menú con Escape.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Resalta el enlace de la sección visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `block rounded-pill px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
      active === id ? "text-accent" : "text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href={navLinks[0].href}
          className="font-display text-2xl font-bold tracking-tighter text-accent"
        >
          {profile.initials}
        </a>

        <nav aria-label={ui.navAriaLabel[language]} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={
                    active === link.href.slice(1) ? "true" : undefined
                  }
                  className={linkClass(link.href.slice(1))}
                >
                  {link.label[language]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={dark ? ui.themeToLight[language] : ui.themeToDark[language]}
            className="grid h-10 w-10 place-items-center rounded-pill shadow-neu-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {dark ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              )}
            </svg>
          </button>

          <div
            role="group"
            aria-label={ui.languageGroup[language]}
            className="flex rounded-pill p-1 shadow-neu-inset"
          >
            {languages.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => setLanguage(option.code)}
                aria-pressed={language === option.code}
                className={`rounded-pill px-3 py-1 text-xs font-bold ${
                  language === option.code
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? ui.menuClose[language] : ui.menuOpen[language]}
            className="grid h-10 w-10 place-items-center rounded-pill shadow-neu-sm lg:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label={ui.navAriaLabel[language]}
          className="mx-4 mb-4 rounded-card bg-background p-3 shadow-neu lg:hidden"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    active === link.href.slice(1) ? "true" : undefined
                  }
                  className={linkClass(link.href.slice(1))}
                >
                  {link.label[language]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
