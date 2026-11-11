"use client";

import { useEffect, useRef, useState } from "react";
import LanyardBadge from "@/components/LanyardBadge";
import { usePreferences } from "@/components/PreferencesProvider";
import { experienceSection as data } from "@/data/experience";
import { projectsSection } from "@/data/projects";
import type { Experience, Project } from "@/data/types";
import { fillTemplate } from "@/lib/format";
import { useRetroAssets } from "../RetroAssets";

const folders = [
  { kind: "academic", title: data.academicTitle },
  { kind: "work", title: data.workTitle },
] as const;

const rowButton =
  "flex w-full items-center gap-2 p-2 text-left hover:bg-[var(--retro-select)] hover:text-[var(--retro-select-text)] focus-visible:bg-[var(--retro-select)] focus-visible:text-[var(--retro-select-text)]";

function Entry({
  item,
  hasBadge,
  onViewBadge,
  registerTrigger,
}: {
  item: Experience;
  hasBadge: boolean;
  onViewBadge: () => void;
  registerTrigger: (node: HTMLButtonElement | null) => void;
}) {
  const { language } = usePreferences();
  const pending = (
    <span className="italic opacity-70">{data.pending[language]}</span>
  );
  const meta = [item.role?.[language], item.location?.[language]]
    .filter(Boolean)
    .join(" · ");
  // Datos tomados de data/projects.ts; los ids que no existan se omiten.
  const related = (item.relatedProjectIds ?? [])
    .map((id) => projectsSection.projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);

  return (
    <li className="border-l-2 border-[var(--retro-lo)] pl-3">
      <p className="font-bold">{item.title[language]}</p>

      {item.organization !== undefined && (
        <p className="text-base leading-tight">
          {item.organizationLabel && `${item.organizationLabel[language]}: `}
          {item.organization === null ? pending : item.organization[language]}
        </p>
      )}
      {meta && <p className="text-base leading-tight opacity-80">{meta}</p>}

      {(item.period !== undefined || item.ongoing) && (
        <p className="text-base leading-tight opacity-80">
          {item.period !== undefined && (
            <span>
              {item.periodLabel && `${item.periodLabel[language]}: `}
              {item.period === null ? pending : item.period[language]}
            </span>
          )}
          {item.ongoing && (
            <span className="retro-button ml-2 px-1 text-sm uppercase">
              {data.ongoing[language]}
            </span>
          )}
        </p>
      )}

      {item.description !== undefined && (
        <p className="mt-1 leading-snug">
          {item.description === null ? pending : item.description[language]}
        </p>
      )}

      {related.length > 0 && (
        <div className="mt-1">
          <p className="underline">{data.featuredProjectsTitle[language]}</p>
          <ul className="list-inside list-disc">
            {related.map((project) => (
              <li key={project.id}>
                {project.githubUrl !== "#" ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.badge && hasBadge && (
        <button
          type="button"
          ref={registerTrigger}
          onClick={onViewBadge}
          aria-label={fillTemplate(data.viewBadgeAria[language], {
            title: item.title[language],
          })}
          className="retro-button mt-2 px-3 py-0.5"
        >
          {data.viewBadge[language]}
        </button>
      )}
    </li>
  );
}

// Panel de la escarapela dentro de la misma ventana (sin diálogo anidado).
function BadgePanel({
  item,
  onClose,
}: {
  item: Experience & { badge: NonNullable<Experience["badge"]> };
  onClose: () => void;
}) {
  const { language } = usePreferences();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="space-y-3"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          // Cierra solo el panel; la ventana sigue abierta.
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <h3
        className="text-xl font-normal tracking-normal"
        style={{ letterSpacing: "normal" }}
      >
        {item.title[language]}
      </h3>
      <LanyardBadge
        src={item.badge.src}
        alt={item.badge.alt[language]}
        label={item.title[language]}
        hint={data.badgeHint[language]}
        missingLabel={data.badgeMissing[language]}
        variant="retro"
      />
      <button
        type="button"
        ref={closeRef}
        onClick={onClose}
        className="retro-button px-4 py-1"
      >
        {data.close[language]}
      </button>
    </div>
  );
}

export default function ExperienceWindow() {
  const { language } = usePreferences();
  const { badges } = useRetroAssets();
  const [expanded, setExpanded] = useState<string[]>(["academic"]);
  const [badgeId, setBadgeId] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastOpened = useRef<string | null>(null);

  const badgeItem = data.items.find((item) => item.id === badgeId);

  function toggle(kind: string) {
    setExpanded((current) =>
      current.includes(kind)
        ? current.filter((value) => value !== kind)
        : [...current, kind],
    );
  }

  function closeBadge() {
    const id = lastOpened.current;
    setBadgeId(null);
    // El foco vuelve al botón "Ver escarapela" cuando la lista reaparece.
    if (id) requestAnimationFrame(() => triggers.current[id]?.focus());
  }

  if (badgeItem?.badge) {
    return (
      <BadgePanel
        item={{ ...badgeItem, badge: badgeItem.badge }}
        onClose={closeBadge}
      />
    );
  }

  return (
    <ul
      aria-label={data.headline[language]}
      className="retro-inset divide-y divide-[var(--retro-lo)]"
    >
      {folders.map((folder) => {
        const isOpen = expanded.includes(folder.kind);
        const panelId = `retro-experiencia-${folder.kind}`;
        const items = data.items.filter((item) => item.kind === folder.kind);
        return (
          <li key={folder.kind}>
            <button
              type="button"
              onClick={() => toggle(folder.kind)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={rowButton}
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
              <span>{folder.title[language]}</span>
            </button>
            {isOpen && (
              <ol id={panelId} className="space-y-4 p-3 pl-6">
                {items.map((item) => (
                  <Entry
                    key={item.id}
                    item={item}
                    hasBadge={badges[item.id] === true}
                    onViewBadge={() => {
                      lastOpened.current = item.id;
                      setBadgeId(item.id);
                    }}
                    registerTrigger={(node) => {
                      triggers.current[item.id] = node;
                    }}
                  />
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ul>
  );
}
