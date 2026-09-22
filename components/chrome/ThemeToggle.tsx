"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const themeKey = "portfolio-theme";
const listeners = new Set<() => void>();

function readTheme(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("light");
}

let cached = readTheme();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): boolean {
  return cached;
}

function getServerSnapshot(): boolean {
  return false;
}

function setTheme(light: boolean) {
  cached = light;
  document.documentElement.classList.toggle("light", light);
  try {
    localStorage.setItem(themeKey, light ? "light" : "dark");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(!light)}
      aria-pressed={light}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-edge text-muted transition-colors hover:border-accent/50 hover:text-accent ${className}`}
    >
      {light ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}