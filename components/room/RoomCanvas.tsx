"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";

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
};

// Escena 3D provisional: un cubo y una luz.
export default function RoomCanvas({ onReady, onContextLost }: RoomCanvasProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, powerPreference: "default" }}
        camera={{ fov: 45, position: [0, 0, 4] }}
        onCreated={onReady}
      >
        <ContextWatcher onLost={onContextLost} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <mesh rotation={[0.5, 0.6, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#7a8cff" />
        </mesh>
      </Canvas>
    </div>
  );
}
