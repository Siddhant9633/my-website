import { cn } from "@/lib/utils"

type ProseProps = {
  children: React.ReactNode
  className?: string
  size?: "default" | "lg"
}

export function Prose({
  children,
  className,
  size = "default",
}: ProseProps): React.ReactElement {
  return (
    <div
      className={cn(
        "max-w-[var(--editorial-max)] text-text-secondary",
        size === "lg" && "text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-lh)]",
        size === "default" && "text-[length:var(--text-body-size)] leading-[var(--text-body-lh)]",
        "[&_h2]:mt-16 [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-text-primary",
        "[&_h2]:text-[length:var(--text-headline-md-size)] [&_h2]:leading-[var(--text-headline-md-lh)]",
        "[&_h3]:mt-10 [&_h3]:font-medium [&_h3]:text-text-primary",
        "[&_h3]:text-[length:var(--text-headline-sm-size)] [&_h3]:leading-[var(--text-headline-sm-lh)]",
        "[&_p]:mt-6 [&_p]:max-w-[74ch]",
        "[&_ul]:mt-6 [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:pl-0",
        "[&_li]:relative [&_li]:pl-5 [&_li]:max-w-[74ch]",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:font-mono [&_li]:before:text-signal [&_li]:before:content-['›']",
        "[&_a]:text-signal [&_a]:underline-offset-4 hover:[&_a]:text-text-primary hover:[&_a]:underline",
        "[&_code]:rounded-[var(--radius-sm)] [&_code]:bg-surface-0 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[length:var(--text-mono-md-size)] [&_code]:text-text-primary",
        "[&_strong]:font-medium [&_strong]:text-text-primary",
        className
      )}
    >
      {children}
    </div>
  )
}
