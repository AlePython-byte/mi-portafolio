"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
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

type RoomCanvasProps = {
  onReady: () => void; // el renderer se creó
  onContextLost: () => void;
  target: CameraTarget; // hacia dónde mira la cámara
  onArrive: () => void; // la cámara llegó a la pantalla
  onUsePc: () => void; // clic en el monitor
};

export default function RoomCanvas({
  onReady,
  onContextLost,
  target,
  onArrive,
  onUsePc,
}: RoomCanvasProps) {
  // El contexto de React no cruza el Canvas: el tema se lee aquí y baja por props.
  const { theme } = usePreferences();
  const screenColor =
    theme === "dark" ? ROOM_SCREEN_COLOR_DARK : ROOM_SCREEN_COLOR;

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, powerPreference: "default" }}
        camera={{ fov: ROOM_CAMERA.fov, position: [...ROOM_CAMERA.position] }}
        onCreated={({ camera }) => {
          camera.lookAt(...ROOM_CAMERA.target);
          onReady();
        }}
      >
        <ContextWatcher onLost={onContextLost} />
        <CameraRig target={target} onArrive={onArrive} />
        <RoomModel
          screenColor={screenColor}
          interactive={target === "room"}
          onActivate={onUsePc}
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
