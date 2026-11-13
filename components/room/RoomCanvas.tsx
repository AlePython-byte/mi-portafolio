"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import { ROOM_SCREEN_COLOR, ROOM_SCREEN_COLOR_DARK } from "@/lib/room3d";
import CameraRig, { type CameraTarget } from "./CameraRig";
import RoomModel, { ROOM_CAMERA } from "./RoomModel";

// Avisa si el navegador pierde el contexto WebGL; el listener se quita al desmontar.
function ContextWatcher({ onLost }: { onLost: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, onLost]);

  return null;
}

// Duración del zoom de CameraRig (1200 ms) más un pequeño margen.
const ANIMATION_WINDOW_MS = 1300;

// Con frameloop="demand" solo hay fotogramas seguidos mientras la cámara se
// anima. Fuera de esa ventana el monitor se desmonta (y pierde su muestra
// parcial), para que los huecos del reposo no se lean como FPS bajos.
function useAnimationWindow(target: CameraTarget): boolean {
  const [measuring, setMeasuring] = useState(false);
  const previous = useRef<CameraTarget>("room"); // la cámara siempre nace en "room"

  useEffect(() => {
    if (target === previous.current) return;
    previous.current = target;
    setMeasuring(true);
    const timer = setTimeout(() => setMeasuring(false), ANIMATION_WINDOW_MS);
    return () => clearTimeout(timer);
  }, [target]);

  return measuring;
}

type RoomCanvasProps = {
  onReady: () => void; // el renderer se creó
  onContextLost: () => void;
  target: CameraTarget; // hacia dónde mira la cámara
  onArrive: () => void; // la cámara llegó a la pantalla
  onUsePc: () => void; // clic en el monitor
  onMullis: () => void; // clic en Mullis
  onFail: () => void; // el equipo es demasiado lento: al escritorio
};

export default function RoomCanvas({
  onReady,
  onContextLost,
  target,
  onArrive,
  onUsePc,
  onMullis,
  onFail,
}: RoomCanvasProps) {
  // El contexto de React no cruza el Canvas: el tema se lee aquí y baja por props.
  const { theme } = usePreferences();
  const screenColor =
    theme === "dark" ? ROOM_SCREEN_COLOR_DARK : ROOM_SCREEN_COLOR;

  const measuring = useAnimationWindow(target);
  const [lowDpr, setLowDpr] = useState(false);
  const declines = useRef(0);

  // Primer descenso de FPS: se baja la resolución; el segundo, al escritorio.
  const handleDecline = () => {
    declines.current += 1;
    if (declines.current === 1) setLowDpr(true);
    else onFail();
  };

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={lowDpr ? 1 : [1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, powerPreference: "default" }}
        camera={{ fov: ROOM_CAMERA.fov, position: [...ROOM_CAMERA.position] }}
        onCreated={({ camera }) => {
          camera.lookAt(...ROOM_CAMERA.target);
          onReady();
        }}
      >
        <ContextWatcher onLost={onContextLost} />
        {measuring && (
          <PerformanceMonitor
            iterations={4}
            ms={150}
            flipflops={2}
            onDecline={handleDecline}
            onFallback={onFail}
          />
        )}
        <CameraRig target={target} onArrive={onArrive} />
        <RoomModel
          screenColor={screenColor}
          interactive={target === "room"}
          onActivate={onUsePc}
          onMullis={onMullis}
        />
      </Canvas>
      {/* Viñeta nocturna hacia los bordes; se disipa con el zoom para que la
          pantalla llegue con su color exacto. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
          opacity: target === "screen" ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
        }}
      />
    </div>
  );
}
