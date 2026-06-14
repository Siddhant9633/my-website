import { cn } from "@/lib/utils"

type PullQuoteProps = {
  children: React.ReactNode
  attribution?: string
  className?: string
}

export function PullQuote({
  children,
  attribution,
  className,
}: PullQuoteProps): React.ReactElement {
  return (
    <figure
      className={cn(
        "my-12 border-l border-signal pl-6",
        className
      )}
    >
      <blockquote className="font-serif text-[length:var(--text-headline-sm-size)] leading-[var(--text-headline-sm-lh)] italic text-warm">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-mono text-[length:var(--text-mono-sm-size)] leading-[var(--text-mono-sm-lh)] tracking-[var(--text-mono-sm-tracking)] text-text-tertiary">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
