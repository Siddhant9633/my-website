import type { Metadata } from "next"

import { ChannelCard, contactChannels } from "@/components/contact/ChannelCard"
import { Callout } from "@/components/editorial/Callout"
import { Prose } from "@/components/editorial/Prose"

export const metadata: Metadata = {
  title: "Contact — Autonomous Systems Lab",
  description: "Reach out for collaborations, research conversations, or system design work.",
}

export default function ContactPage(): React.ReactElement {
  return (
    <div className="bg-surface-1 text-text-primary">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-24">
        <div className="max-w-[var(--editorial-max)]">
          <p className="font-mono text-[length:var(--text-mono-md-size)] leading-[var(--text-mono-md-lh)] text-signal">
            [05] CONTACT
          </p>

          <h1 className="mt-6 text-[length:var(--text-display-md-size)] leading-[var(--text-display-md-lh)] font-medium tracking-[var(--text-display-md-tracking)]">
            The lab is open.
          </h1>

          <p className="mt-6 text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-lh)] text-text-secondary">
            For collaborations, research conversations, system design work, or
            honest feedback on something you found here.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {contactChannels.map((channel) => (
            <ChannelCard key={channel.label} {...channel} />
          ))}
        </div>

        <div className="mt-20 max-w-[var(--editorial-max)]">
          <Prose>
            <h2>What to send</h2>
            <p>
              A short note with context beats a polished deck. Tell me what you are
              building, what is stuck, and what a good outcome looks like. I read
              everything; I reply to what I can meaningfully help with.
            </p>

            <Callout title="Response time" variant="note">
              I typically respond within a few days. For time-sensitive work, use the
              scheduling link — it is the fastest path to a focused conversation.
            </Callout>

            <h2>What I am interested in</h2>
            <ul>
              <li>Retrieval systems that admit uncertainty instead of hallucinating confidence.</li>
              <li>Agent architectures with inspectable tool use and failure modes.</li>
              <li>Infrastructure that makes ML systems observable, not magical.</li>
              <li>Interfaces that treat restraint as a design constraint, not an accident.</li>
            </ul>
          </Prose>
        </div>
      </div>
    </div>
  )
}
