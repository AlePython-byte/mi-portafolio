// Iconos en píxeles: cada icono es una cuadrícula de caracteres (una cadena por
// fila). "." es transparente y cualquier otra letra es una clave de la paleta.
export type PixelGrid = readonly string[];

// Clave del dibujo → variable CSS de la paleta (definidas en globals.css).
export const PIXEL_COLORS: Readonly<Record<string, string>> = {
  k: "--retro-px-ink",
  w: "--retro-px-white",
  l: "--retro-px-light",
  g: "--retro-px-gray",
  y: "--retro-px-yellow",
  n: "--retro-px-brown",
  m: "--retro-px-umber",
  r: "--retro-px-red",
  a: "--retro-px-green",
  b: "--retro-px-forest",
  c: "--retro-px-cyan",
  d: "--retro-px-blue",
  f: "--retro-px-purple",
  v: "--retro-px-violet",
  p: "--retro-px-skin",
};

export type PixelPath = { color: string; d: string };

const cache = new WeakMap<PixelGrid, PixelPath[]>();

// Une los píxeles contiguos de cada fila y agrupa todo por color: un <path>
// por color en lugar de un <rect> por píxel.
export function gridToPaths(rows: PixelGrid): PixelPath[] {
  const cached = cache.get(rows);
  if (cached) return cached;
  const byColor = new Map<string, string>();
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === key) end += 1;
      const color = PIXEL_COLORS[key];
      if (color) {
        const run = `M${x} ${y}h${end - x}v1h-${end - x}z`;
        byColor.set(color, (byColor.get(color) ?? "") + run);
      }
      x = end;
    }
  });
  const paths = [...byColor].map(([color, d]) => ({ color, d }));
  cache.set(rows, paths);
  return paths;
}
