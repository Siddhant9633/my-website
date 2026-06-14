import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllSystems, getSystemBySlug } from "@/lib/mdx"
import { Prose } from "@/components/editorial/Prose"
import type { SystemStatus } from "@/types/content"

const statusColor: Record<SystemStatus, string> = {
  ACTIVE: "text-signal",
  EXPERIMENTAL: "text-warm",
  ARCHIVED: "text-text-tertiary",
  HYPOTHESIS: "text-text-secondary",
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const systems = await getAllSystems()
  return systems.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await getSystemBySlug(slug)
  if (!result) return {}
  return {
    title: `${result.frontmatter.title} — Autonomous Systems Lab`,
    description: result.frontmatter.summary,
  }
}

export default async function SystemPage({ params }: Props) {
  const { slug } = await params
  const result = await getSystemBySlug(slug)
  if (!result) notFound()

  const { frontmatter: fm, content } = result

  return (
    <article className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--editorial-max)] px-6 pb-32 pt-24">
        <header className="mb-16">
          <div className="flex items-center gap-3">
            <p className={`font-mono text-xs ${statusColor[fm.status]}`}>
              {fm.status}
            </p>
            <span className="font-mono text-xs text-border-strong" aria-hidden="true">
              ·
            </span>
            <p className="font-mono text-xs text-text-tertiary">{fm.domain}</p>
          </div>

          <h1 className="mt-6 text-[length:var(--text-headline-lg-size)] leading-[var(--text-headline-lg-lh)] font-medium tracking-tight">
            {fm.title}
          </h1>

          <p className="mt-6 max-w-[74ch] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-lh)] text-text-secondary">
            {fm.summary}
          </p>

          <p className="mt-6 font-mono text-[length:var(--text-mono-sm-size)] leading-[var(--text-mono-sm-lh)] text-text-tertiary">
            since · {fm.since}
          </p>

          <div className="mt-10 h-px bg-border-subtle" aria-hidden="true" />
        </header>

        <Prose size="lg">
          <MDXRemote source={content} />
        </Prose>
      </div>
    </article>
  )
}
