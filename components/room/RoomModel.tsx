"use client";

import { RoundedBox, useCursor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  Object3D,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from "three";
import { ROOM_PALETTE, type RoomPalette, type RoomTheme } from "@/data/roomPalette";
import CrtScreen from "./CrtScreen";
import MullisFigure from "./MullisFigure";

// ---------- Medidas compartidas (metros; Y hacia arriba) ----------

// Cámara fija: mira el escritorio en 3/4 desde la derecha.
export const ROOM_CAMERA = {
  fov: 45,
  position: [2.2, 1.7, 1.5] as const,
  target: [0.0, 0.95, -1.55] as const,
};

const DESK_TOP = 0.75; // altura de la superficie de la mesa
const MONITOR_POSITION = [0.15, DESK_TOP, -1.5] as const;
const MONITOR_YAW = 0.3; // giro hacia la cámara
const SCREEN_LOCAL = [0, 0.38, 0.092] as const; // dentro del grupo del monitor

// Plano de pantalla en coordenadas del mundo: el paso siguiente lo usa para
// colocar el escritorio retro encima.
export const SCREEN_SIZE = [0.48, 0.36] as const; // ancho, alto (4:3)
export const SCREEN_NORMAL = [
  Math.sin(MONITOR_YAW),
  0,
  Math.cos(MONITOR_YAW),
] as const;
export const SCREEN_POSITION = [
  MONITOR_POSITION[0] + SCREEN_LOCAL[2] * Math.sin(MONITOR_YAW),
  MONITOR_POSITION[1] + SCREEN_LOCAL[1],
  MONITOR_POSITION[2] + SCREEN_LOCAL[2] * Math.cos(MONITOR_YAW),
] as const;

// ---------- Colores planos ----------

const C = {
  rugOuter: "#93493a",
  rugInner: "#7a3829",
  moon: "#f1ecd2",
  sun: "#ffd447",
  sunRay: "#ffe58a",
  wood: "#6b4a2f",
  woodDark: "#55391f",
  beige: "#cfc6a8",
  bezel: "#2a2c2b",
  keyboard: "#4a4a4a",
  keys: "#6e6e6e",
  mouse: "#9a9ea3",
  lamp: "#2b2b2b",
  lampLight: "#ffcf8a",
};

type Vec3 = readonly [number, number, number];

function Flat({ color }: { color: string }) {
  return <meshStandardMaterial color={color} flatShading roughness={0.9} />;
}

function Box({
  size,
  position,
  color,
}: {
  size: Vec3;
  position: Vec3;
  color: string;
}) {
  return (
    <mesh position={position as [number, number, number]}>
      <boxGeometry args={size as [number, number, number]} />
      <Flat color={color} />
    </mesh>
  );
}

// ---------- Piezas ----------

function Shell({ palette }: { palette: RoomPalette }) {
  return (
    <>
      {/* Suelo y alfombra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.8]}>
        <planeGeometry args={[6, 6]} />
        <Flat color={palette.floor} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.005, -0.7]}>
        <planeGeometry args={[2.8, 2.2]} />
        <Flat color={C.rugOuter} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.008, -0.7]}>
        <planeGeometry args={[2.5, 1.9]} />
        <Flat color={C.rugInner} />
      </mesh>
      {/* Sombra falsa bajo la mesa */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.012, -1.6]}>
        <planeGeometry args={[2.2, 1.1]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      {/* Paredes: fondo e izquierda */}
      <mesh position={[0, 1.5, -2.2]}>
        <planeGeometry args={[6, 3]} />
        <Flat color={palette.wallBack} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-3, 1.5, 0.8]}>
        <planeGeometry args={[6, 3]} />
        <Flat color={palette.wallSide} />
      </mesh>
    </>
  );
}

const SUN_RAYS = 10;

// Sol procedural: esfera emisiva y diez rayos en un solo InstancedMesh.
function Sun() {
  const rays = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = rays.current;
    if (!mesh) return;
    const dummy = new Object3D();
    for (let i = 0; i < SUN_RAYS; i++) {
      const angle = (i / SUN_RAYS) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * 0.19, Math.sin(angle) * 0.19, 0);
      dummy.rotation.set(0, 0, angle);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0.3, 0.2, 0.012]}>
      <mesh>
        <sphereGeometry args={[0.1, 14, 10]} />
        <meshStandardMaterial
          color="#000000"
          emissive={C.sun}
          emissiveIntensity={1}
        />
      </mesh>
      <instancedMesh ref={rays} args={[undefined, undefined, SUN_RAYS]}>
        <boxGeometry args={[0.09, 0.022, 0.01]} />
        <meshBasicMaterial color={C.sunRay} />
      </instancedMesh>
    </group>
  );
}

