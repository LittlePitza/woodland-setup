"use client";

import { cn } from "@/lib/utils";
import type { Faction } from "@/types";
import { motion } from "framer-motion";

interface FactionCardProps {
  faction: Faction;
  variant?: "full" | "compact" | "selectable";
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export function FactionCard({
  faction,
  variant = "full",
  selected = false,
  onClick,
  index = 0,
}: FactionCardProps) {
  const isCompact = variant === "compact";
  const isSelectable = variant === "selectable";
  const Tag = isSelectable ? "button" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <Tag
        onClick={onClick}
        className={cn(
          "relative w-full text-left bg-paper-light",
          "border-2 border-ink/15 rounded-lg overflow-hidden",
          "shadow-card transition-all duration-300",
          isSelectable && "cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5",
          selected && "ring-2 ring-rust ring-offset-2 ring-offset-paper border-rust"
        )}
      >
        {/* Faction color stripe at top */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: faction.color }}
          aria-hidden
        />

        <div className={cn("p-4 sm:p-5", isCompact && "p-3 sm:p-4")}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-2xl leading-none"
                  style={{ color: faction.color }}
                  aria-hidden
                >
                  {faction.symbol}
                </span>
                <h3
                  className={cn(
                    "font-display font-semibold text-ink leading-tight",
                    isCompact ? "text-lg" : "text-xl sm:text-2xl"
                  )}
                >
                  {faction.nameES}
                </h3>
              </div>
              <p className="font-ui text-xs uppercase tracking-widest text-ink-muted">
                {faction.animalES} · {faction.type === "militant" ? "Militante" : "Insurgente"}
              </p>
            </div>

            {/* Reach badge */}
            <div
              className={cn(
                "shrink-0 flex flex-col items-center justify-center",
                "w-14 h-14 rounded-full border-2",
                "font-display font-bold"
              )}
              style={{
                borderColor: faction.color,
                color: faction.color,
              }}
            >
              <span className="text-xl leading-none">{faction.reach}</span>
              <span className="text-[9px] uppercase tracking-wider opacity-70 mt-0.5">
                Reach
              </span>
            </div>
          </div>

          {!isCompact && (
            <>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed font-body">
                {faction.descriptionES}
              </p>

              <div className="mt-3 flex items-center gap-3 text-xs font-ui">
                <span className="flex items-center gap-1 text-ink-muted">
                  <span className="opacity-60">Dificultad:</span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          i < faction.difficulty
                            ? "bg-bark"
                            : "bg-ink/15"
                        )}
                      />
                    ))}
                  </span>
                </span>
                <span className="text-ink-muted">·</span>
                <span className="text-ink-muted truncate">
                  {faction.scoringMethodES}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Corner ornament */}
        {!isCompact && (
          <div className="absolute top-3 right-3 opacity-10 text-3xl font-display pointer-events-none">
            ✦
          </div>
        )}
      </Tag>
    </motion.div>
  );
}
