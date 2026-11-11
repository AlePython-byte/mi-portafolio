"use client";

import dynamic from "next/dynamic";
import { VT323 } from "next/font/google";
import { useCallback, useEffect, useRef } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRetroMode } from "@/components/RetroModeProvider";
import { room } from "@/data/room";
import RoomErrorBoundary from "./RoomErrorBoundary";

// Misma fuente pixelada del escritorio retro.
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap" });

// Si el renderer no arranca en este tiempo, se pasa al escritorio.
const READY_TIMEOUT_MS = 5000;

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

// Escenario de la habitación: por ahora solo la capa DOM, sin Canvas.
export default function RoomStage() {
  const { language } = usePreferences();
  const { enterDesktop, powerOff } = useRetroMode();
  const usePcRef = useRef<HTMLButtonElement>(null);
  const readyRef = useRef(false);

  // Siempre la última versión de enterDesktop, sin reiniciar el temporizador.
  const failRef = useRef(enterDesktop);
  useEffect(() => {
    failRef.current = enterDesktop;
  });
  const fail = useCallback(() => failRef.current(), []);
  const markReady = useCallback(() => {
    readyRef.current = true;
  }, []);

  // Red de seguridad: si el canvas no arranca a tiempo, al escritorio.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!readyRef.current) fail();
    }, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [fail]);

  useEffect(() => {
    usePcRef.current?.focus();
  }, []);

  return (
    <div
      role="region"
      aria-label={room.sceneLabel[language]}
      className={`retro-root fixed inset-0 z-50 ${vt323.className}`}
      style={{ background: "#070b16" }}
    >
      <RoomErrorBoundary onFail={fail}>
        <RoomCanvas onReady={markReady} onContextLost={fail} />
      </RoomErrorBoundary>

      <div className="absolute right-4 top-4">
        <button type="button" onClick={powerOff} className={button}>
          {room.exit[language]}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
        <button
          ref={usePcRef}
          type="button"
          onClick={enterDesktop}
          aria-describedby="room-use-pc-hint"
          className={`${button} text-xl`}
        >
          {room.usePc[language]}
        </button>
        <p
          id="room-use-pc-hint"
          style={{ color: "#c8d0e0" }}
          className="text-lg"
        >
          {room.usePcHint[language]}
        </p>
        <button type="button" onClick={enterDesktop} className={button}>
          {room.skip[language]}
        </button>
      </div>
    </div>
  );
}
