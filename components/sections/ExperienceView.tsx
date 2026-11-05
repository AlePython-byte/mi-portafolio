"use client";

import { motion, useReducedMotion } from "motion/react";
import ImageDialog from "@/components/ImageDialog";
import { usePreferences } from "@/components/PreferencesProvider";
import { experienceSection } from "@/data/experience";
import { projectsSection } from "@/data/projects";
import type { Experience as ExperienceItem, Project } from "@/data/types";
import { fillTemplate } from "@/lib/format";

type Props = {
  // Elementos con la escarapela ya filtrada si su archivo no existe.
  items: ExperienceItem[];
};

export default function ExperienceView({ items }: Props) {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  // Solo desplaza en y (sin opacidad): el contenido siempre queda visible.
  const reveal = (delay = 0) =>
    ({
      initial: shouldReduceMotion ? false : { y: 20 },
      whileInView: { y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: { duration: 0.45, delay: shouldReduceMotion ? 0 : delay },
    }) as const;

  const data = experienceSection;
  const blocks = [
    { kind: "academic", title: data.academicTitle },
    { kind: "work", title: data.workTitle },
  ] as const;

  // Dato por completar: texto neutro, no código.
  const pending = (
    <span className="italic text-muted">{data.pending[language]}</span>
  );

  function renderItem(item: ExperienceItem, index: number) {
    const metaLine = [item.role?.[language], item.location?.[language]]
      .filter(Boolean)
      .join(" · ");
    // Datos tomados de data/projects.ts; los ids que no existan se omiten.
    const relatedProjects = (item.relatedProjectIds ?? [])
      .map((id) => projectsSection.projects.find((p) => p.id === id))
      .filter((p): p is Project => p !== undefined);

    return (
      <motion.li
        key={item.id}
        {...reveal(Math.min(index, 3) * 0.06)}
        className="relative pl-8"
      >
        <span
          aria-hidden="true"
          className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-pill bg-accent ring-4 ring-background"
        />
        <h4 className="text-xl [overflow-wrap:anywhere]">
          {item.title[language]}
        </h4>

        {item.organization !== undefined && (
          <p className="mt-1 text-sm font-semibold text-accent [overflow-wrap:anywhere]">
            {item.organizationLabel && `${item.organizationLabel[language]}: `}
            {item.organization === null
              ? pending
              : item.organization[language]}
          </p>
        )}

        {metaLine && <p className="mt-1 text-sm text-muted">{metaLine}</p>}

        {(item.period !== undefined || item.ongoing) && (
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            {item.period !== undefined && (
              <span>
                {item.periodLabel && `${item.periodLabel[language]}: `}
                {item.period === null ? pending : item.period[language]}
              </span>
            )}
            {item.ongoing && (
              <span className="rounded-pill px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-accent shadow-neu-inset">
                {data.ongoing[language]}
              </span>
            )}
          </p>
        )}

        {item.description !== undefined && (
          <p className="mt-3 leading-relaxed opacity-80">
            {item.description === null ? pending : item.description[language]}
          </p>
        )}

        {relatedProjects.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold">
              {data.featuredProjectsTitle[language]}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {relatedProjects.map((project) => (
                <li key={project.id}>
                  {project.githubUrl !== "#" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent underline-offset-4 hover:underline"
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

        {item.badge && (
          <div className="mt-4">
            <ImageDialog
              src={item.badge.src}
              alt={item.badge.alt[language]}
              title={item.title[language]}
              triggerLabel={data.viewBadge[language]}
              triggerAria={fillTemplate(data.viewBadgeAria[language], {
                title: item.title[language],
              })}
              closeLabel={data.close[language]}
            />
          </div>
        )}
      </motion.li>
    );
  }

  return (
    <section
      id="experiencia"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {data.label[language]}
      </p>
      <motion.h2
        {...reveal()}
        className="text-4xl sm:text-5xl lg:text-7xl"
      >
        {data.headline[language]}
      </motion.h2>

      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
        {blocks.map((block) => {
          const blockItems = items.filter((item) => item.kind === block.kind);
          return (
            <div key={block.kind} className="min-w-0">
              <motion.h3 {...reveal()} className="text-2xl">
                {block.title[language]}
              </motion.h3>
              <ol className="mt-8 ml-1 space-y-10 border-l-2 border-line-strong">
                {blockItems.map(renderItem)}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
