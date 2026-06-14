import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lab — Autonomous Systems Lab",
  description: "Research experiments and notes.",
}

export default function LabPage(): React.ReactElement {
  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-24">
        <p className="font-mono text-sm text-signal">[03] RESEARCH LAB</p>

        <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
          Research lab.
        </h1>

        <p className="mt-6 max-w-2xl text-text-secondary">
          Notes, experiments, half-formed ideas. Read at your own risk.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Memory across multi-step agent runs", state: "HYPOTHESIS" },
            { title: "Reranking with cross-encoder vs LLM judge", state: "CONCLUDED" },
          ].map((entry) => (
            <div
              key={entry.title}
              className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-2 p-6 transition-colors hover:bg-surface-3"
            >
              <p className="font-mono text-xs text-signal">{entry.state}</p>
              <p className="mt-3 text-text-primary">{entry.title}</p>
              <p className="mt-4 font-mono text-xs text-text-tertiary">
                Entry pages coming soon.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
