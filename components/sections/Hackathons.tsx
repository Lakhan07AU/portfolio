"use client";

import { Rocket, ArrowUpRight, Zap } from "lucide-react";
import { hackathons } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hackathons() {
  const [event] = hackathons;

  return (
    <section id="hackathons" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          label="Hackathons · Innovation"
          title={
            <>
              Shipping under <em className="not-italic text-accent">deadlines.</em>
            </>
          }
          sub="Product-building experience where the AI component had to work in a live demo."
        />

        <Reveal delay={0.05}>
          <TiltCard className="group">
            <article className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                      {event.name} · {event.year}
                    </span>
                    <span className="chip">{event.project}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
                    {event.project} — built for the {event.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                    {event.description}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-panel-2/50 p-5">
                      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                        <Zap className="h-3.5 w-3.5" aria-hidden="true" /> AI Component
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {event.aiComponent}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-panel-2/50 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                        Takeaway
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {event.takeaways}
                      </p>
                    </div>
                  </div>

                  <Magnetic className="mt-8 inline-block">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-subtle"
                    >
                      Explore on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </article>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}