import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Systems — Autonomous Systems Lab",
  description: "Systems built and shipped.",
}

export default function SystemsPage(): React.ReactElement {
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
          {["rag-engine", "agent-mesh", "local-llm"].map((slug) => (
            <div
              key={slug}
              className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-2 p-6 transition-colors hover:bg-surface-3"
            >
              <p className="font-mono text-xs text-signal">ACTIVE</p>
              <p className="mt-3 font-mono text-sm text-text-primary">{slug}</p>
              <p className="mt-4 font-mono text-xs text-text-tertiary">
                Detail pages coming soon.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
