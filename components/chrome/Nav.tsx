import Link from "next/link"

import { NavCommandButton } from "@/components/chrome/NavCommandButton"

const navLinks = [
  { href: "/systems", label: "Systems" },
  { href: "/lab", label: "Lab" },
  { href: "/evolution", label: "Evolution" },
  { href: "/manifest", label: "Manifest" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
] as const

export function Nav(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-1/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[var(--content-max)] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-text-primary transition-colors hover:text-signal"
          aria-label="Autonomous Systems Lab — home"
        >
          <span
            className="flex size-4 items-center justify-center border border-border-strong text-[10px] font-mono leading-none text-signal"
            aria-hidden="true"
          >
            ▢
          </span>
          <span className="hidden font-mono text-xs tracking-wide text-text-secondary sm:inline">
            ASL
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavCommandButton />

          <span
            className="flex items-center gap-1"
            aria-label="Dark mode active"
            title="Dark mode"
          >
            <span className="size-1.5 rounded-full bg-signal" />
            <span className="size-1.5 rounded-full bg-text-tertiary" />
            <span className="size-1.5 rounded-full bg-text-tertiary" />
          </span>
        </div>
      </div>
    </header>
  )
}
