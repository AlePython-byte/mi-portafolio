"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import ProjectActionButton, {
  projectButtonBase,
} from "@/components/ProjectActionButton";
import { fillTemplate } from "@/lib/format";
import type { Project, ProjectsData } from "@/data/types";

type Labels = Pick<
  ProjectsData,
  | "moreInfo"
  | "moreInfoAria"
  | "close"
  | "whatItDoes"
  | "stackTitle"
  | "detailsTitle"
  | "githubLabel"
  | "comingSoon"
  | "githubDisabledAria"
  | "demoDisabledAria"
  | "demoKinds"
>;

type Props = {
  project: Project;
  image: string;
  labels: Labels;
};

export default function ProjectDetail({ project, image, labels }: Props) {
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
        aria-label={fillTemplate(labels.moreInfoAria, {
          title: project.title,
        })}
        onClick={() => dialogRef.current?.showModal()}
        className={projectButtonBase}
      >
        {labels.moreInfo}
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
            aria-label={labels.close}
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

        <div className="relative aspect-video">
          <Image
            src={image}
            alt={project.imageAlt}
            fill
            unoptimized={image.endsWith(".svg")}
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-8 p-5 sm:p-8">
          <header>
            <h2 id={titleId} className="text-3xl sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">
              {details.summary}
            </p>
          </header>

          <section>
            <h3 className="text-xl">{labels.whatItDoes}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
              {details.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl">{labels.stackTitle}</h3>
            <ul className="mt-3 space-y-4">
              {details.stack.map((group) => (
                <li key={group.label}>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    {group.label}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-pill px-3 py-1 text-xs font-medium shadow-neu-inset"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {details.highlights && details.highlights.length > 0 && (
            <section>
              <h3 className="text-xl">{labels.detailsTitle}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
                {details.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-3">
            <ProjectActionButton
              label={labels.githubLabel}
              href={project.githubUrl}
              disabledText={labels.comingSoon}
              disabledAria={fillTemplate(labels.githubDisabledAria, {
                title: project.title,
              })}
            />
            <ProjectActionButton
              label={project.demoLabel}
              href={project.demoUrl}
              disabledText={labels.comingSoon}
              disabledAria={fillTemplate(labels.demoDisabledAria, {
                kind: labels.demoKinds[project.demoLabel],
                title: project.title,
              })}
              primary
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
