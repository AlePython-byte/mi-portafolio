"use client";

import { useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Color, Object3D, type InstancedMesh } from "three";
import {
  MULLIS_HEIGHT,
  MULLIS_PIXELS,
  MULLIS_WIDTH,
} from "@/lib/mullisPixels";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Cola: ráfagas cortas, no un vaivén continuo (la escena debe quedar en reposo).
const BURST_MS = 1500; // duración de la ráfaga
const BURST_EVERY_MS = 4000; // cada cuánto arranca sola
const WAGS = 3; // oscilaciones por ráfaga
const MAX_ANGLE = 0.32; // radianes
const TAIL_PIVOT = { x: 20, y: 23 }; // raíz de la cola, en celdas

// Un cubo por rect. El cuerpo tiene 2 de profundidad y el resto 1. Los rects
// posteriores se adelantan un poco para que no parpadeen al solaparse.
const Z_STEP = 0.002;
const BODY_FROM_ROW = 14;

type Voxel = {
  cx: number; // centro, en celdas (y hacia abajo)
  cy: number;
  cz: number;
  w: number;
  h: number;
  d: number;
  tail: boolean;
  color: Color;
};

const VOXELS: readonly Voxel[] = MULLIS_PIXELS.map((rect, index) => {
  const d = !rect.group && rect.y >= BODY_FROM_ROW ? 2 : 1;
  return {
    cx: rect.x + rect.w / 2,
    cy: rect.y + rect.h / 2,
    cz: -1 + d / 2 + index * Z_STEP,
    w: rect.w,
    h: rect.h,
    d,
    tail: rect.group === "tail",
    color: new Color(rect.fill),
  };
});

// Brillo propio suave: el color de cada cubo también aporta luz, porque la
// lámpara le llega por detrás. Se inyecta en el shader de Lambert.
const SELF_GLOW = 0.5;
function addSelfGlow(shader: { fragmentShader: string }) {
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <emissivemap_fragment>",
    `#include <emissivemap_fragment>
  totalEmissiveRadiance += diffuseColor.rgb * ${SELF_GLOW.toFixed(2)};`,
  );
}

type Vec3 = readonly [number, number, number];

type MullisFigureProps = {
  position: Vec3; // en la superficie donde se apoya
  facing: Vec3; // punto al que mira (la cámara), solo en horizontal
  width?: number; // ancho en metros; el alto sale de la proporción 24:26
  interactive: boolean; // false mientras dura el zoom
  onActivate: () => void;
};

// Mullis en vóxeles sobre la mesa: un solo InstancedMesh (1 draw call).
export default function MullisFigure({
  position,
  facing,
  width = 0.3,
  interactive,
  onActivate,
}: MullisFigureProps) {
  const mesh = useRef<InstancedMesh>(null);
  const burstStart = useRef<number | null>(null);
  const invalidate = useThree((state) => state.invalidate);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && interactive);

  const cell = width / MULLIS_WIDTH;
  const yaw = Math.atan2(facing[0] - position[0], facing[2] - position[2]);

  // Coloca todas las instancias; la cola gira `angle` sobre su raíz.
  const place = useCallback(
    (angle: number) => {
      const target = mesh.current;
      if (!target) return;
      const dummy = new Object3D();
      const pivotX = (TAIL_PIVOT.x - MULLIS_WIDTH / 2) * cell;
      const pivotY = (MULLIS_HEIGHT - 1 - TAIL_PIVOT.y) * cell;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      VOXELS.forEach((voxel, i) => {
        // La fila inferior está vacía: el borde de la fila 25 queda en y = 0.
        let x = (voxel.cx - MULLIS_WIDTH / 2) * cell;
        let y = (MULLIS_HEIGHT - 1 - voxel.cy) * cell;
        dummy.rotation.set(0, 0, voxel.tail ? angle : 0);
        if (voxel.tail && angle !== 0) {
          const dx = x - pivotX;
          const dy = y - pivotY;
          x = pivotX + dx * cos - dy * sin;
          y = pivotY + dx * sin + dy * cos;
        }
        dummy.position.set(x, y, voxel.cz * cell);
        dummy.scale.set(voxel.w * cell, voxel.h * cell, voxel.d * cell);
        dummy.updateMatrix();
        target.setMatrixAt(i, dummy.matrix);
      });
      target.instanceMatrix.needsUpdate = true;
    },
    [cell],
  );

  useLayoutEffect(() => {
    const target = mesh.current;
    if (!target) return;
    VOXELS.forEach((voxel, i) => target.setColorAt(i, voxel.color));
    if (target.instanceColor) target.instanceColor.needsUpdate = true;
    place(0);
    invalidate();
  }, [place, invalidate]);

  const startBurst = useCallback(() => {
    if (burstStart.current !== null) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    burstStart.current = performance.now();
    invalidate();
  }, [invalidate]);

  // Ráfaga periódica; entre ráfagas no se pide ningún fotograma.
  useEffect(() => {
    const first = setTimeout(startBurst, 1000);
    const timer = setInterval(startBurst, BURST_EVERY_MS);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [startBurst]);

  useFrame((state) => {
    const start = burstStart.current;
    if (start === null) return;
    const t = (performance.now() - start) / BURST_MS;
    if (t >= 1) {
      burstStart.current = null;
      place(0); // la cola vuelve a su sitio y la escena se queda en reposo
      return;
    }
    const envelope = Math.sin(t * Math.PI);
    place(envelope * Math.sin(t * Math.PI * 2 * WAGS) * MAX_ANGLE);
    state.invalidate();
  });

  return (
    <group
      position={position as unknown as [number, number, number]}
      rotation={[0, yaw, 0]}
    >
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, VOXELS.length]}
        // La cola se mueve fuera de la esfera inicial: sin descarte por vista.
        frustumCulled={false}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          if (interactive) startBurst();
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          if (interactive) onActivate();
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial onBeforeCompile={addSelfGlow} />
      </instancedMesh>
    </group>
  );
}
