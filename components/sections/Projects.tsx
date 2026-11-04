import fs from "node:fs";
import path from "node:path";
import { projectsSection } from "@/data/projects";
import ProjectsView from "./ProjectsView";

// Si la imagen del proyecto aún no existe en public/, se usa el placeholder.
function resolveImage(image: string): string {
  const file = path.join(process.cwd(), "public", image);
  return fs.existsSync(file) ? image : projectsSection.placeholderImage;
}

export default function Projects() {
  const images = Object.fromEntries(
    projectsSection.projects.map((project) => [
      project.id,
      resolveImage(project.image),
    ]),
  );

  return <ProjectsView images={images} />;
}
