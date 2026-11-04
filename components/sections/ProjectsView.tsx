"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePreferences } from "@/components/PreferencesProvider";
import ProjectActionButton from "@/components/ProjectActionButton";
import ProjectImage from "@/components/ProjectImage";
import { projectsSection } from "@/data/projects";
import { fillTemplate } from "@/lib/format";
import ProjectDetail from "./ProjectDetail";

type Props = {
  // Ruta final de cada imagen (la real o el placeholder), resuelta en el servidor.
  images: Record<string, string>;
};

export default function ProjectsView({ images }: Props) {
  const { language } = usePreferences();
  const shouldReduceMotion = useReducedMotion();
  const { projects } = projectsSection;
  const count = `${String(projects.length).padStart(2, "0")} ${
    projects.length === 1
      ? projectsSection.countSingular[language]
      : projectsSection.countPlural[language]
  }`;

  return (
    <section
      id="proyectos"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {projectsSection.label[language]}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl">
          {projectsSection.headline[language]}
        </h2>
        <p className="font-display text-xl font-bold tracking-tight text-accent">
          {count}
        </p>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">
        {projectsSection.subtitle[language]}
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const image = images[project.id];
          return (
            // Solo desplaza en y (sin opacidad): la tarjeta siempre queda visible.
            <motion.li
              key={project.id}
              initial={shouldReduceMotion ? false : { y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.48,
                delay: shouldReduceMotion ? 0 : index * 0.07,
              }}
            >
              <article className="flex h-full flex-col rounded-card bg-background p-4 shadow-neu sm:p-5">
                <ProjectImage
                  src={image}
                  alt={project.imageAlt[language]}
                  fit={project.imageFit}
                  position={project.imagePosition}
                  sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"
                  className="rounded-2xl shadow-neu-inset"
                />
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <h3 className="text-2xl">{project.title}</h3>
                  <p className="mt-2 opacity-80">{project.description[language]}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill px-3 py-1 text-xs font-medium shadow-neu-inset"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <ProjectActionButton
                      label={projectsSection.githubLabel[language]}
                      href={project.githubUrl}
                      disabledText={projectsSection.comingSoon[language]}
                      disabledAria={fillTemplate(
                        projectsSection.githubDisabledAria[language],
                        { title: project.title },
                      )}
                    />
                    <ProjectActionButton
                      label={projectsSection.demoLabels[project.demoLabel][language]}
                      href={project.demoUrl}
                      disabledText={projectsSection.comingSoon[language]}
                      disabledAria={fillTemplate(
                        projectsSection.demoDisabledAria[language],
                        {
                          kind: projectsSection.demoKinds[project.demoLabel][language],
                          title: project.title,
                        },
                      )}
                      primary
                    />
                    <ProjectDetail project={project} image={image} />
                  </div>
                </div>
              </article>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
