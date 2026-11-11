import { Fragment } from "react";
import {
  MULLIS_HEIGHT,
  MULLIS_PIXELS,
  MULLIS_WIDTH,
  type MullisRect,
} from "@/lib/mullisPixels";

// Rects consecutivos de una misma parte; la cola y los ojos van en su <g>
// para que el CSS los anime (mullis-tail, mullis-blink).
type Part = { group?: MullisRect["group"]; items: [MullisRect, number][] };

const PARTS = MULLIS_PIXELS.reduce<Part[]>((parts, rect, index) => {
  const last = parts[parts.length - 1];
  if (last && last.group === rect.group) {
    last.items.push([rect, index]);
  } else {
    parts.push({ group: rect.group, items: [[rect, index]] });
  }
  return parts;
}, []);

export function MullisSprite({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${MULLIS_WIDTH} ${MULLIS_HEIGHT}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {PARTS.map((part) => {
        const rects = part.items.map(([rect, index]) => (
          <rect
            key={index}
            x={rect.x}
            y={rect.y}
            width={rect.w}
            height={rect.h}
            fill={rect.fill}
          />
        ));
        return part.group ? (
          <g key={part.items[0][1]} className={`mullis-${part.group}`}>
            {rects}
          </g>
        ) : (
          <Fragment key={part.items[0][1]}>{rects}</Fragment>
        );
      })}
    </svg>
  );
}
