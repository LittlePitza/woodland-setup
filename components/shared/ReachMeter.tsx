"use client";

import { cn } from "@/lib/utils";

interface ReachMeterProps {
  current: number;
  recommended: number;
  className?: string;
  showLabels?: boolean;
}

export function ReachMeter({
  current,
  recommended,
  className,
  showLabels = true,
}: ReachMeterProps) {
  const max = Math.max(recommended * 1.4, current * 1.1, 30);
  const currentPercent = Math.min(100, (current / max) * 100);
  const recommendedPercent = Math.min(100, (recommended / max) * 100);
  const isBalanced = current >= recommended;

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between items-baseline mb-2 font-ui text-sm">
          <span className="text-ink-muted uppercase tracking-widest text-xs">
            Reach Total
          </span>
          <span
            className={cn(
              "font-display text-2xl font-semibold",
              isBalanced ? "text-moss" : "text-rust"
            )}
          >
            {current}
            <span className="text-ink-muted text-base mx-1">/</span>
            <span className="text-ink-muted text-base">{recommended}</span>
          </span>
        </div>
      )}
      <div className="relative h-3 bg-paper-dark/50 rounded-full overflow-hidden shadow-inset">
        {/* Recommended threshold marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-ink/40 z-10"
          style={{ left: `${recommendedPercent}%` }}
        >
          <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-ink/60" />
        </div>
        {/* Current bar */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            isBalanced
              ? "bg-gradient-to-r from-moss/80 to-moss"
              : "bg-gradient-to-r from-rust/70 to-rust"
          )}
          style={{ width: `${currentPercent}%` }}
        />
      </div>
      {showLabels && (
        <div className="mt-1.5 text-xs font-ui text-ink-muted">
          {isBalanced ? (
            <span className="text-moss">✓ Combinación balanceada</span>
          ) : (
            <span className="text-rust">
              ⚠ Por debajo del mínimo recomendado
            </span>
          )}
        </div>
      )}
    </div>
  );
}
