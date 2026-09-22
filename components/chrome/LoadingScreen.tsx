"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Short, professional loading sequence: LS → Lakhan Singh → reveal. */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"ls" | "name">("ls");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setPhase("name"), 520);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 980);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              {phase === "ls" ? (
                <motion.p
                  key="ls"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-6xl font-bold tracking-tight text-foreground md:text-7xl"
                >
                  LS
                  <span className="text-accent">.</span>
                </motion.p>
              ) : (
                <motion.p
                  key="name"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-xl font-medium text-muted md:text-2xl"
                >
                  Lakhan Singh
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-8 h-px w-44 overflow-hidden bg-accent/20">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}