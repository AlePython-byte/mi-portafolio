import type { ComponentType } from "react";
import ProfileWindow from "./ProfileWindow";

// Contenido real de cada ventana; las que no están aquí muestran un aviso.
export const windowContents: Record<string, ComponentType> = {
  perfil: ProfileWindow,
};
