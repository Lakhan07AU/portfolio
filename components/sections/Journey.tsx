"use client";

import { journey } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          label="Journey"
          title={
            <>
              Learning → <em className="not-italic text-accent">building → iterating.</em>
            </>
          }
          sub="A snapshot of how I am developing from student to AI/ML practitioner — grounded in what I have actually done so far."
        />

        <div className="relative mt-10">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[13px] top-2 w-px bg-gradient-to-b from-accent/60 via-line to-transparent lg:left-1/2"
          />

          <div className="space-y-10 lg:space-y-0">
            {journey.map((entry, i) => {
              const onLeft = i % 2 === 0;
              return (
                <div key={`${entry.period}-${entry.title}`} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
                  <Reveal
                    delay={0.05}
                    className={`relative pl-12 pb-2 lg:pb-12 lg:pl-0 ${
                      onLeft
                        ? "lg:col-start-1 lg:pr-2 lg:text-right"
                        : "lg:col-start-2 lg:pl-2"
                    }`}
                  >
                    {/* node on the rail */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[9px] top-2.5 grid h-3.5 w-3.5 place-items-center lg:left-1/2 lg:-translate-x-1/2"
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                      <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-base" />
                    </span>

                    <div
                      className={`glass-panel rounded-2xl p-6 transition-colors duration-300 hover:border-accent/40 ${
                        onLeft ? "lg:mr-8" : "lg:ml-8"
                      }`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                        {entry.period}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-muted">{entry.place}</p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                        {entry.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}