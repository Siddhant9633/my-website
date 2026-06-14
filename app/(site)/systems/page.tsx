import type { Metadata } from "next"
import Link from "next/link"
import { getAllSystems } from "@/lib/mdx"
import type { SystemStatus } from "@/types/content"

export const metadata: Metadata = {
  title: "Systems — Autonomous Systems Lab",
  description: "Systems built and shipped.",
}

const statusColor: Record<SystemStatus, string> = {
  ACTIVE: "text-signal",
  EXPERIMENTAL: "text-warm",
  ARCHIVED: "text-text-tertiary",
  HYPOTHESIS: "text-text-secondary",
}

export default async function SystemsPage(): Promise<React.ReactElement> {
  const systems = await getAllSystems()

  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-24">
        <p className="font-mono text-sm text-signal">[02] SYSTEMS BUILT</p>

        <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
          Systems built.
        </h1>

        <p className="mt-6 max-w-2xl text-text-secondary">
          Finished things with telemetry, architecture, and decision logs.
          Each system prefers being wrong loudly over being confidently vague.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <Link
              key={system.slug}
              href={`/systems/${system.slug}`}
              className="group rounded-[var(--radius-md)] border border-border-subtle bg-surface-2 p-6 transition-colors hover:bg-surface-3"
            >
              <div className="flex items-center gap-3">
                <p className={`font-mono text-xs ${statusColor[system.status]}`}>
                  {system.status}
                </p>
                <span className="font-mono text-xs text-border-strong" aria-hidden="true">
                  ·
                </span>
                <p className="font-mono text-xs text-text-tertiary">{system.domain}</p>
              </div>

              <p className="mt-3 font-medium text-text-primary">{system.title}</p>

              <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                {system.summary}
              </p>

              <p className="mt-4 font-mono text-xs text-text-tertiary">
                since · {system.since}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
