import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ProjectActionButton from "@/components/ProjectActionButton";
import { projectsSection } from "@/data/projects";

// Si la imagen del proyecto aún no existe en public/, se usa el placeholder.
function resolveImage(image: string): string {
  const file = path.join(process.cwd(), "public", image);
  return fs.existsSync(file) ? image : projectsSection.placeholderImage;
}

export default function Projects() {
  const { projects } = projectsSection;
  const count = `${String(projects.length).padStart(2, "0")} ${
    projects.length === 1
      ? projectsSection.countSingular
      : projectsSection.countPlural
  }`;

  return (
    <section
      id="proyectos"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
        {projectsSection.label}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl">
          {projectsSection.headline}
        </h2>
        <p className="font-display text-xl font-bold tracking-tight text-accent">
          {count}
        </p>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">
        {projectsSection.subtitle}
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const image = resolveImage(project.image);
          return (
            <li key={project.id}>
              <article className="flex h-full flex-col rounded-card bg-background p-4 shadow-neu sm:p-5">
                <div className="relative aspect-video overflow-hidden rounded-2xl shadow-neu-inset">
                  <Image
                    src={image}
                    alt={project.imageAlt}
                    fill
                    unoptimized={image.endsWith(".svg")}
                    sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <h3 className="text-2xl">{project.title}</h3>
                  <p className="mt-2 opacity-80">{project.description}</p>
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
                      label={projectsSection.githubLabel}
                      href={project.githubUrl}
                      disabledText={projectsSection.comingSoon}
                    />
                    <ProjectActionButton
                      label={project.demoLabel}
                      href={project.demoUrl}
                      disabledText={projectsSection.comingSoon}
                      primary
                    />
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
