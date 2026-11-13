// Paleta y luces de la habitación 3D según el tema. Mismo número de luces en
// ambos temas: así cambiar de tema no recompila los shaders.

export type RoomTheme = "light" | "dark";

export type RoomPalette = {
  wallBack: string;
  wallSide: string;
  floor: string;
  windowFrame: string;
  sky: string;
  hemisphere: { sky: string; ground: string; intensity: number };
  sun: { color: string; intensity: number }; // direccional; 0 = apagada
  lamp: { intensity: number; emissive: number };
  vignette: string; // color de los bordes del viñeteado (CSS)
  stage: string; // fondo del escenario DOM tras el canvas
  hintBackground: string; // fondo de los textos HTML superpuestos
};

export const ROOM_PALETTE: Record<RoomTheme, RoomPalette> = {
  dark: {
    wallBack: "#0c0f0e",
    wallSide: "#101514",
    floor: "#0e2616",
    windowFrame: "#1b2421",
    sky: "#0a1330",
    hemisphere: { sky: "#34467a", ground: "#0a1410", intensity: 1.75 },
    sun: { color: "#ffffff", intensity: 0 },
    lamp: { intensity: 4, emissive: 0.6 },
    vignette: "rgba(0,0,0,0.7)",
    stage: "#070b16",
    hintBackground: "rgba(7,11,22,0.55)",
  },
  light: {
    wallBack: "#d9c9a6",
    wallSide: "#cdbd9a",
    floor: "#4d7a52",
    windowFrame: "#8a7656",
    sky: "#8fd0f4",
    hemisphere: { sky: "#fff0d2", ground: "#a88c6c", intensity: 2 },
    sun: { color: "#ffe0a0", intensity: 1.2 },
    lamp: { intensity: 1, emissive: 0.15 },
    vignette: "rgba(70,45,20,0.32)",
    stage: "#cdbd9a",
    hintBackground: "rgba(7,11,22,0.62)",
  },
};
