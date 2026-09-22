"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { BrainCircuit, Code2, Layers, Trophy, type LucideIcon } from "lucide-react";
import { projects, hackathons, expertise } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

type StatItem = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  sub: string;
};

const stats: StatItem[] = [
  {
    icon: BrainCircuit,
    value: projects.length,
    label: "AI Projects Built",
    sub: "forensics · health · civic tech",
  },
  {
    icon: Trophy,
    value: hackathons.length,
    label: "Hackathon Shipped",
    sub: "iQOO 2026 · HealthSphere",
  },
  {
    icon: Layers,
    value: expertise.length,
    label: "Core AI Domains",
    sub: "ML · GenAI · CV · Engineering",
  },
  {
    icon: Code2,
    value: 1700,
    suffix: "+",
    label: "Chess.com Rating",
    sub: "past milestone",
  },
];

const gridBorders = [
  "",
  "max-sm:border-t sm:border-l",
  "max-sm:border-t sm:border-t lg:border-t-0 lg:border-l",
  "max-sm:border-t sm:border-l",
];

function Counter({
  value,
  suffix = "",
  duration = 1600,
  label,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <>
      <span
        ref={ref}
        aria-hidden="true"
        className="font-display text-4xl font-bold tabular-nums text-gradient sm:text-5xl"
      >
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix} {label}
      </span>
    </>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative py-10 md:py-12">
      <div className="container-site">
        <Reveal delay={0.05}>
          <div className="glass-panel neon-ring relative overflow-hidden rounded-3xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal
                    key={stat.label}
                    delay={i * 0.08}
                    className={`flex items-center gap-5 px-7 py-8 border-line lg:px-9 ${gridBorders[i]}`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-edge bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
                      <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                      <p className="font-mono text-[11px] text-muted">{stat.sub}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}