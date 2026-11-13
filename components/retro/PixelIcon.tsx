import { gridToPaths, type PixelGrid } from "@/lib/pixelGrid";

// Dibuja una cuadrícula de píxeles como SVG. El tamaño debe ser múltiplo de la
// cuadrícula (32 → 32 o 64 px) para que los píxeles no salgan irregulares.
export function PixelIcon({
  rows,
  className,
}: {
  rows: PixelGrid;
  className?: string;
}) {
  const size = rows.length;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${rows[0]?.length ?? size} ${size}`}
      shapeRendering="crispEdges"
      className={className}
    >
      {gridToPaths(rows).map(({ color, d }) => (
        <path key={color} d={d} fill={`var(${color})`} />
      ))}
    </svg>
  );
}