// Haz de sol: un plano aditivo desde la ventana hasta el suelo y su mancha de luz.
const BEAM_FROM = new Vector3(-1.4, 1.75, -2.17);
const BEAM_TO = new Vector3(-0.5, 0.02, -0.6);
const BEAM_DIR = BEAM_TO.clone().sub(BEAM_FROM);
const BEAM_LENGTH = BEAM_DIR.length();
const BEAM_MID = BEAM_FROM.clone().add(BEAM_TO).multiplyScalar(0.5);
const BEAM_ROTATION = new Quaternion().setFromUnitVectors(
  new Vector3(0, 1, 0),
  BEAM_DIR.clone().normalize(),
);

function SunBeam() {
  return (
    <>
      <mesh
        position={BEAM_MID.toArray()}
        quaternion={BEAM_ROTATION}
        renderOrder={1}
      >
        <planeGeometry args={[0.8, BEAM_LENGTH]} />
        <meshBasicMaterial
          color="#fff0c0"
          transparent
          opacity={0.1}
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[BEAM_TO.x, 0.014, BEAM_TO.z]}
        renderOrder={1}
      >
        <planeGeometry args={[0.9, 0.9]} />
        <meshBasicMaterial
          color="#fff0c0"
          transparent
          opacity={0.16}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function Window({
  palette,
  theme,
}: {
  palette: RoomPalette;
  theme: RoomTheme;
}) {
  const frame = palette.windowFrame;
  return (
    <group position={[-1.4, 1.75, -2.19]}>
      {/* Noche y luna, un poco por delante de la pared */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[1.28, 0.98]} />
        <meshBasicMaterial color={palette.sky} />
      </mesh>
      {theme === "dark" ? (
        <mesh position={[0.3, 0.2, 0.01]}>
          <circleGeometry args={[0.13, 24]} />
          <meshStandardMaterial
            color="#000000"
            emissive={C.moon}
            emissiveIntensity={1}
          />
        </mesh>
      ) : (
        <Sun />
      )}
      {/* Marco y travesaños */}
      <Box size={[1.4, 0.06, 0.06]} position={[0, 0.52, 0.02]} color={frame} />
      <Box size={[1.4, 0.06, 0.06]} position={[0, -0.52, 0.02]} color={frame} />
      <Box size={[0.06, 1.1, 0.06]} position={[-0.67, 0, 0.02]} color={frame} />
      <Box size={[0.06, 1.1, 0.06]} position={[0.67, 0, 0.02]} color={frame} />
      <Box size={[0.04, 1.0, 0.04]} position={[0, 0, 0.02]} color={frame} />
      <Box size={[1.3, 0.04, 0.04]} position={[0, 0, 0.02]} color={frame} />
    </group>
  );
}

function Desk() {
  const legSize = [0.07, DESK_TOP - 0.06, 0.07] as const;
  const legY = legSize[1] / 2;
  return (
    <group position={[0.1, 0, -1.6]}>
      <Box
        size={[2, 0.06, 0.9]}
        position={[0, DESK_TOP - 0.03, 0]}
        color={C.wood}
      />
      <Box size={legSize} position={[-0.93, legY, -0.4]} color={C.woodDark} />
      <Box size={legSize} position={[0.93, legY, -0.4]} color={C.woodDark} />
      <Box size={legSize} position={[-0.93, legY, 0.4]} color={C.woodDark} />
      <Box size={legSize} position={[0.93, legY, 0.4]} color={C.woodDark} />
    </group>
  );
}

type MonitorProps = {
  screenColor: string;
  interactive: boolean; // false mientras dura el zoom
  onActivate: () => void;
};

function Monitor({ screenColor, interactive, onActivate }: MonitorProps) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered && interactive;
  useCursor(lit);

  return (
    <group
      position={MONITOR_POSITION as unknown as [number, number, number]}
      rotation={[0, MONITOR_YAW, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        if (interactive) onActivate();
      }}
    >
      {/* Base y cuello */}
      <Box size={[0.34, 0.03, 0.3]} position={[0, 0.015, -0.05]} color={C.beige} />
      <Box size={[0.14, 0.06, 0.14]} position={[0, 0.06, -0.05]} color={C.beige} />
      {/* Carcasa frontal y caja trasera, más profunda */}
      <RoundedBox
        args={[0.7, 0.58, 0.14]}
        radius={0.025}
        smoothness={2}
        position={[0, 0.38, 0]}
      >
        <Flat color={C.beige} />
      </RoundedBox>
      <Box size={[0.5, 0.42, 0.4]} position={[0, 0.38, -0.27]} color={C.beige} />
      {/* Bisel oscuro y pantalla */}
      <Box
        size={[0.6, 0.48, 0.02]}
        position={[0, SCREEN_LOCAL[1], 0.08]}
        color={C.bezel}
      />
      <CrtScreen
        size={SCREEN_SIZE}
        position={SCREEN_LOCAL}
        screenColor={screenColor}
        lit={lit}
      />
    </group>
  );
}

