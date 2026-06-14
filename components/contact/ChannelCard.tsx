import { ArrowUpRightIcon, CalendarIcon, GitBranchIcon, Link2Icon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ChannelCardProps = {
  label: string
  value: string
  href: string
  description: string
  icon: React.ReactNode
  external?: boolean
  className?: string
}

export function ChannelCard({
  label,
  value,
  href,
  description,
  icon,
  external = false,
  className,
}: ChannelCardProps): React.ReactElement {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col rounded-[var(--radius-md)] border border-border-subtle bg-surface-2 p-6 transition-colors hover:border-border-strong hover:bg-surface-3",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-9 items-center justify-center rounded-[var(--radius-sm)] border border-border-subtle bg-surface-1 text-signal">
          {icon}
        </span>
        <ArrowUpRightIcon className="size-4 text-text-tertiary transition-colors group-hover:text-signal" />
      </div>

      <p className="mt-6 font-mono text-[length:var(--text-mono-sm-size)] leading-[var(--text-mono-sm-lh)] tracking-[var(--text-mono-sm-tracking)] text-text-tertiary">
        {label}
      </p>
      <p className="mt-2 font-mono text-[length:var(--text-mono-md-size)] leading-[var(--text-mono-md-lh)] text-text-primary">
        {value}
      </p>
      <p className="mt-3 text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-lh)] text-text-secondary">
        {description}
      </p>
    </a>
  )
}

export const contactChannels = [
  {
    label: "Email",
    value: "hello@siddhantlokhande.com",
    href: "mailto:hello@siddhantlokhande.com",
    description: "Best for research conversations, collaborations, and system design inquiries.",
    icon: <MailIcon className="size-4" strokeWidth={1.5} />,
  },
  {
    label: "GitHub",
    value: "github.com/siddhantlokhande",
    href: "https://github.com/siddhantlokhande",
    description: "Open source work, experiments, and the source of truth for what I build.",
    icon: <GitBranchIcon className="size-4" strokeWidth={1.5} />,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siddhantlokhande",
    href: "https://linkedin.com/in/siddhantlokhande",
    description: "Professional background and longer-form career context.",
    icon: <Link2Icon className="size-4" strokeWidth={1.5} />,
    external: true,
  },
  {
    label: "Schedule",
    value: "cal.com/siddhantlokhande",
    href: "https://cal.com/siddhantlokhande",
    description: "Book a 30-minute call for technical discussions or advisory conversations.",
    icon: <CalendarIcon className="size-4" strokeWidth={1.5} />,
    external: true,
  },
] as const
