"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { retro } from "@/data/retro";
import { useWindowManager } from "./WindowManager";

type Props = {
  id: string;
  title: string;
  zIndex: number;
  minimized: boolean;
  spawn: number;
  children: ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export default function Window({
  id,
  title,
  zIndex,
  minimized,
  spawn,
  children,
}: Props) {
  const { language } = usePreferences();
  const { focus, close, minimize } = useWindowManager();
  const titleId = useId();
  const windowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const [position, setPosition] = useState(() => ({
    x: 130 + (spawn % 6) * 32,
    y: 20 + (spawn % 6) * 32,
  }));

  // Al abrirse o restaurarse, el foco pasa a la ventana.
  useEffect(() => {
    if (!minimized) windowRef.current?.focus();
  }, [minimized]);

  function closeWindow() {
    close(id);
    // El foco vuelve al icono que la abrió.
    document.getElementById(`retro-icono-${id}`)?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeWindow();
    }
  }

  function onTitlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const parent = windowRef.current?.offsetParent;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    drag.current = {
      dx: event.clientX - rect.left - position.x,
      dy: event.clientY - rect.top - position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onTitlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    const el = windowRef.current;
    const parent = el?.offsetParent;
    if (!start || !el || !parent) return;
    const rect = parent.getBoundingClientRect();
    // Límite: la ventana no sale del escritorio.
    setPosition({
      x: clamp(
        event.clientX - rect.left - start.dx,
        0,
        parent.clientWidth - el.offsetWidth,
      ),
      y: clamp(
        event.clientY - rect.top - start.dy,
        0,
        parent.clientHeight - el.offsetHeight,
      ),
    });
  }

  function onTitlePointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      hidden={minimized}
      onKeyDown={onKeyDown}
      onPointerDownCapture={() => focus(id)}
      className="retro-raised absolute flex max-h-[calc(100%-1rem)] w-[30rem] max-w-[calc(100%-1rem)] flex-col p-1 outline-none"
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        display: minimized ? "none" : undefined,
      }}
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onPointerCancel={onTitlePointerUp}
        className="retro-titlebar flex cursor-move touch-none select-none items-center justify-between gap-2 px-2 py-0.5"
      >
        <h2
          id={titleId}
          className="truncate text-xl font-normal tracking-normal"
          style={{ fontFamily: "inherit", letterSpacing: "normal" }}
        >
          {title}
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => minimize(id)}
            aria-label={retro.minimize[language]}
            className="retro-button grid h-5 w-5 place-items-center leading-none"
          >
            <span aria-hidden="true">_</span>
          </button>
          <button
            type="button"
            onClick={closeWindow}
            aria-label={retro.close[language]}
            className="retro-button grid h-5 w-5 place-items-center leading-none"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
      <div className="retro-inset mt-1 min-h-0 flex-1 overflow-auto p-3">
        {children}
      </div>
    </div>
  );
}
