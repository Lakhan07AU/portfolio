"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
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

          <motion.p
            variants={item}
            className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
          >
            <span className="font-medium text-foreground/80">BCA Student</span>
            <span className="text-accent/70" aria-hidden="true">
              ·
            </span>
            <span>Artificial Intelligence &amp; Machine Learning</span>
            <span className="text-accent/70" aria-hidden="true">
              ·
            </span>
            <span>{site.education.school}</span>
          </motion.p>

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