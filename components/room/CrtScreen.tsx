"use client";

import { useEffect, useMemo } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  NearestFilter,
  SRGBColorSpace,
} from "three";

const TEX_W = 256;
const TEX_H = 192;
const FOLDERS = 7;
const BORDER = 4; // margen sin scanlines, para que los bordes conserven el fondo

// Dibuja el escritorio falso: fondo, carpetas en columna, barra de tareas y scanlines.
function drawDesktop(ctx: CanvasRenderingContext2D, background: string) {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Carpetas amarillas con pestaña, en una columna a la izquierda.
  const taskbarH = 14;
  const top = 12;
  const step = Math.floor((TEX_H - taskbarH - top - 6) / FOLDERS);
  for (let i = 0; i < FOLDERS; i++) {
    const x = 14;
    const y = top + i * step;
    ctx.fillStyle = "#b8921f";
    ctx.fillRect(x, y, 8, 3); // pestaña
    ctx.fillStyle = "#f2d04a";
    ctx.fillRect(x, y + 2, 20, step - 8);
    ctx.fillStyle = "#c9a22a";
    ctx.fillRect(x, y + step - 7, 20, 1); // sombra inferior
  }

  // Barra de tareas gris con botón de inicio.
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(0, TEX_H - taskbarH, TEX_W, taskbarH);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, TEX_H - taskbarH, TEX_W, 1);
  ctx.fillStyle = "#808080";
  ctx.fillRect(4, TEX_H - taskbarH + 3, 28, 8);
  ctx.fillStyle = "#dcdcdc";
  ctx.fillRect(5, TEX_H - taskbarH + 4, 26, 6);
  ctx.fillStyle = "#808080";
  ctx.fillRect(TEX_W - 36, TEX_H - taskbarH + 3, 32, 8); // reloj

  // Scanlines sutiles, una de cada dos filas, sin tocar el borde.
  ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
  for (let y = BORDER; y < TEX_H - BORDER; y += 2) {
    ctx.fillRect(BORDER, y, TEX_W - BORDER * 2, 1);
  }
}

type CrtScreenProps = {
  size: readonly [number, number];
  position: readonly [number, number, number]; // dentro del grupo del monitor
  screenColor: string; // fondo del escritorio real según el tema
  lit: boolean; // cursor encima
};

export default function CrtScreen({
  size,
  position,
  screenColor,
  lit,
}: CrtScreenProps) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = TEX_W;
    canvas.height = TEX_H;
    const ctx = canvas.getContext("2d");
    if (ctx) drawDesktop(ctx, screenColor);
    const tex = new CanvasTexture(canvas);
    tex.colorSpace = SRGBColorSpace;
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }, [screenColor]);

  // Libera la textura al cambiar de tema o desmontar.
  useEffect(() => () => texture.dispose(), [texture]);

  const glowColor = useMemo(
    () => new Color(screenColor).lerp(new Color("#ffffff"), 0.35),
    [screenColor],
  );

  const [w, h] = size;
  const [x, y, z] = position;

  return (
    <>
      {/* Brillo aditivo, un poco mayor: queda detrás de la pantalla y solo asoma por el borde */}
      <mesh position={[x, y, z - 0.0005]}>
        <planeGeometry args={[w * 1.12, h * 1.12]} />
        <meshBasicMaterial
          color={glowColor}
          blending={AdditiveBlending}
          transparent
          opacity={0.22}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* Sin tone mapping para que el color coincida con el escritorio retro */}
      <mesh position={[x, y, z]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Con el cursor encima, la pantalla se aclara un poco */}
      {lit && (
        <mesh position={[x, y, z + 0.0005]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.18}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </>
  );
}
