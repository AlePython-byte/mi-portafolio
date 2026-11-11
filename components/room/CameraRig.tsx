"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, Vector3, type PerspectiveCamera } from "three";
import {
  ROOM_CAMERA,
  SCREEN_NORMAL,
  SCREEN_POSITION,
  SCREEN_SIZE,
} from "./RoomModel";

export type CameraTarget = "room" | "screen";

const DURATION_MS = 1200;
const COVER = 0.98; // la pantalla desborda un 2 % el viewport

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Pose = { position: Vector3; look: Vector3 };

// Pose de la cámara para cada destino. En "screen" se sitúa sobre la normal de
// la pantalla, a la distancia justa para que cubra todo el viewport.
function poseFor(target: CameraTarget, fov: number, aspect: number): Pose {
  if (target === "room") {
    return {
      position: new Vector3(...ROOM_CAMERA.position),
      look: new Vector3(...ROOM_CAMERA.target),
    };
  }
  const tan = Math.tan(MathUtils.degToRad(fov) / 2);
  const [width, height] = SCREEN_SIZE;
  const distance =
    Math.min(height / 2 / tan, width / 2 / (tan * aspect)) * COVER;
  const look = new Vector3(...SCREEN_POSITION);
  const position = new Vector3(...SCREEN_NORMAL)
    .multiplyScalar(distance)
    .add(look);
  return { position, look };
}

type Animation = { from: Pose; start: number };

type CameraRigProps = {
  target: CameraTarget;
  onArrive?: () => void; // al llegar a "screen"
};

// Mueve la cámara entre la vista de la habitación y la pantalla del monitor.
export default function CameraRig({ target, onArrive }: CameraRigProps) {
  const invalidate = useThree((state) => state.invalidate);
  const wanted = useRef<CameraTarget>(target);
  // La cámara siempre nace en la vista de la habitación: si el destino inicial
  // ya es "screen" (clic antes de que cargue el canvas), también se anima.
  const handled = useRef<CameraTarget>("room");
  const arrive = useRef(onArrive);
  const animation = useRef<Animation | null>(null);
  const look = useRef(new Vector3(...ROOM_CAMERA.target));

  useEffect(() => {
    wanted.current = target;
    arrive.current = onArrive;
    invalidate(); // con frameloop="demand" hay que pedir el fotograma
  }, [target, onArrive, invalidate]);

  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    const want = wanted.current;
    const aspect = state.size.width / state.size.height;
    const to = poseFor(want, camera.fov, aspect);

    // Nuevo destino: la animación parte de donde esté la cámara ahora.
    if (handled.current !== want) {
      handled.current = want;
      animation.current = {
        from: { position: camera.position.clone(), look: look.current.clone() },
        start: performance.now(),
      };
    }

    const current = animation.current;
    if (current) {
      const progress = Math.min(1, (performance.now() - current.start) / DURATION_MS);
      const eased = easeInOutCubic(progress);
      camera.position.lerpVectors(current.from.position, to.position, eased);
      look.current.lerpVectors(current.from.look, to.look, eased);
      camera.lookAt(look.current);
      if (progress < 1) {
        state.invalidate();
      } else {
        animation.current = null;
        if (want === "screen") arrive.current?.();
      }
    } else if (want === "screen") {
      // Ya en la pantalla: si cambia el tamaño, sigue cubriendo el viewport.
      camera.position.copy(to.position);
      look.current.copy(to.look);
      camera.lookAt(look.current);
    }
  });

  return null;
}
