"use client"

import { openCommandPalette } from "@/components/chrome/CommandPalette"

export function NavCommandButton(): React.ReactElement {
  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      className="hidden items-center gap-1.5 rounded-md border border-border-subtle bg-surface-2 px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary sm:flex"
      aria-label="Open command palette"
    >
      <span>⌘K</span>
    </button>
  )
}
