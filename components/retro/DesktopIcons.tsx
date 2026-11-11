"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { retro } from "@/data/retro";
import type { RetroApp } from "@/data/types";
import {
  cellToPx,
  gridFor,
  nearestFree,
  parseSaved,
  pxToCell,
  resolveLayout,
  stepFree,
  cellKey,
  type Cell,
  type Direction,
  type Metrics,
  type Saved,
} from "@/lib/iconGrid";
import { useWindowManager } from "./WindowManager";

const STORAGE_KEY = "portfolio-retro-icons";

// El escritorio solo existe en el cliente (ssr: false), así que se puede leer aquí.
function loadSaved(): Saved {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseSaved(JSON.parse(raw)) : {};
  } catch {
    // Sin localStorage o con datos corruptos: posiciones por defecto.
    return {};
  }
}

function persist(positions: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // Sin localStorage la app funciona igual; solo no recuerda las posiciones.
  }
}

function FolderIcon({ kind }: { kind: RetroApp["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-10 w-10"
      shapeRendering="crispEdges"
    >
      {kind === "folder" ? (
        <>
          <path d="M2 7h11l3 3h14v17H2z" fill="#e8c34a" stroke="#000" />
          <path d="M3 13h26v13H3z" fill="#f6dc7a" />
        </>
      ) : (
        <>
          <path d="M7 3h14l5 5v21H7z" fill="#fff" stroke="#000" />
          <path d="M11 13h10M11 17h10M11 21h10" stroke="#000" />
        </>
      )}
    </svg>
  );
}

// Movimiento mínimo (px) para que un gesto cuente como arrastre y no como clic.
const DRAG_THRESHOLD = 5;

type Point = { x: number; y: number };

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  origin: Point;
  active: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

type IconProps = {
  app: RetroApp;
  helpId: string;
  // null = aún sin medir: el icono fluye en la columna original.
  position: Point | null;
  // Esquina máxima (px) dentro del escritorio, sin pasar bajo la barra de tareas.
  max: Point | null;
  onDrop: (id: string, x: number, y: number) => void;
  onStep: (id: string, direction: Direction) => void;
};

const ARROWS: Record<string, Direction> = {
  ArrowLeft: { dc: -1, dr: 0 },
  ArrowRight: { dc: 1, dr: 0 },
  ArrowUp: { dc: 0, dr: -1 },
  ArrowDown: { dc: 0, dr: 1 },
};

function DesktopIcon({
  app,
  helpId,
  position,
  max,
  onDrop,
  onStep,
}: IconProps) {
  const { language } = usePreferences();
  const { open } = useWindowManager();
  const [selected, setSelected] = useState(false);
  // Coordenadas en píxeles mientras se arrastra; null = en su celda.
  const [dragPoint, setDragPoint] = useState<Point | null>(null);
  const drag = useRef<Drag | null>(null);
  // Tras un arrastre el navegador emite un clic: se ignora.
  const suppressClick = useRef(false);

  function pointFor(event: PointerEvent<HTMLButtonElement>, d: Drag): Point {
    return {
      x: clamp(d.origin.x + event.clientX - d.startX, 0, max?.x ?? 0),
      y: clamp(d.origin.y + event.clientY - d.startY, 0, max?.y ?? 0),
    };
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary || !position || !max) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: position,
      active: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;
    if (!d.active) {
      const moved = Math.hypot(
        event.clientX - d.startX,
        event.clientY - d.startY,
      );
      if (moved < DRAG_THRESHOLD) return;
      d.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setSelected(true);
    }
    setDragPoint(pointFor(event, d));
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>, commit: boolean) {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;
    drag.current = null;
    if (!d.active) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (commit) {
      suppressClick.current = true;
      setTimeout(() => {
        suppressClick.current = false;
      }, 0);
      const point = pointFor(event, d);
      onDrop(app.id, point.x, point.y);
    }
    setDragPoint(null);
  }

  const dragging = dragPoint !== null;
  const shown = dragPoint ?? position;

  return (
    <li
      className={
        shown
          ? `absolute ${
              dragging
                ? "z-[4] opacity-80 drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
                : "transition-[left,top] duration-100 motion-reduce:transition-none"
            }`
          : undefined
      }
      style={shown ? { left: shown.x, top: shown.y } : undefined}
    >
      <button
        type="button"
        id={`retro-icono-${app.id}`}
        aria-describedby={helpId}
        onClick={(event) => {
          if (suppressClick.current) {
            suppressClick.current = false;
            return;
          }
          // El clic de ratón solo selecciona; Enter y Espacio (detail 0) abren.
          if (event.detail === 0) open(app.id);
          else setSelected(true);
        }}
        onDoubleClick={() => open(app.id)}
        onBlur={() => setSelected(false)}
        onKeyDown={(event) => {
          // Alternativa al arrastre: Ctrl + flechas mueve una celda.
          const direction = ARROWS[event.key];
          if (!direction || !event.ctrlKey) return;
          event.preventDefault();
          onStep(app.id, direction);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => endDrag(event, true)}
        onPointerCancel={(event) => endDrag(event, false)}
        className={`flex w-24 touch-none select-none flex-col items-center gap-1 p-1 text-center text-white ${
          dragging ? "cursor-grabbing" : ""
        }`}
      >
        <FolderIcon kind={app.icon} />
        <span
          className={`px-1 ${
            selected
              ? "bg-[var(--retro-select)] text-[var(--retro-select-text)]"
              : "[text-shadow:1px_1px_0_#000]"
          }`}
        >
          {app.label[language]}
        </span>
      </button>
    </li>
  );
}

export default function DesktopIcons() {
  const { language } = usePreferences();
  const helpId = useId();
  const areaRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [saved, setSaved] = useState<Saved>(loadSaved);

  const ids = useMemo(() => retro.apps.map((app) => app.id), []);
  const grid = useMemo(() => (metrics ? gridFor(metrics) : null), [metrics]);
  // Posiciones finales: las guardadas recortadas al tamaño actual del escritorio.
  const positions = useMemo(
    () => (grid ? resolveLayout(ids, saved, grid) : null),
    [ids, saved, grid],
  );

  // Mide el icono (la celda) y el escritorio; se repite si cambian de tamaño.
  useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    function measure() {
      if (!area) return;
      let cellW = 0;
      let cellH = 0;
      area.querySelectorAll("button").forEach((button) => {
        cellW = Math.max(cellW, button.offsetWidth);
        cellH = Math.max(cellH, button.offsetHeight);
      });
      const next = {
        cellW,
        cellH,
        width: area.clientWidth,
        height: area.clientHeight,
      };
      setMetrics((prev) =>
        prev &&
        prev.cellW === next.cellW &&
        prev.cellH === next.cellH &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next,
      );
    }
    // La medición inicial ocurre antes de pintar: no hay parpadeo.
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    return () => observer.disconnect();
  }, [language]);

  // Deja el icono en la celda libre más cercana a la deseada y lo recuerda.
  // (Lo usan el arrastre y el teclado.)
  const moveTo = useCallback(
    (id: string, wanted: Cell) => {
      if (!grid || !positions) return;
      const taken = new Set(
        Object.entries(positions)
          .filter(([otherId]) => otherId !== id)
          .map(([, cell]) => cellKey(cell)),
      );
      const target = taken.has(cellKey(wanted))
        ? nearestFree(wanted, taken, grid)
        : wanted;
      if (!target) return;
      const next = { ...positions, [id]: target };
      setSaved(next);
      persist(next);
    },
    [grid, positions],
  );

  // Al soltar: la celda más cercana a donde quedó el icono.
  function onDrop(id: string, x: number, y: number) {
    if (!metrics || !grid) return;
    moveTo(id, pxToCell(x, y, metrics, grid));
  }

  // Ctrl + flecha: la siguiente celda libre en esa dirección (salta las ocupadas).
  function onStep(id: string, direction: Direction) {
    if (!grid || !positions) return;
    const taken = new Set(
      Object.entries(positions)
        .filter(([otherId]) => otherId !== id)
        .map(([, cell]) => cellKey(cell)),
    );
    const target = stepFree(positions[id], direction, taken, grid);
    if (target) moveTo(id, target);
  }

  return (
    <div ref={areaRef} className="absolute inset-0">
      <p id={helpId} className="sr-only">
        {retro.iconMoveHelp[language]}
      </p>
      <ul
        aria-label={retro.iconsLabel[language]}
        className={
          metrics ? "m-0 p-0" : "absolute left-2 top-2 flex flex-col gap-2"
        }
      >
        {retro.apps.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            helpId={helpId}
            position={
              metrics && positions ? cellToPx(positions[app.id], metrics) : null
            }
            max={
              metrics
                ? {
                    x: metrics.width - metrics.cellW,
                    y: metrics.height - metrics.cellH,
                  }
                : null
            }
            onDrop={onDrop}
            onStep={onStep}
          />
        ))}
      </ul>
    </div>
  );
}
