import { focusAreas } from "@/lib/data";

/** Marquee strip of AI focus areas between the hero and About. */
export function Ticker() {
  const sequence = [...focusAreas, ...focusAreas.map((f) => f.toUpperCase())];
  return (
    <div
      className="relative overflow-hidden border-y border-edge bg-panel/40 py-4"
      aria-label="Areas of focus"
    >
      <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap">
        {[...sequence, ...sequence].map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-8">
            <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-muted">
              {label}
            </span>
            <span className="text-accent/60" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}