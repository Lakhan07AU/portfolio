"use client";

import { BrainCircuit, Layers, Sparkles, Eye, Boxes, type LucideIcon } from "lucide-react";
import { expertise } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const icons: Record<string, LucideIcon> = {
  ml: BrainCircuit,
  dl: Layers,
  genai: Sparkles,
  cv: Eye,
  aien: Boxes,
};

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 md:py-32">
      {/* depth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container-site">
        <SectionHeading
          label="Technical Expertise"
          title={
            <>
              The toolkit behind <em className="not-italic text-accent">intelligent systems.</em>
            </>
          }
          sub="Machine Learning · Deep Learning · Generative AI · Computer Vision · AI Engineering"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((group, i) => {
            const Icon = icons[group.id];
            const wide = group.id === "aien" || group.id === "genai";
            return (
              <Reveal
                key={group.id}
                delay={i * 0.06}
                className={`md:col-span-2 lg:col-span-1 ${wide ? "lg:col-span-2" : ""}`}
              >
                <TiltCard className={`group h-full`}>
                  <article
                    className={`glass-panel relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/40 ${wide ? "lg:flex lg:items-start lg:gap-10" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-edge bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-4xl font-bold text-foreground/10">
                        {group.no}
                      </span>
                    </div>

                    <div className={wide ? "lg:flex-1" : ""}>
                      <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {group.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2" role="list">
                        {group.capabilities.map((cap) => (
                          <li key={cap}>
                            <span className="chip">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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