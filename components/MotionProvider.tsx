"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// "user": si el sistema pide menos movimiento, motion no anima transformaciones.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
