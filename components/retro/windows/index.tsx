import type { ComponentType } from "react";
import ExperienceWindow from "./ExperienceWindow";
import InterestsWindow from "./InterestsWindow";
import ProfileWindow from "./ProfileWindow";
import ProjectsWindow from "./ProjectsWindow";
import SkillsWindow from "./SkillsWindow";
import TestimonialsWindow from "./TestimonialsWindow";

// Tamaño por defecto de cada ventana (por omisión: 30rem de ancho, alto libre).
export const windowSizes: Record<string, { width: string; height?: string }> =
  {
    gustos: { width: "28rem", height: "30rem" },
    proyectos: { width: "46rem", height: "32rem" },
    habilidades: { width: "28rem", height: "30rem" },
    experiencia: { width: "34rem", height: "32rem" },
    testimonios: { width: "30rem", height: "24rem" },
  };

// Contenido real de cada ventana; las que no están aquí muestran un aviso.
export const windowContents: Record<string, ComponentType> = {
  perfil: ProfileWindow,
  gustos: InterestsWindow,
  proyectos: ProjectsWindow,
  habilidades: SkillsWindow,
  experiencia: ExperienceWindow,
  testimonios: TestimonialsWindow,
};
