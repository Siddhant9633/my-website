import type { Metadata } from "next"

import { Callout } from "@/components/editorial/Callout"
import { Prose } from "@/components/editorial/Prose"
import { PullQuote } from "@/components/editorial/PullQuote"

export const metadata: Metadata = {
  title: "Manifest — Autonomous Systems Lab",
  description: "Founding principles for how I think about building systems.",
}

export default function ManifestPage(): React.ReactElement {
  return (
    <article className="bg-surface-1 text-text-primary">
      <header className="mx-auto max-w-[var(--editorial-max)] px-6 pb-16 pt-24">
        <p className="font-serif text-[length:var(--text-overline-size)] leading-[var(--text-overline-lh)] tracking-[var(--text-overline-tracking)] uppercase italic text-warm">
          manifest
        </p>
        <p className="mt-6 font-mono text-[length:var(--text-mono-md-size)] leading-[var(--text-mono-md-lh)] text-signal">
          [MANIFEST]
        </p>

        <h1 className="mt-8 max-w-[14ch] text-[length:var(--text-display-md-size)] leading-[var(--text-display-md-lh)] font-medium tracking-[var(--text-display-md-tracking)]">
          How I think about building.
        </h1>

        <p className="mt-8 max-w-[var(--editorial-max)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-lh)] text-text-secondary">
          This is not a mission statement. It is an operating manual — the constraints
          I return to when a system gets noisy, a interface gets decorative, or a
          decision needs to be defended.
        </p>
      </header>

      <div className="mx-auto max-w-[var(--editorial-max)] px-6 pb-32">
        <Prose size="lg">
          <h2>The thesis</h2>
          <p>
            OpenAI, Linear, and Stripe share one trait: restraint that feels like
            authority. Nothing screams. The interface gets out of the way of the
            substance. The signal of intelligence is precision, not decoration.
          </p>
          <p>
            I build toward a quiet research instrument — a calm, dim laboratory where
            telemetry breathes and every motion means something. The cursor does not
            drive a website; it probes an instrument.
          </p>

          <PullQuote attribution="Operating principle">
            Precision over persuasion. A system should prefer being wrong loudly over
            being confidently vague.
          </PullQuote>

          <h2>Three constraints</h2>
          <p>Every project in this lab inherits three non-negotiable rules:</p>
          <ul>
            <li>
              <strong>One signal color.</strong> Everything else is grayscale. Color
              is reserved for work — active edges, focused nodes, key links. If
              something is blue, it is doing real work.
            </li>
            <li>
              <strong>Motion is information.</strong> If a thing moves, it must mean
              something. Animation is not atmosphere; it is telemetry. Reduced motion
              is a first-class experience, not an afterthought.
            </li>
            <li>
              <strong>3D is the content.</strong> Scenes are not wrappers around copy.
              No hero blob you scroll past. When Three.js appears, it carries
              information density — a graph, a schematic, a spatial model.
            </li>
          </ul>

          <Callout title="Principle" variant="principle">
            Authority comes from the source repo. Systems and lab entries are
            version-controlled MDX — not a CMS, not marketing copy rewritten by a
            committee. What you read is what I ship.
          </Callout>

          <h2>On systems</h2>
          <p>
            A finished system is not a screenshot. It is a decision log — what was
            considered, what was rejected, and why the current shape won. The
            &ldquo;Decisions&rdquo; section on every system page exists because judgment
            is the hardest thing to port across a portfolio.
          </p>
          <p>
            I optimize for systems that fail loudly: retrieval that admits uncertainty,
            agents that surface tool errors, pipelines that expose latency and recall
            instead of hiding behind a chat bubble.
          </p>

          <h2>On interfaces</h2>
          <p>
            Flat by default. Borders, not shadows. Monospace for the voice of the
            machine; sans for the operator; serif for the thinker — used sparingly,
            never for decoration.
          </p>
          <p>
            Body copy never exceeds 74 characters per line. Display type is
            tight-tracked and never heavy — weight 500 at most. Heaviness reads as
            marketing; this site is research.
          </p>

          <PullQuote>
            The hardest problems deserve honest decision logs, not polished marketing.
          </PullQuote>

          <h2>On the lab</h2>
          <p>
            Systems are finished things. The lab is thinking in public — hypotheses,
            running experiments, concluded notes with low/medium/high confidence.
            Roughness is intentional. An experiment dated and revised is more honest
            than a landing page that pretends everything shipped perfectly.
          </p>

          <Callout title="Note" variant="note">
            This manifest is a living document. When a principle changes, it changes
            here first — with a dated note — before it propagates into the systems and
            experiments downstream.
          </Callout>

          <h2>What I am optimizing for</h2>
          <ul>
            <li>Navigable knowledge — a graph that is also a map, not a demo.</li>
            <li>Inspectable systems — telemetry, architecture, evidence, open questions.</li>
            <li>Restraint as a feature — fewer colors, fewer animations, more signal.</li>
            <li>Accessibility as engineering — keyboard paths, reduced motion, real fallbacks.</li>
          </ul>

          <p className="font-mono text-[length:var(--text-mono-sm-size)] leading-[var(--text-mono-sm-lh)] text-text-tertiary">
            Last revised · 2026-06-14 · Siddhant Lokhande
          </p>
        </Prose>
      </div>
    </article>
  )
}
