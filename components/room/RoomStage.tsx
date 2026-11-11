"use client";

import dynamic from "next/dynamic";
import { VT323 } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRetroMode } from "@/components/RetroModeProvider";
import { room } from "@/data/room";
import type { CameraTarget } from "./CameraRig";
import RoomErrorBoundary from "./RoomErrorBoundary";

// Misma fuente pixelada del escritorio retro.
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

// Si el renderer no arranca en este tiempo, se pasa al escritorio.
const READY_TIMEOUT_MS = 5000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function CanvasLoading() {
  const { language } = usePreferences();
  return (
    <p
      role="status"
      style={{ color: "#c8d0e0" }}
      className="absolute inset-x-0 top-1/2 text-center text-xl"
    >
      {room.loading[language]}
    </p>
  );
}

// three solo se descarga aquí, bajo demanda.
const RoomCanvas = dynamic(() => import("./RoomCanvas"), {
  ssr: false,
  loading: () => <CanvasLoading />,
});

const button = "retro-button px-4 py-1";

// Escenario de la habitación: capa DOM sobre el canvas 3D.
export default function RoomStage() {
  const { language } = usePreferences();
  const { phase, enterDesktop, powerOff } = useRetroMode();
  const [target, setTarget] = useState<CameraTarget>("room");
  const targetRef = useRef<CameraTarget>("room");
  const doneRef = useRef(false); // ya se decidió salir: nada más debe actuar
  const readyRef = useRef(false);
  const usePcRef = useRef<HTMLButtonElement>(null);

  // Siempre las últimas acciones, sin reiniciar temporizadores ni listeners.
  const actions = useRef({ enterDesktop, powerOff });
  useEffect(() => {
    actions.current = { enterDesktop, powerOff };
  });

  // Única salida al escritorio, aunque lleguen varias señales a la vez
  // (llegada del zoom, fallo del canvas, botón...).
  const goDesktop = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    actions.current.enterDesktop();
  }, []);

  const leave = useCallback(() => {
    doneRef.current = true; // un zoom en curso ya no debe abrir el escritorio
    actions.current.powerOff();
  }, []);

  const changeTarget = useCallback((next: CameraTarget) => {
    targetRef.current = next;
    setTarget(next);
  }, []);

  // Acerca la cámara al monitor. Con movimiento reducido no se anima.
  const zoomIn = useCallback(() => {
    if (doneRef.current || targetRef.current === "screen") return;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      goDesktop();
      return;
    }
    changeTarget("screen");
  }, [changeTarget, goDesktop]);

  const markReady = useCallback(() => {
    readyRef.current = true;
  }, []);

  // Red de seguridad: si el canvas no arranca a tiempo, al escritorio.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!readyRef.current) goDesktop();
    }, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [goDesktop]);

  // Escape durante el zoom vuelve a la habitación. Solo existe mientras el
  // escenario está montado y no deja pasar la tecla a nada más.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (doneRef.current || targetRef.current !== "screen") return;
      event.stopPropagation();
      changeTarget("room");
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [changeTarget]);

  useEffect(() => {
    usePcRef.current?.focus();
  }, []);

  const zooming = target === "screen";

  return (
    <div
      role="region"
      aria-label={room.sceneLabel[language]}
      // Durante el desvanecimiento, el escritorio ya es el dueño del foco.
      inert={phase !== "room"}
      className={`retro-root fixed inset-0 z-50 ${vt323.className}`}
      style={{ background: "#070b16" }}
    >
      <RoomErrorBoundary onFail={goDesktop}>
        <RoomCanvas
          onReady={markReady}
          onContextLost={goDesktop}
          target={target}
          onArrive={goDesktop}
          onUsePc={zoomIn}
        />
      </RoomErrorBoundary>

      <div className="absolute right-4 top-4">
        <button type="button" onClick={leave} className={button}>
          {room.exit[language]}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
        <button
          ref={usePcRef}
          type="button"
          onClick={zoomIn}
          // aria-disabled (y no disabled) para no perder el foco durante el zoom.
          aria-disabled={zooming || undefined}
          aria-describedby="room-use-pc-hint"
          className={`${button} text-xl ${zooming ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {room.usePc[language]}
        </button>
        <p
          id="room-use-pc-hint"
          style={{ color: "#c8d0e0" }}
          className="text-lg"
        >
          {zooming ? room.zoomOutHint[language] : room.usePcHint[language]}
        </p>
        <button type="button" onClick={goDesktop} className={button}>
          {room.skip[language]}
        </button>
      </div>
    </div>
  );
}
