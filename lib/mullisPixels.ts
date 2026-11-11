// Píxeles de Mullis en una cuadrícula de 24×26, en orden de pintado.
// Los usan el SVG del escritorio retro y el canvas de la habitación 3D.
export const MULLIS_WIDTH = 24;
export const MULLIS_HEIGHT = 26;

export type MullisRect = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  group?: "tail" | "blink"; // partes animadas del SVG (cola y ojos)
};

export const MULLIS_PIXELS: readonly MullisRect[] = [
  { x: 20, y: 20, w: 3, h: 4, fill: "#efe6dc", group: "tail" },
  { x: 21, y: 16, w: 2, h: 5, fill: "#efe6dc", group: "tail" },
  { x: 22, y: 14, w: 1, h: 3, fill: "#8a8f9c", group: "tail" },
  { x: 3, y: 15, w: 18, h: 8, fill: "#8a8f9c" },
  { x: 6, y: 14, w: 12, h: 9, fill: "#f6f6f8" },
  { x: 5, y: 16, w: 14, h: 6, fill: "#f6f6f8" },
  { x: 8, y: 17, w: 1, h: 2, fill: "#dcdce2" },
  { x: 12, y: 16, w: 1, h: 3, fill: "#dcdce2" },
  { x: 15, y: 18, w: 1, h: 2, fill: "#dcdce2" },
  { x: 6, y: 22, w: 5, h: 3, fill: "#efe6dc" },
  { x: 13, y: 22, w: 5, h: 3, fill: "#efe6dc" },
  { x: 8, y: 24, w: 1, h: 1, fill: "#c9b9a8" },
  { x: 15, y: 24, w: 1, h: 1, fill: "#c9b9a8" },
  { x: 5, y: 1, w: 2, h: 1, fill: "#6b707c" },
  { x: 4, y: 2, w: 3, h: 1, fill: "#6b707c" },
  { x: 4, y: 3, w: 4, h: 2, fill: "#6b707c" },
  { x: 17, y: 1, w: 2, h: 1, fill: "#6b707c" },
  { x: 17, y: 2, w: 3, h: 1, fill: "#6b707c" },
  { x: 16, y: 3, w: 4, h: 2, fill: "#6b707c" },
  { x: 5, y: 3, w: 1, h: 1, fill: "#d9a7a0" },
  { x: 18, y: 3, w: 1, h: 1, fill: "#d9a7a0" },
  { x: 5, y: 4, w: 14, h: 1, fill: "#8a8f9c" },
  { x: 4, y: 5, w: 16, h: 8, fill: "#8a8f9c" },
  { x: 5, y: 13, w: 14, h: 1, fill: "#8a8f9c" },
  { x: 5, y: 11, w: 3, h: 2, fill: "#a3a8b3" },
  { x: 16, y: 11, w: 3, h: 2, fill: "#a3a8b3" },
  { x: 11, y: 5, w: 2, h: 4, fill: "#e8b98f" },
  { x: 9, y: 10, w: 6, h: 2, fill: "#efd9c2" },
  { x: 10, y: 12, w: 4, h: 1, fill: "#7b808c" },
  { x: 6, y: 7, w: 3, h: 3, fill: "#a6dcc0", group: "blink" },
  { x: 15, y: 7, w: 3, h: 3, fill: "#a6dcc0", group: "blink" },
  { x: 7, y: 7, w: 1, h: 3, fill: "#1a1a1a", group: "blink" },
  { x: 16, y: 7, w: 1, h: 3, fill: "#1a1a1a", group: "blink" },
  { x: 6, y: 7, w: 1, h: 1, fill: "#ffffff", group: "blink" },
  { x: 15, y: 7, w: 1, h: 1, fill: "#ffffff", group: "blink" },
  { x: 11, y: 9, w: 2, h: 1, fill: "#3a3a42" },
  { x: 10, y: 11, w: 1, h: 1, fill: "#a86f55" },
  { x: 13, y: 11, w: 1, h: 1, fill: "#a86f55" },
  { x: 0, y: 9, w: 4, h: 1, fill: "#ffffff" },
  { x: 1, y: 11, w: 3, h: 1, fill: "#ffffff" },
  { x: 20, y: 9, w: 4, h: 1, fill: "#ffffff" },
  { x: 20, y: 11, w: 3, h: 1, fill: "#ffffff" },
];
