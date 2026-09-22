"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { NeuralNetwork } from "@/components/three/NeuralNetwork";

/**
 * Mounts the 3D hero canvas. Lowers fidelity on mobile / low-power devices and
 * freezes animation for users who prefer reduced motion.
 */
export function HeroScene() {
  const [quality] = useState<"high" | "low">(() => {
    if (typeof window === "undefined") return "high";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 820;
    return coarse || small ? "low" : "high";
  });
  const hasMotion = !useReducedMotion();

  const low = quality === "low";

  return (
    <Canvas
      dpr={[1, low ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      frameloop={hasMotion ? "always" : "demand"}
      gl={{
        antialias: !low,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    >
      <NeuralNetwork quality={quality} animated={hasMotion} />
    </Canvas>
  );
}