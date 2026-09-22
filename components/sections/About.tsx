"use client";

import { GraduationCap, Target, Code2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/lib/site";
import { pub } from "@/lib/paths";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const profile = [
  {
    icon: GraduationCap,
    label: "Education",
    value: site.education.degree,
    detail: site.education.school,
  },
  { icon: Target, label: "Primary Focus", value: "Machine Learning & Artificial Intelligence" },
  { icon: Code2, label: "Programming", value: "Python, SQL, JavaScript" },
  {
    icon: Sparkles,
    label: "Current Interests",
    value: "Generative AI, Computer Vision, LLMs, RAG, AI Systems",
  },
];

const identityLabels = ["AI Engineer", "ML Engineer", "Generative AI Developer"];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          label="01 · About"
          title={
            <>
              Turning AI research into <em className="not-italic text-accent">working systems.</em>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
            <Reveal>
              <p>
                I&apos;m <strong className="font-semibold text-foreground">Lakhan Singh</strong>, a BCA
                student specializing in{" "}
                <strong className="font-semibold text-foreground">
                  Artificial Intelligence and Machine Learning
                </strong>{" "}
                at {site.education.school}. I enjoy transforming AI concepts into practical systems,
                combining machine learning, computer vision, generative AI, backend engineering and
                modern application development.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                My current focus is building{" "}
                <strong className="font-semibold text-foreground">
                  production-oriented AI applications
                </strong>{" "}
                involving machine learning pipelines, computer vision, large language models, RAG
                systems, multimodal AI and intelligent automation.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                <strong className="font-semibold text-foreground">Python</strong> is one of my strongest
                programming languages and the backbone of most of my work — from training and
                evaluating models to serving them through APIs and real-time systems.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="flex flex-wrap gap-2 pt-2">
              {identityLabels.map((label) => (
                <span key={label} className="chip">
                  {label}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="glass-panel neon-ring relative overflow-hidden rounded-3xl p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="mb-6 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full bg-accent/20 blur-xl"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pub(site.photoUrl)}
                    alt={`Portrait of ${site.name}`}
                    width={72}
                    height={72}
                    className="relative h-[72px] w-[72px] rounded-full border border-edge object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {site.name}
                  </h3>
                  <span className="mt-0.5 inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                    Recruiter-ready
                  </span>
                </div>
              </div>

              <dl className="space-y-5">
                {profile.map(({ icon: Icon, label, value, detail }) => (
                  <div
                    key={label}
                    className="flex gap-4 border-b border-edge pb-5 last:border-0 last:pb-0"
                  >
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-edge bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        {label}
                      </dt>
                      <dd className="mt-1 text-[15px] font-medium leading-snug text-foreground">
                        {value}
                      </dd>
                      {detail ? (
                        <dd className="mt-0.5 text-sm text-muted">{detail}</dd>
                      ) : null}
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex gap-3">
                <Magnetic>
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-subtle px-4! py-2! text-[13px]!"
                  >
                    <GitHubIcon className="h-4 w-4" aria-hidden="true" /> GitHub
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={site.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-subtle px-4! py-2! text-[13px]!"
                  >
                    <LinkedInIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}