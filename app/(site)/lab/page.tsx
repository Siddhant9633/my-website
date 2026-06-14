import type { Metadata } from "next"
import Link from "next/link"
import { getAllExperiments } from "@/lib/mdx"
import type { Experiment } from "@/types/content"

export const metadata: Metadata = {
  title: "Lab — Autonomous Systems Lab",
  description: "Research experiments and notes.",
}

type ExperimentStatus = Experiment["status"]

const statusColor: Record<ExperimentStatus, string> = {
  HYPOTHESIS: "text-text-secondary",
  RUNNING: "text-signal",
  CONCLUDED: "text-text-tertiary",
}

export default async function LabPage(): Promise<React.ReactElement> {
  const experiments = await getAllExperiments()

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
          {experiments.map((experiment) => (
            <Link
              key={experiment.slug}
              href={`/lab/${experiment.slug}`}
              className="group rounded-[var(--radius-md)] border border-border-subtle bg-surface-2 p-6 transition-colors hover:bg-surface-3"
            >
              <div className="flex items-center gap-3">
                <p className={`font-mono text-xs ${statusColor[experiment.status]}`}>
                  {experiment.status}
                </p>
                <span className="font-mono text-xs text-border-strong" aria-hidden="true">
                  ·
                </span>
                <p className="font-mono text-xs text-text-tertiary">{experiment.domain}</p>
              </div>

              <p className="mt-3 font-medium text-text-primary">{experiment.title}</p>

              <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                {experiment.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
