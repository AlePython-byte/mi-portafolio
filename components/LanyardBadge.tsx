"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Props = {
  src: string;
  alt: string;
  label: string; // nombre accesible del grupo que se puede mover
  hint: string; // cómo moverla (arrastre o flechas)
  missingLabel: string; // se muestra si la imagen no carga
  variant?: "neu" | "retro";
};

// El escenario tiene un ancho fijo para que las coordenadas del cordón (SVG)
// coincidan con los píxeles del desplazamiento de la escarapela.
const STAGE_WIDTH = 320;
const CENTER = STAGE_WIDTH / 2;
const RING_Y = 86; // donde cuelga el cordón: la argolla del clip
const MAX_X = 56; // desplazamiento máximo en píxeles
const KEY_STEP = 16;
const KEY_RETURN_DELAY = 450;

const springBack = { type: "spring", stiffness: 240, damping: 15, mass: 0.9 } as const;
const springKey = { type: "spring", stiffness: 420, damping: 28 } as const;

// Las hebras salen fijas de la barra superior y terminan en la argolla,
// que sigue a la escarapela.
function cordPath(startX: number, endX: number): string {
  return `M${startX} 3 C${startX} 52 ${endX} 40 ${endX} ${RING_Y}`;
}

const variants = {
  neu: {
    cord: "var(--accent-strong)",
    stitch: "var(--accent-ink)",
    sleeve:
      "w-60 rounded-2xl border-2 border-line-strong bg-foreground/[0.04] shadow-neu",
    slot: "rounded-pill bg-foreground/25 shadow-neu-inset",
    window: "rounded-lg",
  },
  retro: {
    cord: "var(--retro-title)",
    stitch: "var(--retro-title-text)",
    sleeve: "retro-raised w-40",
    slot: "retro-inset",
    window: "",
  },
} as const;

export default function LanyardBadge({
  src,
  alt,
  label,
  hint,
  missingLabel,
  variant = "neu",
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const staticMode = shouldReduceMotion === true;
  const [failed, setFailed] = useState(false);
  const ids = useId().replace(/:/g, "");
  const hintId = `${ids}-hint`;
  const metalId = `${ids}-metal`;
  const style = variants[variant];

  const x = useMotionValue(0);
  const leftCord = useTransform(x, (v) => cordPath(96, CENTER + v));
  const rightCord = useTransform(x, (v) => cordPath(224, CENTER + v));

  const playback = useRef<ReturnType<typeof animate> | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopMotion() {
    playback.current?.stop();
    if (returnTimer.current) clearTimeout(returnTimer.current);
  }

  // Vuelve suavemente al centro con un resorte.
  function release(velocity = 0) {
    if (returnTimer.current) clearTimeout(returnTimer.current);
    playback.current?.stop();
    playback.current = animate(x, 0, { ...springBack, velocity });
  }

  useEffect(() => {
    return () => {
      playback.current?.stop();
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (staticMode) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    // Evita que la ventana retro o el diálogo interpreten las flechas.
    event.preventDefault();
    event.stopPropagation();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    const next = Math.max(-MAX_X, Math.min(MAX_X, x.get() + direction * KEY_STEP));
    stopMotion();
    playback.current = animate(x, next, springKey);
    // Al dejar de pulsar, regresa al centro.
    returnTimer.current = setTimeout(() => release(), KEY_RETURN_DELAY);
  }

  return (
    <div className="flex flex-col items-center overflow-x-clip pb-1">
      {/* El cordón se dibuja detrás; la escarapela, delante. */}
      <div className="relative w-80 shrink-0 pt-[72px]">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${STAGE_WIDTH} 100`}
          className="pointer-events-none absolute left-0 top-0 h-[100px] w-80 overflow-visible"
        >
          <defs>
            <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#eef1f3" />
              <stop offset="0.45" stopColor="#9aa3a8" />
              <stop offset="0.7" stopColor="#d5dade" />
              <stop offset="1" stopColor="#7d878d" />
            </linearGradient>
          </defs>
          {[leftCord, rightCord].map((d, index) => (
            <g key={index} fill="none">
              <motion.path
                d={d}
                strokeWidth="9"
                style={{ stroke: style.cord }}
              />
              <motion.path
                d={d}
                strokeWidth="1.5"
                strokeDasharray="3 6"
                strokeOpacity="0.6"
                style={{ stroke: style.stitch }}
              />
            </g>
          ))}
          <rect
            x="84"
            y="0"
            width="152"
            height="7"
            rx="3.5"
            fill={`url(#${metalId})`}
            stroke="#6b747a"
            strokeWidth="0.75"
          />
        </svg>

        <motion.div
          role="group"
          aria-label={label}
          aria-describedby={staticMode ? undefined : hintId}
          aria-keyshortcuts={staticMode ? undefined : "ArrowLeft ArrowRight"}
          tabIndex={staticMode ? undefined : 0}
          drag={staticMode ? false : "x"}
          dragConstraints={{ left: -MAX_X, right: MAX_X }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={stopMotion}
          onDragEnd={(_, info) => release(info.velocity.x)}
          onKeyDown={handleKeyDown}
          onBlur={() => !staticMode && release()}
          // pan-y: el arrastre horizontal no bloquea el scroll vertical.
          style={{ x, touchAction: "pan-y" }}
          className={`relative z-10 mx-auto flex w-fit select-none flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent ${
            staticMode ? "" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          {/* Clip metálico con argolla: el cordón termina en el centro de ella. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="relative z-10 h-16 w-16"
          >
            <ellipse
              cx="32"
              cy="14"
              rx="9"
              ry="10"
              fill="none"
              stroke={`url(#${metalId})`}
              strokeWidth="4"
            />
            <rect x="28" y="22" width="8" height="12" fill={`url(#${metalId})`} />
            <rect
              x="14"
              y="30"
              width="36"
              height="26"
              rx="6"
              fill={`url(#${metalId})`}
              stroke="#6b747a"
              strokeWidth="1"
            />
            <rect x="22" y="40" width="20" height="6" rx="3" fill="#2a2f31" opacity="0.55" />
            <path d="M18 34h28" stroke="#fff" strokeOpacity="0.7" strokeLinecap="round" />
          </svg>

          {/* Funda transparente con la escarapela dentro, completamente recta. */}
          <div className={`relative -mt-5 px-3 pb-3 pt-5 ${style.sleeve}`}>
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-1 block h-2.5 w-14 -translate-x-1/2 ${style.slot}`}
            />
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden bg-background ${style.window}`}
            >
              {failed ? (
                <p className="grid h-full place-items-center p-4 text-center text-sm text-muted">
                  {missingLabel}
                </p>
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="15rem"
                  draggable={false}
                  onError={() => setFailed(true)}
                  className="object-contain"
                />
              )}
            </div>
            {/* Reflejo del plástico. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.14)_100%)]"
            />
          </div>
        </motion.div>
      </div>

      {!staticMode && (
        <p id={hintId} className="mt-5 max-w-xs text-center text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
