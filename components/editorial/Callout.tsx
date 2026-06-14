import { cn } from "@/lib/utils"

type CalloutVariant = "note" | "principle" | "warning"

type CalloutProps = {
  children: React.ReactNode
  title?: string
  variant?: CalloutVariant
  className?: string
}

const variantStyles: Record<CalloutVariant, string> = {
  note: "border-border-subtle bg-surface-2",
  principle: "border-signal/30 bg-signal-dim",
  warning: "border-anomaly/30 bg-anomaly/10",
}

const titleStyles: Record<CalloutVariant, string> = {
  note: "text-text-secondary",
  principle: "text-signal",
  warning: "text-anomaly",
}

export function Callout({
  children,
  title,
  variant = "note",
  className,
}: CalloutProps): React.ReactElement {
  return (
    <aside
      className={cn(
        "my-10 rounded-[var(--radius-md)] border p-6",
        variantStyles[variant],
        className
      )}
    >
      {title && (
        <p
          className={cn(
            "font-mono text-[length:var(--text-mono-sm-size)] leading-[var(--text-mono-sm-lh)] tracking-[var(--text-mono-sm-tracking)] uppercase",
            titleStyles[variant]
          )}
        >
          {title}
        </p>
      )}
      <div
        className={cn(
          "text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-text-secondary",
          title && "mt-3"
        )}
      >
        {children}
      </div>
    </aside>
  )
}
