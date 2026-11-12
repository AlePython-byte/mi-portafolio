"use client";

import { useId, useRef, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import ProjectActionButton, {
  projectButtonBase,
} from "@/components/ProjectActionButton";
import VideoPlayer from "@/components/VideoPlayer";
import { projectsSection as labels } from "@/data/projects";
import type { Project } from "@/data/types";
import { fillTemplate } from "@/lib/format";
import { youtubeWatchUrl } from "@/lib/youtube";

type Props = {
  project: Project;
};

// Botón "Ver demo": con videoId abre el video ampliado en un diálogo nativo;
// sin él, enlace externo o "Próximamente".
export default function ProjectDemoButton({ project }: Props) {
  const { language } = usePreferences();
  const videoId = project.videoId?.[language];

  if (!videoId) {
    return (
      <ProjectActionButton
        label={labels.demoLabels[project.demoLabel][language]}
        href={project.demoUrl}
        disabledText={labels.comingSoon[language]}
        disabledAria={fillTemplate(labels.demoDisabledAria[language], {
          kind: labels.demoKinds[project.demoLabel][language],
          title: project.title,
        })}
        primary
      />
    );
  }
  return <VideoDialog project={project} videoId={videoId} />;
}

function VideoDialog({
  project,
  videoId,
}: {
  project: Project;
  videoId: string;
}) {
  const { language } = usePreferences();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  // El iframe solo existe mientras el diálogo está abierto.
  const [open, setOpen] = useState(false);
  const values = { title: project.title };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-label={fillTemplate(labels.demoOpenAria[language], values)}
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className={`${projectButtonBase} bg-accent text-accent-foreground`}
      >
        {labels.demoLabels[project.demoLabel][language]}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Cierra al hacer clic en el fondo (el diálogo no tiene padding).
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => {
          setOpen(false);
          // Devuelve el foco al botón que abrió la vista.
          triggerRef.current?.focus();
        }}
        // Ancho limitado por el alto para que el video entero quepa sin scroll.
        style={{
          width: "min(92vw, 1000px, calc((92dvh - 4.5rem) * 16 / 9))",
        }}
        className="dialog-enter m-auto max-h-none max-w-none overflow-hidden rounded-card bg-background p-0 text-foreground shadow-neu backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-3 p-3 sm:px-5">
          <h2
            id={titleId}
            className="min-w-0 text-lg [overflow-wrap:anywhere] sm:text-2xl"
          >
            {project.title}
          </h2>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={youtubeWatchUrl(videoId)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fillTemplate(labels.watchOnYoutubeAria[language], values)}
              className="rounded-pill px-3 py-2 text-xs font-semibold shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4 sm:text-sm"
            >
              {labels.watchOnYoutube[language]}
            </a>
            <button
              type="button"
              aria-label={labels.close[language]}
              onClick={() => dialogRef.current?.close()}
              className="grid h-10 w-10 place-items-center rounded-pill bg-background shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {open && (
            <VideoPlayer
              videoId={videoId}
              title={fillTemplate(labels.videoTitle[language], values)}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
