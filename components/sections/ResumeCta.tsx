"use client";

import { Download } from "lucide-react";
import { site } from "@/lib/site";
import { pub } from "@/lib/paths";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function ResumeCta() {
  return (
    <section id="resume" className="relative py-16 md:py-20">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-[linear-gradient(120deg,rgba(29,205,159,0.12),rgba(29,205,159,0.02))] px-8 py-12 text-center md:px-14 md:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Career Document
            </p>
            <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Want the complete profile?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Download my resume to explore my technical background, projects, education and
              achievements.
            </p>
            <Magnetic className="relative mt-8 inline-block">
              <a href={pub(site.resumeUrl)} download className="btn-primary">
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </a>
            </Magnetic>
            <p className="relative mt-4 font-mono text-[11px] text-muted/70">
              PDF · {site.role}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}