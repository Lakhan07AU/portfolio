"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Magnetic } from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/chrome/ThemeToggle";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently in view for navigation highlighting.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-4"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-site flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-edge bg-base/80 shadow-[var(--nav-shadow)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#home"
            className="font-display text-xl font-bold tracking-tight text-foreground"
            aria-label="Lakhan Singh — home"
          >
            LS<span className="text-accent">.</span>
          </a>
        </div>

        <ul className="hidden items-center gap-7 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`group relative text-[13px] font-medium transition-colors ${
                  active === link.href ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden lg:block">
            <a href="#projects" className="btn-subtle px-4! py-2! text-[13px]!">
              View Projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Magnetic>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-edge text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="container-site mt-2 rounded-2xl border border-edge bg-panel/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-edge pt-3">
                <a
                  href={site.resumeUrl}
                  download
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}