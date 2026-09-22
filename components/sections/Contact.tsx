"use client";

import { Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />
      <div className="container-site relative">
        <SectionHeading
          align="center"
          label="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <em className="not-italic text-accent">intelligent.</em>
            </>
          }
          sub="Interested in AI, machine learning, computer vision or Generative AI? Let's connect."
        />

        <Reveal delay={0.08}>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.location} — open to internships, AI/ML collaborations and hackathons.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-subtle"
                >
                  <GitHubIcon className="h-4 w-4" aria-hidden="true" /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-subtle"
                >
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${site.email}`} className="btn-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email me
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}