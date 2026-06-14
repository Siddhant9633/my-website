import type { Metadata } from "next"
import { geistSans, geistMono, instrumentSerif } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Autonomous Systems Lab",
  description: "Siddhant Lokhande — a quiet research instrument.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
