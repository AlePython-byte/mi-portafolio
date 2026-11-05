import fs from "node:fs";
import path from "node:path";
import { experienceSection } from "@/data/experience";
import { projectsSection } from "@/data/projects";
import type { RetroAssets } from "@/components/retro/RetroAssets";

function fileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

// Solo para componentes de servidor: comprueba las imágenes con fs una vez y
// entrega el resultado ya resuelto al escritorio retro.
export function resolveRetroAssets(): RetroAssets {
  return {
    projectImages: Object.fromEntries(
      projectsSection.projects.map((project) => [
        project.id,
        fileExists(project.image)
          ? project.image
          : projectsSection.placeholderImage,
      ]),
    ),
    badges: Object.fromEntries(
      experienceSection.items
        .filter((item) => item.badge)
        .map((item) => [item.id, fileExists(item.badge!.src)]),
    ),
  };
}