const KEY_ROWS = 4;
const KEY_COLS = 13;

function Keyboard() {
  const keys = useRef<InstancedMesh>(null);

  // Todas las teclas en un solo InstancedMesh.
  useLayoutEffect(() => {
    const mesh = keys.current;
    if (!mesh) return;
    const dummy = new Object3D();
    let i = 0;
    for (let row = 0; row < KEY_ROWS; row++) {
      for (let col = 0; col < KEY_COLS; col++) {
        dummy.position.set(
          (col - (KEY_COLS - 1) / 2) * 0.034,
          0,
          (row - (KEY_ROWS - 1) / 2) * 0.034,
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i++, dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0.1, DESK_TOP, -1.3]} rotation={[0, 0.12, 0]}>
      <Box size={[0.48, 0.02, 0.17]} position={[0, 0.01, 0]} color={C.keyboard} />
      <instancedMesh
        ref={keys}
        args={[undefined, undefined, KEY_ROWS * KEY_COLS]}
        position={[0, 0.026, 0]}
      >
        <boxGeometry args={[0.026, 0.012, 0.026]} />
        <Flat color={C.keys} />
      </instancedMesh>
    </group>
  );
}

function Mouse() {
  return (
    <RoundedBox
      args={[0.06, 0.028, 0.1]}
      radius={0.012}
      smoothness={2}
      position={[0.5, DESK_TOP + 0.014, -1.3]}
      rotation={[0, -0.2, 0]}
    >
      <Flat color={C.mouse} />
    </RoundedBox>
  );
}

function Lamp({ palette }: { palette: RoomPalette }) {
  return (
    <group position={[-0.7, DESK_TOP, -1.75]}>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.03, 12]} />
        <Flat color={C.lamp} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
        <Flat color={C.lamp} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.035, 0.13, 0.14, 12]} />
        <meshStandardMaterial
          color={C.lamp}
          emissive={C.lampLight}
          emissiveIntensity={palette.lamp.emissive}
          flatShading
        />
      </mesh>
      {/* Única luz puntual de la escena: cálida, sin sombras */}
      <pointLight
        position={[0, 0.38, 0.05]}
        color={C.lampLight}
        intensity={palette.lamp.intensity}
        decay={2}
      />
    </group>
  );
}

// En desarrollo, anota una vez el coste de dibujo (llamadas y triángulos).
function DevStats() {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    invalidate();
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const { calls, triangles, lines, points } = gl.info.render;
        console.log(
          `[room] gl.info.render calls=${calls} triangles=${triangles} lines=${lines} points=${points}`,
        );
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [gl, invalidate]);

  return null;
}

export default function RoomModel({
  theme,
  screenColor,
  interactive,
  onActivate,
  onMullis,
}: MonitorProps & { onMullis: () => void; theme: RoomTheme }) {
  const palette = ROOM_PALETTE[theme];

  // Con frameloop="demand" un cambio de tema debe pedir su propio fotograma.
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate();
  }, [theme, invalidate]);

  return (
    <>
      <hemisphereLight
        args={[
          palette.hemisphere.sky,
          palette.hemisphere.ground,
          palette.hemisphere.intensity,
        ]}
      />
      {/* Sol por la ventana: sin sombras; apagado (0) en el tema oscuro */}
      <directionalLight
        position={[-1.4, 2.6, -2.6]}
        color={palette.sun.color}
        intensity={palette.sun.intensity}
      />      <Shell palette={palette} />
      <Window palette={palette} theme={theme} />
      {theme === "light" && <SunBeam />}
      <Desk />
      <Monitor
        screenColor={screenColor}
        interactive={interactive}
        onActivate={onActivate}
      />
      <Keyboard />
      <Mouse />
      <Lamp palette={palette} />
      <MullisFigure
        position={[-0.32, DESK_TOP, -1.38]}
        facing={ROOM_CAMERA.position}
        width={0.3}
        interactive={interactive}
        onActivate={onMullis}
      />
      <DevStats />
    </>
  );
}
