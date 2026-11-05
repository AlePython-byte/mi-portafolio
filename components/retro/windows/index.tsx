import type { ComponentType } from "react";
import InterestsWindow from "./InterestsWindow";
import ProfileWindow from "./ProfileWindow";

// Contenido real de cada ventana; las que no están aquí muestran un aviso.
// Tamaño por defecto de cada ventana (por omisión: 30rem de ancho, alto libre).
export const windowSizes: Record<string, { width: string; height?: string }> =
  {
    gustos: { width: "28rem", height: "30rem" },
  };

export const windowContents: Record<string, ComponentType> = {
  perfil: ProfileWindow,
  gustos: InterestsWindow,
};
