"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import ProjectActionButton from "@/components/ProjectActionButton";
import VideoPlayer from "@/components/VideoPlayer";
import { projectsSection as labels } from "@/data/projects";
import { retro } from "@/data/retro";
import { useRetroAssets } from "../RetroAssets";
import type { Project } from "@/data/types";
import { fillTemplate } from "@/lib/format";
import { youtubeWatchUrl } from "@/lib/youtube";

const heading = "text-xl font-normal tracking-normal underline";

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-5 w-5 shrink-0"
      shapeRendering="crispEdges"
    >
      <path d="M3 1h7l3 3v11H3z" fill="#fff" stroke="#000" />
      <path d="M5 7h6M5 9h6M5 11h6" stroke="#000" />
    </svg>
  );
}

function ProjectImage({ project }: { project: Project }) {
  const { language } = usePreferences();
  // La imagen (o el placeholder) ya viene comprobada desde el servidor.
  const { projectImages } = useRetroAssets();
  return (
    <div className="retro-inset relative aspect-[16/10] w-full overflow-hidden">
      <Image
        src={projectImages[project.id] ?? labels.placeholderImage}
        alt={project.imageAlt[language]}
        fill
        unoptimized={projectImages[project.id]?.endsWith(".svg")}
        sizes="30rem"
        className={`${
          project.imageFit === "contain" ? "object-contain p-2" : "object-cover"
        } ${project.imagePosition === "top" ? "object-top" : "object-center"}`}
      />
    </div>
  );
}

// Vista del video dentro de la ventana; el iframe vive solo mientras se muestra.
function VideoView({
  project,
  videoId,
  onBack,
}: {
  project: Project;
  videoId: string;
  onBack: () => void;
}) {
  const { language } = usePreferences();
  const values = { title: project.title };
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3
          className="text-2xl font-normal tracking-normal"
          style={{ letterSpacing: "normal" }}
        >
          {project.title}
        </h3>
        <div className="flex gap-2">
          <a
            href={youtubeWatchUrl(videoId)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fillTemplate(labels.watchOnYoutubeAria[language], values)}
            className="retro-button inline-block px-3 py-1 no-underline"
          >
            {labels.watchOnYoutube[language]}
          </a>
          <button
            ref={backRef}
            type="button"
            onClick={onBack}
            className="retro-button px-3 py-1"
          >
            {retro.back[language]}
          </button>
        </div>
      </div>
      <div className="retro-inset relative aspect-video w-full bg-black">
        <VideoPlayer
          videoId={videoId}
          title={fillTemplate(labels.videoTitle[language], values)}
        />
      </div>
    </div>
  );
}

function Detail({
  project,
  onWatch,
  watchRef,
}: {
  project: Project;
  onWatch: () => void;
  watchRef: RefObject<HTMLButtonElement | null>;
}) {
  const { language } = usePreferences();
  const { details } = project;

  return (
    <div className="space-y-4">
      <ProjectImage key={project.id} project={project} />

      <header>
        <h3
          className="text-2xl font-normal tracking-normal"
          style={{ letterSpacing: "normal" }}
        >
          {project.title}
        </h3>
        <p className="mt-1 leading-snug">{details.summary[language]}</p>
      </header>

      <section>
        <h4 className={heading}>{labels.whatItDoes[language]}</h4>
        <ul className="mt-1 list-inside list-disc space-y-1">
          {details.features.map((feature) => (
            <li key={feature.es}>{feature[language]}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={heading}>{labels.stackTitle[language]}</h4>
        <ul className="mt-1 space-y-2">
          {details.stack.map((group) => (
            <li key={group.label.es}>
              <p className="font-bold">{group.label[language]}</p>
              <ul className="mt-1 flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <li
                    key={typeof item === "string" ? item : item.es}
                    className="retro-button px-2 text-base"
                  >
                    {typeof item === "string" ? item : item[language]}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {details.highlights && details.highlights.length > 0 && (
        <section>
          <h4 className={heading}>{labels.detailsTitle[language]}</h4>
          <ul className="mt-1 list-inside list-disc space-y-1">
            {details.highlights.map((highlight) => (
              <li key={highlight.es}>{highlight[language]}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        <ProjectActionButton
          variant="retro"
          label={
            project.githubLabel?.[language] ?? labels.githubLabel[language]
          }
          href={project.githubUrl}
          disabledText={labels.comingSoon[language]}
          disabledAria={fillTemplate(labels.githubDisabledAria[language], {
            title: project.title,
          })}
        />
        {project.videoId ? (
          <button
            ref={watchRef}
            type="button"
            onClick={onWatch}
            aria-haspopup="true"
            aria-label={fillTemplate(labels.demoOpenAria[language], {
              title: project.title,
            })}
            className="retro-button px-4 py-1 font-bold"
          >
            {labels.demoLabels[project.demoLabel][language]}
          </button>
        ) : (
          <ProjectActionButton
            variant="retro"
            primary
            label={labels.demoLabels[project.demoLabel][language]}
            href={project.demoUrl}
            disabledText={labels.comingSoon[language]}
            disabledAria={fillTemplate(labels.demoDisabledAria[language], {
              kind: labels.demoKinds[project.demoLabel][language],
              title: project.title,
            })}
          />
        )}
      </div>
    </div>
  );
}

// Estilo explorador de archivos: lista a la izquierda, detalle a la derecha.
export default function ProjectsWindow() {
  const { language } = usePreferences();
  const [selectedId, setSelectedId] = useState(labels.projects[0]?.id);
  // Proyecto cuyo video se muestra en lugar del detalle.
  const [videoFor, setVideoFor] = useState<string | null>(null);
  const watchRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);

  // Al volver del video, el foco regresa al botón "Ver demo".
  useEffect(() => {
    if (videoFor === null && returnFocus.current) {
      returnFocus.current = false;
      watchRef.current?.focus();
    }
  }, [videoFor]);
  const selected =
    labels.projects.find((project) => project.id === selectedId) ??
    labels.projects[0];

  return (
    <div className="flex h-full min-h-0 gap-2">
      <ul
        aria-label={retro.projectListLabel[language]}
        className="retro-inset w-44 shrink-0 overflow-y-auto"
      >
        {labels.projects.map((project) => {
          const isSelected = project.id === selected?.id;
          return (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(project.id);
                  setVideoFor(null);
                }}
                aria-current={isSelected ? "true" : undefined}
                className={`flex w-full items-start gap-2 p-1.5 text-left hover:bg-[var(--retro-select)] hover:text-[var(--retro-select-text)] focus-visible:bg-[var(--retro-select)] focus-visible:text-[var(--retro-select-text)] ${
                  isSelected
                    ? "bg-[var(--retro-select)] text-[var(--retro-select-text)]"
                    : ""
                }`}
              >
                <FileIcon />
                <span className="min-w-0">
                  <span className="block">{project.title}</span>
                  <span className="block text-base leading-tight opacity-80">
                    {project.tags.join(", ")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="retro-inset min-w-0 flex-1 overflow-y-auto p-3">
        {selected && videoFor === selected.id && selected.videoId ? (
          <VideoView
            project={selected}
            videoId={selected.videoId[language]}
            onBack={() => {
              returnFocus.current = true;
              setVideoFor(null);
            }}
          />
        ) : (
          selected && (
            <Detail
              project={selected}
              onWatch={() => setVideoFor(selected.id)}
              watchRef={watchRef}
            />
          )
        )}
      </div>
    </div>
  );
}
