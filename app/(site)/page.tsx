import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autonomous Systems Lab",
  description:
    "Building autonomous systems, retrieval pipelines, and AI infrastructure.",
}

export default function HomePage(): React.ReactElement {
  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-24">
        <p className="font-mono text-sm text-signal">[00] AUTONOMOUS SYSTEMS LAB</p>

        <h1 className="mt-8 max-w-4xl text-5xl font-medium tracking-tight md:text-6xl">
          Building autonomous systems, retrieval pipelines, and AI infrastructure.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-text-secondary">
          Personal portfolio and research lab of Siddhant Lokhande.
        </p>
      </div>
    </div>
  )
}
