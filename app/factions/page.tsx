import Link from "next/link";
import { FACTIONS } from "@/lib/data/factions";
import { EXPANSIONS } from "@/lib/data/expansions";
import { FactionCard } from "@/components/factions/FactionCard";

export default function FactionsPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:py-10 max-w-3xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-ink hover:text-rust transition-colors"
        >
          <span className="text-bark mr-2">❦</span>
          Woodland Setup
        </Link>
        <Link
          href="/setup"
          className="font-ui text-sm text-rust hover:text-ember transition-colors"
        >
          Iniciar partida →
        </Link>
      </header>

      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted font-ui mb-2">
          Glosario
        </p>
        <h1 className="font-display text-4xl text-ink">
          Las 14 facciones del Bosque
        </h1>
        <p className="font-body text-ink-soft mt-3 max-w-xl mx-auto">
          Cada facción tiene un valor de <em>Reach</em> que indica su impacto
          en el tablero. Las facciones <strong>militantes</strong> ocupan
          espacio; las <strong>insurgentes</strong> juegan más sutil.
        </p>
      </div>

      {EXPANSIONS.map((exp) => {
        const factions = FACTIONS.filter((f) => f.expansion === exp.id);
        return (
          <section key={exp.id} className="mb-12">
            <div className="deco-divider mb-6">
              <span className="font-display italic text-ink-soft">
                {exp.nameES}{" "}
                <span className="text-ink-muted text-sm not-italic">
                  · {exp.year}
                </span>
              </span>
            </div>
            <div className="space-y-3">
              {factions.map((f, i) => (
                <FactionCard key={f.id} faction={f} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
