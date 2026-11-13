"use client";

import { useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { skillIcons } from "@/components/skillIcons";
import { retro } from "@/data/retro";
import { skills } from "@/data/skills";

// Cada grupo es una carpeta expandible (disclosure con aria-expanded).
export default function SkillsWindow() {
  const { language } = usePreferences();
  const [expanded, setExpanded] = useState<string[]>([skills.groups[0]?.id]);

  function toggle(id: string) {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  return (
    <ul
      aria-label={retro.skillGroupsLabel[language]}
      className="retro-inset divide-y divide-[var(--retro-lo)]"
    >
      {skills.groups.map((group) => {
        const isOpen = expanded.includes(group.id);
        const panelId = `retro-habilidades-${group.id}`;
        return (
          <li key={group.id}>
            <button
              type="button"
              onClick={() => toggle(group.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="retro-press flex w-full items-center gap-2 p-2 text-left hover:bg-[var(--retro-select)] hover:text-[var(--retro-select-text)] focus-visible:bg-[var(--retro-select)] focus-visible:text-[var(--retro-select-text)]"
            >
              <span aria-hidden="true" className="w-4 shrink-0 text-center">
                {isOpen ? "−" : "+"}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                className="h-6 w-6 shrink-0"
                shapeRendering="crispEdges"
              >
                <path d="M2 7h11l3 3h14v17H2z" fill="#e8c34a" stroke="#000" />
              </svg>
              <span>{group.title[language]}</span>
            </button>

            {isOpen && (
              <div id={panelId} className="px-2 pb-2 pl-10">
                <p className="mb-2 text-base leading-snug opacity-80">
                  {group.description[language]}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon ? skillIcons[item.icon] : undefined;
                    return (
                      <li key={item.name} className="flex items-center gap-2">
                        {Icon ? (
                          <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                        ) : (
                          <span aria-hidden="true" className="h-4 w-4 shrink-0" />
                        )}
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
