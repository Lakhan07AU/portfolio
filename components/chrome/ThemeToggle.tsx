"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const themeKey = "portfolio-theme";

function applyTheme(light: boolean) {
  document.documentElement.classList.toggle("light", light);
}

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("light");
    applyTheme(next);
    setLight(next);
    try {
      localStorage.setItem(themeKey, next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-edge text-muted transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      {mounted && light ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}