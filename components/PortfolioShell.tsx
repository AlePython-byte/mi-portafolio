"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import type { RetroAssets } from "./retro/RetroAssets";
import { RetroModeProvider, useRetroMode } from "./RetroModeProvider";
import { ROOM_3D_ENABLED } from "@/lib/room3d";
import { useCanUse3D } from "@/lib/useCanUse3D";

// La capa retro solo existe en el cliente y se descarga bajo demanda.
const RetroDesktop = dynamic(() => import("./retro/RetroDesktop"), {
  ssr: false,
});

// La habitación solo existe en el cliente y nunca entra en el bundle del modo plano.
const RoomStage = dynamic(() => import("./room/RoomStage"), { ssr: false });

function Shell({
  assets,
  children,
}: {
  assets: RetroAssets;
  children: ReactNode;
}) {
  const { active, phase, enterDesktop } = useRetroMode();

  const reduceMotion = useReducedMotion();
  const canUse3D = useCanUse3D();
  const showRoom = ROOM_3D_ENABLED && canUse3D;

  // Sin soporte 3D no hay habitación: se pasa directo al escritorio.
  useEffect(() => {
    if (phase === "room" && !showRoom) enterDesktop();
  }, [phase, showRoom, enterDesktop]);

  // Mientras se está en la habitación, se precarga el escritorio retro.
  useEffect(() => {
    if (phase === "room" && showRoom) void import("./retro/RetroDesktop");
  }, [phase, showRoom]);

  // Con el escritorio encendido, el fondo no hace scroll.
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [active]);

  return (
    <>
      {/* El modo plano siempre se renderiza; tapado por el escritorio, queda inerte. */}
      <div className="contents" inert={active} aria-hidden={active || undefined}>
        {children}
      </div>
      {active && phase === "desktop" && <RetroDesktop assets={assets} />}
      {/* Al salir, el escritorio ya está montado debajo y la habitación se
          desvanece por encima (z mayor) antes de desmontarse. */}
      <AnimatePresence>
        {active && phase === "room" && showRoom && (
          <motion.div
            key="room"
            className="fixed inset-0 z-[60]"
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <RoomStage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PortfolioShell({
  assets,
  children,
}: {
  // Comprobado en el servidor; lo usan las ventanas del escritorio retro.
  assets: RetroAssets;
  children: ReactNode;
}) {
  return (
    <RetroModeProvider>
      <Shell assets={assets}>{children}</Shell>
    </RetroModeProvider>
  );
}
