"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { retro } from "@/data/retro";
import type { RetroApp } from "@/data/types";
import {
  cellToPx,
  gridFor,
  nearestFree,
  parseSaved,
  resolveLayout,
  cellKey,
  type Cell,
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

type IconProps = {
  app: RetroApp;
  helpId: string;
  // null = aún sin medir: el icono fluye en la columna original.
  position: { x: number; y: number } | null;
};

function DesktopIcon({ app, helpId, position }: IconProps) {
  const { language } = usePreferences();
  const { open } = useWindowManager();
  const [selected, setSelected] = useState(false);

  return (
    <li
      className={position ? "absolute" : undefined}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      <button
        type="button"
        id={`retro-icono-${app.id}`}
        aria-describedby={helpId}
        onClick={(event) => {
          // El clic de ratón solo selecciona; Enter y Espacio (detail 0) abren.
          if (event.detail === 0) open(app.id);
          else setSelected(true);
        }}
        onDoubleClick={() => open(app.id)}
        onBlur={() => setSelected(false)}
        className="flex w-24 flex-col items-center gap-1 p-1 text-center text-white"
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
  void moveTo;

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
          />
        ))}
      </ul>
    </div>
  );
}
