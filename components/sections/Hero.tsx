"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, GraduationCap } from "lucide-react";
import { site } from "@/lib/site";
import { pub } from "@/lib/paths";
import { Magnetic } from "@/components/ui/Magnetic";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { HeroScene } from "@/components/three/HeroScene";

const expertiseRotating = ["Machine Learning", "Generative AI", "Computer Vision", "AI Engineering"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function TypewriterRole() {
  const reduce = useReducedMotion();
  const text = "AI/ML Developer";
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, [reduce, text.length]);

  return (
    <p className="flex items-center gap-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
      <span aria-label={text}>{reduce ? text : text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[1.25em] w-[2px] animate-pulse rounded bg-accent"
      />
    </p>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-fit">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative rounded-full bg-background/50 p-2 ring-1 ring-edge backdrop-blur-md">
        <div className="rounded-full p-1.5 ring-1 ring-accent/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pub(site.photoUrl)}
            alt={`Portrait of ${site.name}`}
            width={320}
            height={320}
            className="h-48 w-48 rounded-full object-cover sm:h-60 sm:w-60 lg:h-72 lg:w-72"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-lg ring-1 ring-edge backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to work
        </span>
      </div>
    </div>
  );
}

function RotatingExpertise() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % expertiseRotating.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={expertiseRotating[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="chip text-accent!"
          aria-live="polite"
        >
          {expertiseRotating[index]}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-muted">to products.</span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-svh overflow-hidden">
      {/* layered background */}
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-50 md:opacity-100">
          <HeroScene />
        </div>
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_40%,transparent_40%,var(--hero-vignette)_100%)]"
          aria-hidden="true"
        />
      </div>

      <div className="container-site relative flex min-h-svh flex-col justify-center pt-28 pb-24 md:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={item}
            className="section-label mb-6"
          >
            {"// Building Intelligent Systems"}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m
            <span className="mt-2 block text-gradient">Lakhan Singh</span>
          </motion.h1>

          <motion.div variants={item} className="mt-6">
            <TypewriterRole />
          </motion.div>

          <motion.div variants={item} className="mt-3">
            <RotatingExpertise />
          </motion.div>

          <motion.div
            variants={item}
            className="relative mt-5 inline-flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-2 overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-r from-accent/15 via-accent/[0.06] to-transparent py-2 pl-2 pr-5 neon-ring"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/40">
              <GraduationCap className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                BCA · Artificial Intelligence &amp; Machine Learning
              </span>
              <span className="text-base font-semibold text-foreground">
                Student at{" "}
                <span className="text-gradient">
                  {site.education.school}
                </span>
              </span>
            </span>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-foreground/15 to-transparent blur-[2px]"
              initial={{ left: "-15%" }}
              animate={{ left: "115%" }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            I build practical AI systems that turn machine learning, generative AI, and computer
            vision into real-world applications — from model to working product.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                Explore Projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={pub(site.resumeUrl)} download className="btn-subtle">
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </a>
            </Magnetic>
            <div className="flex items-center gap-1">
              <Magnetic>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon className="h-4 w-4" /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-edge pt-6"
          >
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-accent">
                Core Focus
              </p>
              <p className="mt-1 text-sm text-muted">Machine Learning</p>
            </div>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-accent">
                Applied AI
              </p>
              <p className="mt-1 text-sm text-muted">GenAI + Computer Vision</p>
            </div>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-accent">
                Based in
              </p>
              <p className="mt-1 text-sm text-muted">Bengaluru, India</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-first lg:order-none"
        >
          <Portrait />
        </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}