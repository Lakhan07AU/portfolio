"use client";

import { Trophy, Users, Medal, type LucideIcon } from "lucide-react";
import { achievements } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const icons: Record<string, LucideIcon> = {
  leadership: Trophy,
  team: Users,
  rating: Medal,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-[26rem] w-[26rem] translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container-site">
        <SectionHeading
          label="Co-curricular · Achievements"
          title={
            <>
              Beyond the code —{" "}
              <em className="not-italic text-accent">leadership &amp; competition.</em>
            </>
          }
          sub="University chess leadership, team participation and competitive activity alongside the AI/ML work."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = icons[item.icon] ?? Medal;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <TiltCard className="group h-full">
                  <article className="glass-panel relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/40">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-edge bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-soft">{item.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}