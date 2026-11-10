"use client";

import { MotionConfig } from "motion/react";

/** reducedMotion="user": todas las animaciones de Motion respetan prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
