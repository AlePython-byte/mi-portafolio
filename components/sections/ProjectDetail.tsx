"use client";

import { useId, useRef } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import ProjectActionButton, {
  projectButtonBase,
} from "@/components/ProjectActionButton";
import ProjectDemoButton from "@/components/ProjectDemoButton";
import ProjectImage from "@/components/ProjectImage";
import { projectsSection as labels } from "@/data/projects";
import { fillTemplate } from "@/lib/format";
import type { Project } from "@/data/types";

type Props = {
  project: Project;
  image: string;
};

export default function ProjectDetail({ project, image }: Props) {
  const { language } = usePreferences();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const { details } = project;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-label={fillTemplate(labels.moreInfoAria[language], {
          title: project.title,
        })}
        onClick={() => dialogRef.current?.showModal()}
        className={projectButtonBase}
      >
        {labels.moreInfo[language]}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Cierra al hacer clic en el fondo: el diálogo no tiene padding,
        // así que solo el fondo llega con el diálogo como destino.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        // Devuelve el foco al botón que abrió la ventana.
        onClose={() => triggerRef.current?.focus()}
        className="dialog-enter m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-background p-0 text-foreground backdrop:bg-black/50 backdrop:backdrop-blur-sm md:m-auto md:h-auto md:max-h-[90dvh] md:max-w-3xl md:rounded-card md:shadow-neu"
      >
        <div className="sticky top-0 z-10 flex h-0 justify-end">
          <button
            type="button"
            aria-label={labels.close[language]}
            onClick={() => dialogRef.current?.close()}
            className="m-3 grid h-10 w-10 place-items-center rounded-pill bg-background shadow-neu-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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

        <ProjectImage
          src={image}
          alt={project.imageAlt[language]}
          fit={project.imageFit}
          position={project.imagePosition}
          sizes="(min-width: 768px) 48rem, 100vw"
        />

        <div className="space-y-8 p-5 sm:p-8">
          <header>
            <h2 id={titleId} className="text-3xl sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">
              {details.summary[language]}
            </p>
          </header>

          <section>
            <h3 className="text-xl">{labels.whatItDoes[language]}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
              {details.features.map((feature) => (
                <li key={feature.es}>{feature[language]}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl">{labels.stackTitle[language]}</h3>
            <ul className="mt-3 space-y-4">
              {details.stack.map((group) => (
                <li key={group.label.es}>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    {group.label[language]}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={typeof item === "string" ? item : item.es}
                        className="rounded-pill px-3 py-1 text-xs font-medium shadow-neu-inset"
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
              <h3 className="text-xl">{labels.detailsTitle[language]}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                {details.highlights.map((highlight) => (
                  <li key={highlight.es}>{highlight[language]}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-3">
            <ProjectActionButton
              label={
                project.githubLabel?.[language] ?? labels.githubLabel[language]
              }
              href={project.githubUrl}
              disabledText={labels.comingSoon[language]}
              disabledAria={fillTemplate(labels.githubDisabledAria[language], {
                title: project.title,
              })}
            />
            <ProjectDemoButton project={project} />
          </div>
        </div>
      </dialog>
    </>
  );
}
