"use client";

import { useEffect, useMemo } from "react";
import { CanvasTexture, NearestFilter, SRGBColorSpace } from "three";
import {
  MULLIS_HEIGHT,
  MULLIS_PIXELS,
  MULLIS_WIDTH,
} from "@/lib/mullisPixels";

// Pinta los píxeles de Mullis una sola vez (con frameloop="demand" basta).
function createTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = MULLIS_WIDTH;
  canvas.height = MULLIS_HEIGHT;
  const context = canvas.getContext("2d");
  if (context) {
    for (const rect of MULLIS_PIXELS) {
      context.fillStyle = rect.fill;
      context.fillRect(rect.x, rect.y, rect.w, rect.h);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.magFilter = NearestFilter; // píxeles nítidos
  texture.minFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

type Vec3 = readonly [number, number, number];

type MullisFigureProps = {
  position: Vec3; // en la superficie donde se apoya
  facing: Vec3; // punto al que mira (la cámara), solo en horizontal
  width?: number; // ancho en metros; el alto sale de la proporción 24:26
};

// Mullis como sprite de píxeles sobre la mesa. Es decorativa: sin eventos ni
// texto accesible.
export default function MullisFigure({
  position,
  facing,
  width = 0.26,
}: MullisFigureProps) {
  const texture = useMemo(() => createTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const height = (width * MULLIS_HEIGHT) / MULLIS_WIDTH;
  const yaw = Math.atan2(facing[0] - position[0], facing[2] - position[2]);
  // La última fila del sprite está vacía: se baja para que las patas toquen la mesa.
  const lift = height / 2 - height / MULLIS_HEIGHT;

  return (
    <mesh
      position={[position[0], position[1] + lift, position[2]]}
      rotation={[0, yaw, 0]}
    >
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={texture}
        // Brillo propio suave: la luz de la lámpara le llega por detrás.
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={0.4}
        alphaTest={0.5}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
