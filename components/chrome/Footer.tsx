import Link from "next/link"

const footerLinks = [
  { href: "/systems", label: "Systems" },
  { href: "/lab", label: "Lab" },
  { href: "/evolution", label: "Evolution" },
  { href: "/manifest", label: "Manifest" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
] as const

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border-subtle bg-surface-1">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-xs text-signal">Autonomous Systems Lab</p>
            <p className="mt-2 max-w-sm text-sm text-text-secondary">
              A quiet research instrument. Building autonomous systems, retrieval
              pipelines, and AI infrastructure.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3"
            aria-label="Footer"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
