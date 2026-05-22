"use client";

import { useWizardStore } from "@/lib/store";
import { PlayerCountStep } from "@/components/setup/PlayerCountStep";
import { ExpansionsStep } from "@/components/setup/ExpansionsStep";
import { ModeStep } from "@/components/setup/ModeStep";
import { ResultsStep } from "@/components/setup/ResultsStep";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SetupPage() {
  const step = useWizardStore((s) => s.step);

  const steps = [
    <PlayerCountStep key="players" />,
    <ExpansionsStep key="expansions" />,
    <ModeStep key="mode" />,
    <ResultsStep key="results" />,
  ];

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10 max-w-2xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-ink hover:text-rust transition-colors"
        >
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </Link>
        <Link
          href="/history"
          className="font-ui text-sm text-ink-muted hover:text-ink transition-colors"
        >
          Historial
        </Link>
      </header>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8" aria-label="Progreso">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i <= step ? "bg-rust w-8" : "bg-ink/15 w-4"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
