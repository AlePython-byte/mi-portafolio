// Lógica pura de la cuadrícula de iconos del escritorio retro.

export type Cell = { col: number; row: number };
export type Saved = Record<string, Cell>;
export type Direction = { dc: number; dr: number };

// Medidas en píxeles: tamaño de una celda (el del icono) y del escritorio.
export type Metrics = {
  cellW: number;
  cellH: number;
  width: number;
  height: number;
};

export type Grid = { cols: number; rows: number };

// Mismos valores que el diseño original (left-2 top-2 gap-2).
export const ICON_ORIGIN = 8;
export const ICON_GAP = 8;

export function gridFor(m: Metrics): Grid {
  return {
    cols: Math.max(
      1,
      Math.floor((m.width - ICON_ORIGIN - m.cellW) / (m.cellW + ICON_GAP)) + 1,
    ),
    rows: Math.max(
      1,
      Math.floor((m.height - ICON_ORIGIN - m.cellH) / (m.cellH + ICON_GAP)) + 1,
    ),
  };
}

export function cellToPx(cell: Cell, m: Metrics) {
  return {
    x: ICON_ORIGIN + cell.col * (m.cellW + ICON_GAP),
    y: ICON_ORIGIN + cell.row * (m.cellH + ICON_GAP),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function clampCell(cell: Cell, grid: Grid): Cell {
  return {
    col: clamp(cell.col, 0, grid.cols - 1),
    row: clamp(cell.row, 0, grid.rows - 1),
  };
}

// Celda más cercana a unas coordenadas en píxeles (esquina del icono).
export function pxToCell(x: number, y: number, m: Metrics, grid: Grid): Cell {
  return clampCell(
    {
      col: Math.round((x - ICON_ORIGIN) / (m.cellW + ICON_GAP)),
      row: Math.round((y - ICON_ORIGIN) / (m.cellH + ICON_GAP)),
    },
    grid,
  );
}

export function cellKey(cell: Cell) {
  return `${cell.col},${cell.row}`;
}

// Celda libre más próxima al objetivo; null si el escritorio está lleno.
export function nearestFree(
  target: Cell,
  taken: ReadonlySet<string>,
  grid: Grid,
): Cell | null {
  let best: Cell | null = null;
  let bestDistance = Infinity;
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const cell = { col, row };
      if (taken.has(cellKey(cell))) continue;
      const distance = (col - target.col) ** 2 + (row - target.row) ** 2;
      if (distance < bestDistance) {
        best = cell;
        bestDistance = distance;
      }
    }
  }
  return best;
}

// Siguiente celda libre en una dirección (salta las ocupadas); null si no hay.
export function stepFree(
  from: Cell,
  direction: Direction,
  taken: ReadonlySet<string>,
  grid: Grid,
): Cell | null {
  let col = from.col + direction.dc;
  let row = from.row + direction.dr;
  while (col >= 0 && col < grid.cols && row >= 0 && row < grid.rows) {
    if (!taken.has(cellKey({ col, row }))) return { col, row };
    col += direction.dc;
    row += direction.dr;
  }
  return null;
}

// Posición final de cada icono: las guardadas (recortadas al escritorio) y,
// para el resto, la columna original de arriba abajo. Sin solapamientos.
export function resolveLayout(ids: string[], saved: Saved, grid: Grid): Saved {
  const taken = new Set<string>();
  const result: Saved = {};

  function place(id: string, wanted: Cell) {
    const cell = taken.has(cellKey(wanted))
      ? (nearestFree(wanted, taken, grid) ?? wanted)
      : wanted;
    taken.add(cellKey(cell));
    result[id] = cell;
  }

  for (const id of ids) {
    if (saved[id]) place(id, clampCell(saved[id], grid));
  }
  ids.forEach((id, index) => {
    if (result[id]) return;
    place(
      id,
      clampCell(
        { col: Math.floor(index / grid.rows), row: index % grid.rows },
        grid,
      ),
    );
  });
  return result;
}

// Valida lo leído de localStorage: ignora cualquier dato mal formado.
export function parseSaved(raw: unknown): Saved {
  const result: Saved = {};
  if (typeof raw !== "object" || raw === null) return result;
  for (const [id, value] of Object.entries(raw)) {
    if (typeof value !== "object" || value === null) continue;
    const { col, row } = value as Record<string, unknown>;
    if (
      Number.isInteger(col) &&
      Number.isInteger(row) &&
      (col as number) >= 0 &&
      (row as number) >= 0
    ) {
      result[id] = { col: col as number, row: row as number };
    }
  }
  return result;
}
