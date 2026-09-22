"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { ProjectModal } from "@/components/projects/ProjectModal";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const artSteps = project.architecture.slice(0, 6);
  const hasMoreSteps = project.architecture.length > artSteps.length;

  return (
    <TiltCard className="group h-full">
      <article
        className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-accent/40 md:flex-row"
      >
        {/* art / architecture panel */}
        <div className="relative shrink-0 overflow-hidden bg-[linear-gradient(160deg,rgba(29,205,159,0.08),transparent_55%),var(--project-art)] p-6 md:w-72 md:shrink-0 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent/80">
              Architecture
            </span>
            <span className="font-display text-3xl font-bold text-foreground/10">{project.index}</span>
          </div>
          <div className="mt-5 max-h-[300px] overflow-hidden">
            <ArchitectureFlow steps={artSteps} compact />
            {hasMoreSteps && (
              <p className="mt-1 pl-6 font-mono text-[11px] text-muted">+ {project.architecture.length - artSteps.length} more…</p>
            )}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(29,205,159,0.1),transparent_60%)]"
          />
        </div>

        {/* content */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            {project.label}
          </p>
          <h3
            className="mt-2 cursor-pointer font-display text-2xl font-semibold text-foreground transition-colors hover:text-accent-soft"
            onClick={() => onOpen(project)}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" role="list">
            {project.technologies.slice(0, 6).map((tech) => (
              <li key={tech}>
                <span className="chip text-[11px]!">{tech}</span>
              </li>
            ))}
            {project.technologies.length > 6 && (
              <li>
                <span className="chip text-[11px]!">+{project.technologies.length - 6}</span>
              </li>
            )}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-edge pt-5">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="btn-subtle px-4! py-2! text-[13px]!"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Open Case Study
            </button>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-[13px]!"
            >
              GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
className="btn-ghost text-[13px]!"
            >
                {project.links.demoLabel ?? "View Live"}{" "}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          label="Project Showcase"
          title={
            <>
              Selected projects —{" "}
              <em className="not-italic text-accent">AI solving real problems.</em>
            </>
          }
          sub="Click any project to open its full case study: problem, approach, architecture, technologies and what I built."
        />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} onOpen={setActiveProject} />
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-sm text-muted">
            More repositories and build logs live on my GitHub profile.
          </p>
        </Reveal>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}