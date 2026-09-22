"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/** Accessible premium case-study dialog for a project. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus management, scroll lock, Escape to close.
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          ref={overlayRef}
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative z-10 max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-panel shadow-[var(--modal-shadow)]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-edge bg-panel/95 px-6 py-4 backdrop-blur-xl sm:px-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {project.label}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-9 px-6 py-8 sm:px-8">
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>

              <section>
                <h4 className="section-label">Problem</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
                  {project.problem}
                </p>
              </section>

              <section>
                <h4 className="section-label">Approach</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
                  {project.approach}
                </p>
              </section>

              <section>
                <h4 className="section-label">Architecture</h4>
                <div className="mt-5 rounded-2xl border border-line bg-panel-2/60 p-5">
                  <div className="mx-auto max-w-xs">
                    <ArchitectureFlow steps={project.architecture} />
                  </div>
                </div>
              </section>

              <section>
                <h4 className="section-label">Technologies</h4>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="chip">{tech}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="section-label">Key Features</h4>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2" role="list">
                  {project.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {cap}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="section-label">What I Built</h4>
                <ul className="mt-4 space-y-2.5" role="list">
                  {project.whatBuilt.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                    >
                      <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex flex-wrap items-center gap-3 border-t border-edge pt-6">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5! py-2.5! text-sm!"
                >
                  View GitHub <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-subtle px-5! py-2.5! text-sm!"
                  >
                    {project.links.demoLabel ?? "View Live"}{" "}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto text-sm text-muted transition-colors hover:text-accent"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}