"use client";

import { motion, useReducedMotion } from "framer-motion";

type ArchitectureFlowProps = {
  steps: string[];
  compact?: boolean;
};

/**
 * Vertical system-architecture diagram. In the focused modal version the flow
 * lines animate as steps come into view; the compact variant stays static.
 */
export function ArchitectureFlow({ steps, compact = false }: ArchitectureFlowProps) {
  const reduce = useReducedMotion();
  const animate = !compact && !reduce;

  return (
    <div className="flex flex-col">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={step} className="flex items-stretch">
            {/* rail */}
            <div className="flex w-6 flex-col items-center">
              <motion.span
                className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-accent"
                initial={animate ? { scale: 0 } : false}
                whileInView={animate ? { scale: 1 } : undefined}
                viewport={animate ? { once: true } : undefined}
                transition={{ delay: i * 0.16, type: "spring", stiffness: 300, damping: 20 }}
              />
              {!last && (
                <motion.span
                  className="w-px flex-1 bg-gradient-to-b from-accent/60 to-accent/15"
                  initial={animate ? { scaleY: 0 } : false}
                  whileInView={animate ? { scaleY: 1 } : undefined}
                  viewport={animate ? { once: true } : undefined}
                  transition={{ delay: i * 0.16 + 0.1, duration: 0.3 }}
                  style={{ transformOrigin: "top" }}
                />
              )}
            </div>
            {/* label */}
            <motion.span
              className={`mb-2 flex items-center rounded-lg border border-line bg-panel px-3 font-medium ${
                compact
                  ? "h-8 text-[11px] leading-none text-foreground/85"
                  : "h-10 text-[13px] text-foreground"
              }`}
              initial={animate ? { opacity: 0, x: -8 } : false}
              whileInView={animate ? { opacity: 1, x: 0 } : undefined}
              viewport={animate ? { once: true } : undefined}
              transition={{ delay: i * 0.16, duration: 0.35 }}
            >
              {step}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}