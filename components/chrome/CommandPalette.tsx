"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  commandGroups,
  commandItems,
  type CommandItem as NavCommandItem,
} from "@/lib/navigation/commands"

type CommandPaletteContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const listeners = new Set<(open: boolean) => void>()

function subscribe(listener: (open: boolean) => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setGlobalOpen(open: boolean): void {
  listeners.forEach((listener) => listener(open))
}

export function useCommandPalette(): CommandPaletteContextValue {
  const [open, setOpen] = useState(false)

  useEffect(() => subscribe(setOpen), [])

  const setOpenAndBroadcast = useCallback((value: boolean) => {
    setOpen(value)
    setGlobalOpen(value)
  }, [])

  return { open, setOpen: setOpenAndBroadcast }
}

export function openCommandPalette(): void {
  setGlobalOpen(true)
}

export function CommandPalette(): React.ReactElement {
  const router = useRouter()
  const { open, setOpen } = useCommandPalette()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  function handleSelect(href: string): void {
    setOpen(false)
    router.push(href)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Search pages, systems, and lab entries"
      className="border border-border-subtle bg-surface-2 sm:max-w-lg"
    >
      <Command className="bg-transparent">
        <CommandInput placeholder="Search the lab…" />
        <CommandList>
          <CommandEmpty className="font-mono text-xs text-text-tertiary">
            No results found.
          </CommandEmpty>
          {commandGroups.map((group, index) => {
            const items = commandItems.filter((item) => item.group === group)

            return (
              <div key={group}>
                {index > 0 && <CommandSeparator />}
                <CommandGroup
                  heading={group}
                  className="font-mono **:[[cmdk-group-heading]]:text-text-tertiary"
                >
                  {items.map((item: NavCommandItem) => (
                    <CommandItem
                      key={item.id}
                      value={[item.label, item.keywords?.join(" ")].join(" ")}
                      onSelect={() => handleSelect(item.href)}
                      className="font-mono text-xs data-selected:bg-surface-3"
                    >
                      <span className="text-text-primary">{item.label}</span>
                      <span className="ml-auto text-text-tertiary">{item.group}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
