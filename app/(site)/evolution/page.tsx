import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Evolution — Autonomous Systems Lab",
  description: "Timeline of systems, experiments, and milestones.",
}

const milestones = [
  { year: "2022", label: "first code" },
  { year: "2023", label: "first system" },
  { year: "2024", label: "first lab" },
  { year: "2025", label: "now" },
] as const

export default function EvolutionPage(): React.ReactElement {
  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-24">
        <p className="font-mono text-sm text-signal">[04] EVOLUTION</p>

        <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
          Evolution.
        </h1>

        <p className="mt-6 max-w-2xl text-text-secondary">
          A timeline of systems built, experiments run, and lessons learned.
        </p>

        <div className="mt-16 overflow-x-auto">
          <div className="flex min-w-max items-start gap-8 pb-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-start gap-8">
                <div className="w-24 shrink-0">
                  <p className="font-mono text-sm text-signal">{milestone.year}</p>
                  <p className="mt-2 font-mono text-xs text-text-tertiary">
                    {milestone.label}
                  </p>
                </div>
                {index < milestones.length - 1 && (
                  <div
                    className="mt-2 h-px w-16 shrink-0 bg-border-strong"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-xs text-text-tertiary">
          Full timeline with artifacts coming soon.
        </p>
      </div>
    </div>
  )
}
