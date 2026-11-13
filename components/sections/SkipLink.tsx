"use client";

import { usePreferences } from "@/components/PreferencesProvider";
import { ui } from "@/data/profile";

// Primer elemento enfocable de la página: solo se ve al recibir el foco.
export default function SkipLink() {
  const { language } = usePreferences();

  return (
    <a
      href={`#${ui.mainContentId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-accent-foreground focus:shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {ui.skipToContent[language]}
    </a>
  );
}
