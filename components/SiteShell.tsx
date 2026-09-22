"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { LoadingScreen } from "@/components/chrome/LoadingScreen";
import { CursorGlow } from "@/components/chrome/CursorGlow";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";

/**
 * Wraps the page in a reduced-motion-aware motion context and mounts the
 * fixed UI chrome (loader, cursor, scroll progress, film grain).
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      {children}
    </MotionConfig>
  );
}