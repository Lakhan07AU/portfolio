"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

/**
 * Soft 3D tilt + cursor spotlight for cards. Inert on touch devices and for
 * users who prefer reduced motion (no transform animation).
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.6 });
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  return (
    <motion.div
      ref={ref}
      data-tilt
      className={`relative ${className ?? ""}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: reduce ? 0 : srx,
        rotateY: reduce ? 0 : sry,
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        spotlightX.set(px * 100);
        spotlightY.set(py * 100);
        rx.set((0.5 - py) * max);
        ry.set((px - 0.5) * max);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at ${spotlightX}% ${spotlightY}%, rgba(29,205,159,0.12), transparent 65%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}