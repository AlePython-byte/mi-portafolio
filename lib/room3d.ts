// Interruptor de emergencia: en false, la habitación 3D nunca se muestra.
export const ROOM_3D_ENABLED = true;

// Color de la pantalla del monitor 3D: el mismo fondo de .retro-root (--retro-desktop
// en app/globals.css), para que la pantalla y el escritorio se fundan al hacer zoom.
export const ROOM_SCREEN_COLOR = "#007b7b"; // tema claro
export const ROOM_SCREEN_COLOR_DARK = "#0b2e2e"; // tema oscuro

type NavigatorExtra = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

// Prueba de WebGL2 con un canvas temporal que se libera al terminar.
function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

// Decide si el equipo puede mostrar la habitación 3D. Solo en el cliente.
// `?room=1` fuerza true y `?room=0` fuerza false (para pruebas).
export function detect3DSupport(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const forced = new URLSearchParams(window.location.search).get("room");
    if (forced === "0") return false;
    if (forced === "1") return true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    const nav = navigator as NavigatorExtra;
    if (nav.hardwareConcurrency < 4) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
    if (nav.connection?.saveData) return false;

    return hasWebGL2();
  } catch {
    return false;
  }
}
