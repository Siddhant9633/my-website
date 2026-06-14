import { getBuildSha } from "@/lib/telemetry/build"

export function StatusBar(): React.ReactElement {
  const buildSha = getBuildSha()

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface-0/95 backdrop-blur-sm"
      role="status"
      aria-label="System status"
    >
      <div className="mx-auto flex h-9 max-w-[var(--content-max)] items-center justify-between px-6 font-mono text-xs text-text-tertiary">
        <span>
          build · <span className="text-text-secondary">{buildSha}</span>
        </span>

        <span className="flex items-center gap-2 text-text-secondary">
          <span
            className="size-1.5 rounded-full bg-signal"
            aria-hidden="true"
          />
          online
        </span>

        <span className="hidden sm:inline">© siddhant lokhande</span>
      </div>
    </div>
  )
}
