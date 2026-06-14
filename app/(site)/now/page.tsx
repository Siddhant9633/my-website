import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Now — Autonomous Systems Lab",
  description: "What I'm actively working on.",
}

export default function NowPage(): React.ReactElement {
  const updatedAt = "2026-06-14"

  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--editorial-max)] px-6 py-24">
        <p className="font-mono text-sm text-signal">[NOW]</p>

        <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
          Now.
        </h1>

        <p className="mt-4 font-mono text-xs text-text-tertiary">
          Updated {updatedAt}
        </p>

        <ul className="mt-12 space-y-4 text-text-secondary">
          <li>Building the Autonomous Systems Lab site — Phase 0 foundation.</li>
          <li>Scaffolding content surfaces for systems and research entries.</li>
          <li>Designing the intelligence graph data model and layout.</li>
        </ul>

        <p className="mt-12 font-mono text-xs text-text-tertiary">
          Low-fi, updated weekly. Inspired by Derek Sivers&apos; /now page.
        </p>
      </div>
    </div>
  )
}
