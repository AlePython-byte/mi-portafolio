"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import { languages, navLinks, profile, ui } from "@/data/profile";

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(SECTION_IDS[0]);
  const { language, theme, setLanguage, toggleTheme } = usePreferences();
  const dark = theme === "dark";
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const indicatorTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 35 };

  // Cierra el menú con Escape y devuelve el foco al botón que lo abre.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Resalta la última sección (en el orden real de la página) cuya parte
  // superior ya pasó la línea de lectura.
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = SECTION_IDS[0];
      if (atBottom) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      } else {
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActive(current);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const linkClass = (id: string) =>
    `relative block rounded-pill px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
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
                  {active === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-activo-escritorio"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-pill shadow-neu-inset"
                      transition={indicatorTransition}
                    />
                  )}
                  <span className="relative">{link.label[language]}</span>
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
            ref={menuButtonRef}
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

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu-movil"
            id="menu-movil"
            aria-label={ui.navAriaLabel[language]}
            className="mx-4 mb-4 rounded-card bg-background p-3 shadow-neu lg:hidden"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
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
                    {active === link.href.slice(1) && (
                      <motion.span
                        layoutId="nav-activo-movil"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-pill shadow-neu-inset"
                        transition={indicatorTransition}
                      />
                    )}
                    <span className="relative">{link.label[language]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
