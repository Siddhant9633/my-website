import { CommandPalette } from "@/components/chrome/CommandPalette"
import { Footer } from "@/components/chrome/Footer"
import { Nav } from "@/components/chrome/Nav"
import { StatusBar } from "@/components/chrome/StatusBar"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <>
      <Nav />
      <main className="flex-1 pb-9">{children}</main>
      <Footer />
      <StatusBar />
      <CommandPalette />
    </>
  )
}
