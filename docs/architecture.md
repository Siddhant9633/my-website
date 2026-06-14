 Before I start writing any code, here is the complete design and architecture brief for Autonomous Systems Lab. I've made strong opinionated choices throughout — call out anything you want to revisit.

  ---\
  Autonomous Systems Lab\
  \
  Creative direction · Product design · Frontend architecture\
  Owner: Siddhant Lokhande

  0\. The thesis (read this first)

  OpenAI, Linear, and Stripe all share one trait: restraint that feels like authority. Nothing screams. The interface gets out of the way of the substance. The signal of intelligence is precision, not\
  decoration.

  So our north star is a quiet research instrument. The user lands inside a calm, dim laboratory. Telemetry breathes. A knowledge graph idles. Nothing animates for its own sake — every motion is a system\
  "thinking." The cursor doesn't drive a website; it probes an instrument.

  Three guiding constraints:\
  1. One signal color. Everything else is grayscale.\
  2. Motion is information. If a thing moves, it must mean something.\
  3. The 3D scenes are the content, not a wrapper around the content. No hero 3D blob that you scroll past.

  ---\
  1. Information Architecture

  /                       Single-page exploration (Boot → Graph → Systems → Lab → Evolution → Contact)\
  /systems                Index of systems built\
  /systems/\[slug\]         Deep-dive on one system\
  /lab                    Index of research experiments\
  /lab/\[slug\]             One experiment / essay (MDX, interactive)\
  /evolution              Full timeline (expanded from homepage condensed view)\
  /contact                Direct contact + scheduling\
  /manifest               One-page founding principles ("how I think about building")\
  /now                    What I'm actively working on this week (low-fi, dated)

  Hidden navigation:\
  - Command palette (⌘K): jumps to any node in the Intelligence Graph, any system, any research entry. This is the power-user spine.\
  - /\_status: a humble "uptime"-style page showing site build commit, last content update — sells the "live system" feel without lying.\
  \
  Mental model for the user: "I'm inside a running lab. I can move around it. The graph is the map."

  ---\
  2. Folder structure\
  \
  my-website/\
  ├─ app/\
  │  ├─ (site)/\
  │  │  ├─ page.tsx                       # Home: orchestrates all sections\
  │  │  ├─ systems/\
  │  │  │  ├─ page.tsx                    # Systems index (grid + filters)\
  │  │  │  └─ \[slug\]/page.tsx             # System detail (MDX-driven)\
  │  │  ├─ lab/\
  │  │  │  ├─ page.tsx\
  │  │  │  └─ \[slug\]/page.tsx\
  │  │  ├─ evolution/page.tsx\
  │  │  ├─ contact/page.tsx\
  │  │  ├─ manifest/page.tsx\
  │  │  └─ now/page.tsx\
  │  ├─ api/\
  │  │  ├─ og/route.tsx                   # dynamic OG images per page\
  │  │  └─ telemetry/route.ts             # serves "live" status JSON (build sha, last commit)\
  │  ├─ layout.tsx                        # root: fonts, theme, providers\
  │  ├─ globals.css                       # tokens + base\
  │  ├─ fonts.ts                          # next/font local + google\
  │  ├─ providers.tsx                     # MotionConfig, ThemeProvider, R3F canvas portal\
  │  └─ manifest.ts                       # PWA manifest\
  │\
  ├─ components/\
  │  ├─ boot/                             # BootSequence + sub-modules\
  │  ├─ graph/                            # IntelligenceGraph (R3F scene + UI)\
  │  ├─ systems/                          # SystemCard, SystemDetail, ArchitectureDiagram\
  │  ├─ lab/                              # ExperimentCard, ExperimentReader\
  │  ├─ evolution/                        # Timeline, TimelineNode\
  │  ├─ contact/                          # ContactSurface, ChannelCard\
  │  ├─ chrome/                           # Nav, Footer, CommandPalette, StatusBar\
  │  ├─ editorial/                        # Prose, Pullquote, Figure, Callout\
  │  ├─ motion/                           # primitives: Reveal, Scrub, Stagger, Magnet\
  │  ├─ three/                            # R3F primitives: GraphScene, NeuronEdge, NodeMesh, Camera\
  │  └─ ui/                               # shadcn primitives (button, dialog, command, tooltip…)\
  │\
  ├─ content/\
  │  ├─ systems/\*.mdx\
  │  ├─ lab/\*.mdx\
  │  └─ evolution/\*.mdx\
  │\
  ├─ lib/\
  │  ├─ motion/                           # easings, durations, presets\
  │  ├─ three/                            # shaders, instancing helpers, camera rigs\
  │  ├─ mdx/                              # compiler, components registry\
  │  ├─ graph/                            # nodes/edges schema, layout, queries\
  │  ├─ telemetry/                        # build info, last-updated reader\
  │  └─ utils.ts\
  │\
  ├─ hooks/                               # useReducedMotion, useViewport, useGraphSelection…\
  ├─ types/                               # Node, Edge, System, Experiment, Milestone\
  ├─ public/\
  │  ├─ fonts/\
  │  ├─ og/\
  │  └─ posters/                          # reduced-motion fallbacks for 3D scenes\
  ├─ styles/\
  │  └─ tokens.css                        # design tokens as CSS variables\
  ├─ tests/\
  ├─ .env.example\
  ├─ tailwind.config.ts\
  ├─ next.config.mjs\
  └─ tsconfig.json\
  \
  Key conventions:\
  - All 3D lives behind components/three/ and is lazy-loaded. Initial bundle never includes Three.\
  - Content is MDX, not CMS. Systems and lab entries are version-controlled source. Authority comes from the source repo.\
  - One Canvas instance mounted in providers.tsx, scenes swap inside it (via View from Drei or a portal pattern) — avoids multiple WebGL contexts.

  ---\
  3. Component hierarchy\
  \
  &lt;RootLayout&gt;\
    &lt;ThemeProvider&gt;\
      &lt;MotionConfig&gt;                             # global reduced-motion + easing\
        &lt;CanvasProvider&gt;                         # single R3F canvas (or null on /contact)\
          &lt;Chrome&gt;\
            &lt;Nav /&gt;                              # minimal: logo glyph, ⌘K, mode\
            &lt;CommandPalette /&gt;                   # ⌘K — search graph + pages\
            &lt;StatusBar /&gt;                        # bottom-left: build sha, "online" pulse\
          &lt;/Chrome&gt;

          &lt;main&gt;\
            &lt;Home&gt;\
              &lt;BootSequence&gt;                     # full-bleed, \~3s, skippable\
                &lt;SystemCheck /&gt;                  # lines of telemetry resolving\
                &lt;IdentityResolve /&gt;              # "SIDDHANT LOKHANDE · OPERATOR"\
                &lt;EntryHandoff /&gt;                 # exits into graph\
              &lt;/BootSequence&gt;

              &lt;IntelligenceGraph&gt;                # the centerpiece\
                &lt;GraphScene&gt;                     # R3F: nodes, edges, camera rig\
                  &lt;Nodes /&gt;                      # instanced meshes\
                  &lt;Edges /&gt;                      # custom shader, pulses along active edges\
                  &lt;FocusRig /&gt;                   # camera dolly on selection\
                &lt;/GraphScene&gt;\
                &lt;GraphHUD&gt;                       # 2D overlay: telemetry, legend, filters\
                  &lt;NodeInspector /&gt;              # opens on hover/focus\
                  &lt;Legend /&gt;\
                  &lt;FilterRail /&gt;                 # by domain (agents/retrieval/infra…)\
                &lt;/GraphHUD&gt;\
              &lt;/IntelligenceGraph&gt;

              &lt;SystemsBuilt&gt;                     # horizontal scrolling rail\
                &lt;SystemCard /&gt;                   # one per system, status, telemetry\
              &lt;/SystemsBuilt&gt;

              &lt;ResearchLab&gt;                      # split: featured experiment + recent\
                &lt;FeaturedExperiment /&gt;\
                &lt;ExperimentList /&gt;\
              &lt;/ResearchLab&gt;

              &lt;EvolutionTimeline&gt;                # condensed; full at /evolution\
                &lt;TimelineTrack /&gt;\
                &lt;Milestone /&gt;                    # year, event, artifact link\
              &lt;/EvolutionTimeline&gt;

              &lt;Contact&gt;\
                &lt;ContactSurface /&gt;               # email, github, linkedin, scheduling\
              &lt;/Contact&gt;\
            &lt;/Home&gt;\
          &lt;/main&gt;\
  \
          &lt;Footer /&gt;\
        &lt;/CanvasProvider&gt;\
      &lt;/MotionConfig&gt;\
    &lt;/ThemeProvider&gt;\
  &lt;/RootLayout&gt;

  Reusable motion primitives (the "vocabulary"):\
  - &lt;Reveal&gt; — fade + 8px rise on viewport entry\
  - &lt;Scrub&gt; — GSAP ScrollTrigger driven; pins and progresses children\
  - &lt;Stagger&gt; — orchestrates children with index-based delays\
  - &lt;Magnet&gt; — subtle cursor attraction for interactive elements\
  - &lt;Telemetry&gt; — typewrites monospace strings, optional cursor

  ---\
  4. Design system\
  \
  Grid: 12-column, 80px max gutter, content max-width 1320px. Editorial reading width 680px.

  Spacing scale (multiples of 4):\
  2, 4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 120, 200

  Radii:\
  - sm 6px (chips, inputs)\
  - md 10px (cards)\
  - lg 16px (panels)\
  - full 9999px\
  \
  Elevation: flat by default. We use borders, not shadows — 1px rgba(255,255,255,0.06) for hairlines, never drop shadows. Depth comes from layered surface tokens (surface-0 through surface-3) and slight\
  backdrop blur on overlays only.

  Borders: all 1px. We never use 2px+ borders — keeps the lab-instrument feel.

  Iconography: Lucide for UI, plus a small custom set for system-status glyphs (active / experimental / archived / hypothesis). All stroke-based, 1.5px stroke.

  Surfaces:\
  - Cards: surface-1 background, border-subtle hairline, hover lifts to surface-2 (no shadow).\
  - Modals: surface-2, backdrop-blur 12px.\
  - Code blocks: surface-0 (darker than page) — code is "deeper" than the document.

  ---\
  5. Typography system\
  \
  Three families. All loaded via next/font for zero-FOIT.

  ┌──────────────────┬──────────────────┬──────────────────────────────────────────────────────────────────────────────────────┐\
  │       Role       │      Family      │                                         Why                                          │\
  ├──────────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤\
  │ Display & UI     │ Geist Sans       │ Vercel's grotesque — geometrically precise, zero stylistic noise. The "OpenAI feel." │\
  ├──────────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤\
  │ Monospace        │ Geist Mono       │ Pairs natively; for telemetry, code, technical labels.                               │\
  ├──────────────────┼──────────────────┼──────────────────────────────────────────────────────────────────────────────────────┤\
  │ Editorial accent │ Instrument Serif │ Used sparingly: section overlines, the manifest, pull-quotes. Adds humanity.         │\
  └──────────────────┴──────────────────┴──────────────────────────────────────────────────────────────────────────────────────┘

  Type scale (1.250 minor third, tightened on display):

  ┌─────────────┬────────┬────────────────┬─────────────────────────────────────────────┐\
  │    Token    │  Size  │      Line      │                     Use                     │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ display-xl  │ 96/100 │ -2.5%          │ Boot identity; manifest hero                │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ display-lg  │ 72/76  │ -2%            │ Page heroes                                 │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ display-md  │ 56/60  │ -2%            │ Section openers                             │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ headline-lg │ 40/46  │ -1%            │ System hero                                 │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ headline-md │ 28/34  │ -0.5%          │ Card titles                                 │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ headline-sm │ 20/28  │ 0              │ Inspector titles                            │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ body-lg     │ 18/30  │ 0              │ Editorial reading                           │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ body        │ 16/26  │ 0              │ Default                                     │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ body-sm     │ 14/22  │ 0              │ Metadata                                    │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ mono-md     │ 14/20  │ 0              │ Telemetry, badges                           │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ mono-sm     │ 12/18  │ +1%            │ Sub-labels, axis                            │\
  ├─────────────┼────────┼────────────────┼─────────────────────────────────────────────┤\
  │ overline    │ 11/14  │ +12% uppercase │ Section overlines (Instrument Serif italic) │\
  └─────────────┴────────┴────────────────┴─────────────────────────────────────────────┘

  Rules:\
  - Body never exceeds 74 characters per line.\
  - Display is always tight-tracked, never bold — weight 500 max. Heaviness reads as marketing; this site is research.\
  - Monospace is the voice of the system. Sans is the voice of the operator. Serif is the voice of the thinker. We use them consistently to signal who is "speaking."

  ---\
  6. Color system

  Dark-first. Light mode is a fully designed second theme, not a hue inversion.

  Dark (default):

  --surface-0:        #0A0A0C   /\* deepest — behind code, behind canvas */\
  --surface-1:        #0F1014   /* page background */\
  --surface-2:        #15161B   /* cards */\
  --surface-3:        #1C1D23   /* hover, modals */\
  --border-subtle:    rgba(255,255,255,0.06)\
  --border-strong:    rgba(255,255,255,0.12)\
  --text-primary:     #ECECEE\
  --text-secondary:   #A1A1AA\
  --text-tertiary:    #6B6B73\
  --signal:           #7AB8FF   /* the only chromatic accent */\
  --signal-dim:       rgba(122,184,255,0.20)\
  --signal-glow:      rgba(122,184,255,0.45)\
  --warm:             #E8C8A0   /* used only in serif editorial moments */\
  --anomaly:          #F25555   /* errors, deprecation — never decoration \*/

  Light mode keeps signal at #2A6CDB for AA contrast on white; everything else is mirrored. The site spends \~95% of its visual budget in grayscale; the signal color appears on active edges in the graph, \
  focused node halos, key links, and the cursor pulse. That's it.

  Why one signal color: Stripe, Linear, OpenAI all do this. It makes intelligence feel intentional — every blue thing is doing real work.

  Contrast: all body text passes WCAG AA on surface-1. Secondary text passes AA Large; we never put body copy in text-tertiary.

  ---\
  7. Motion system\
  \
  Three tiers, never mixed within a single interaction:

  ┌───────────┬────────────┬──────────────────────────────────────────────────────┐\
  │   Tier    │  Duration  │                         Use                          │\
  ├───────────┼────────────┼──────────────────────────────────────────────────────┤\
  │ Micro     │ 120–200ms  │ Hover, focus rings, button feedback                  │\
  ├───────────┼────────────┼──────────────────────────────────────────────────────┤\
  │ Macro     │ 400–700ms  │ Section reveals, layout shifts, modal open           │\
  ├───────────┼────────────┼──────────────────────────────────────────────────────┤\
  │ Cinematic │ 900–1500ms │ Boot sequence, graph focus dollies, hero transitions │\
  └───────────┴────────────┴──────────────────────────────────────────────────────┘

  Easings (the only ones we use):\
  export const ease = {\
    out:    \[0.16, 1, 0.30, 1\],   // expo-out — default for reveals\
    inOut:  \[0.65, 0, 0.35, 1\],   // cubic — for symmetric transitions\
    drift:  \[0.22, 0.61, 0.36, 1\] // bespoke — camera and slow telemetry sweeps\
  }

  Library responsibility split:\
  - Framer Motion — component state, layout transitions, exit animations, gesture\
  - GSAP + ScrollTrigger — scroll-driven choreography (pinning sections, scrubbing the timeline)\
  - React Three Fiber — Boot, Intelligence Graph, any 3D\
  - CSS — hover micro-states (cheaper than JS)

  Reduced motion contract (non-negotiable):\
  - prefers-reduced-motion: reduce → all R3F scenes replaced with rendered poster images (kept in /public/posters/)\
  - Cinematic motions become instant or 150ms fades \
  - The site remains fully usable, with identical information density\
  - We test this every release. There is a ?reducedMotion=1 debug flag.

  The "thinking" motif:\
  Everywhere the system is "thinking," we use a single shared idle — a 3–4s breath cycle, opacity 0.4 → 1.0, ease drift. It appears on the status pulse, idle edges in the graph, and the cursor when\
  hovering an interactive node. This single recurring motif is what makes the entire site feel alive without ever feeling noisy.

  ---\
  8. Responsive strategy

  ┌────────────┬───────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐\
  │ Breakpoint │   Width   │                                                                                What changes                                                                                 │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ xs         │ 320–479   │ Boot is text-only telemetry on surface-1. Graph becomes a vertical list of nodes grouped by domain (no 3D). Systems and Lab stack 1-up. Timeline becomes a left-rail        │\
  │            │           │ vertical track.                                                                                                                                                             │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ sm         │ 480–767   │ Same as xs with 2-up cards where space allows.                                                                                                                              │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ md         │ 768–1023  │ Boot reintroduces a 2D SVG diagram. Graph becomes a 2D force layout (still interactive, no Three). 2-column editorial layouts.                                              │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ lg         │ 1024–1439 │ Full experience. 3D graph. Pinned scroll sections. Command palette.                                                                                                         │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ xl         │ 1440–1919 │ Wider editorial measure; larger graph viewport (full 16:9 instead of inset).                                                                                                │\
  ├────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ 2xl        │ 1920+     │ Content capped at 1440. Extra width becomes negative space. Graph viewport can extend to 90vw.                                                                              │\
  └────────────┴───────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  Why no 3D below lg: mobile GPU thermals + battery, plus touch-driven 3D graphs are genuinely worse UX than a tappable list. We're not punishing mobile — we're giving it a different, equally good\
  experience.

  Touch: all hover affordances have a tap equivalent. The graph supports long-press for inspector. The command palette is reachable from a persistent floating button on mobile.

  Performance budgets (per page):\
  - LCP &lt; 1.8s on desktop, &lt; 2.5s on mobile\
  - INP &lt; 200ms\
  - CLS &lt; 0.05\
  - JS shipped to home (no graph): &lt; 120KB gzip\
  - Graph chunk lazy-loaded: &lt; 180KB gzip, fetched only after Boot completes

  ---\
  9. Homepage wireframe\
  \
  Single page. Scroll is choreographed; each section pins briefly, then releases.

  ┌────────────────────────────────────────────────────────────────────────┐\
  │  ▢                                                       ⌘K     ●●●    │  ← Nav (16px logo glyph, palette, theme)\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[00\] BOOT SEQUENCE                                                   │\
  │   ─────────────────                                                    │\
  │                                                                        │\
  │      › autonomous-systems-lab/                                         │\
  │      › initializing runtime........ ok                                 │\
  │      › loading agent registry...... ok                                 │\
  │      › verifying operator.......... SIDDHANT LOKHANDE                  │\
  │      › status...................... ONLINE                            │\
  │                                                                        │\
  │                       ENTER LAB    ↵   (skip → home)                   │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[01\] INTELLIGENCE GRAPH                                              │\
  │   ───────────────────────                                              │\
  │                                                                        │\
  │   ┌──────────────────────────────────┐   ┌──────────────────────────┐  │\
  │   │                                  │   │  retrieval               │  │\
  │   │           ●──── ●                │   │  agents                  │  │\
  │   │          / \\    \\                │   │  infrastructure          │  │\
  │   │         ●   ●────●               │   │  evaluation              │  │\
  │   │          \\ /                     │   │                          │  │\
  │   │           ●                      │   │  ── inspector ──         │  │\
  │   │      \[3D node graph\]             │   │  node: rag-engine        │  │\
  │   │                                  │   │  type: system            │  │\
  │   │                                  │   │  built: 2025             │  │\
  │   └──────────────────────────────────┘   │  edges: 7 → tools        │  │\
  │                                          └──────────────────────────┘  │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[02\] SYSTEMS BUILT — horizontal rail                                 │\
  │   ─────────────────────                                                │\
  │                                                                        │\
  │   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐           │\
  │   │ ACTIVE    │  │ ACTIVE    │  │ EXPERIM.  │  │ ARCHIVED  │   →       │\
  │   │ rag-engine│  │ agent-mesh│  │ local-llm │  │ ocr-pipe  │           │\
  │   │ ─────     │  │ ─────     │  │ ─────     │  │ ─────     │           │\
  │   │ telemetry │  │ telemetry │  │ telemetry │  │ telemetry │           │\
  │   └───────────┘  └───────────┘  └───────────┘  └───────────┘           │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[03\] RESEARCH LAB                                                    │\
  │   ─────────────────                                                    │\
  │                                                                        │\
  │   ┌──────────────────────────────┐   ┌─────────────────────────────┐   │\
  │   │ FEATURED EXPERIMENT          │   │  Recent entries             │   │\
  │   │  "Local agents over tools    │   │  ▢ Local embedding bench    │   │\
  │   │   when bandwidth is zero"    │   │  ▢ Agent failure modes      │   │\
  │   │  · running · 12d ago         │   │  ▢ Retrieval reranker test  │   │\
  │   │  \[serif intro paragraph\]     │   │  ▢ Memory in long sessions  │   │\
  │   └──────────────────────────────┘   └─────────────────────────────┘   │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[04\] EVOLUTION                                                       │\
  │   ──────────────                                                       │\
  │                                                                        │\
  │   2022 ●───── 2023 ●───── 2024 ●───── 2025 ●───── 2026 ●               │\
  │         first code      first system  first lab     now                │\
  │         (scrub timeline horizontally with hover for detail)            │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │                                                                        │\
  │   \[05\] CONTACT                                                         │\
  │   ────────────                                                         │\
  │                                                                        │\
  │   The lab is open. ─────────────────────────────────────               │\
  │   email · github · linkedin · schedule a call                          │\
  │                                                                        │\
  ├────────────────────────────────────────────────────────────────────────┤\
  │  build · a3f7c12       ●  online        © siddhant lokhande            │  ← StatusBar\
  └────────────────────────────────────────────────────────────────────────┘

  Section numbering with \[00\]–\[05\] is intentional — it reinforces the instrument metaphor and gives the user a sense of position (we render the same index in the nav's mini-map on scroll).

  ---\
  10. Intelligence Graph — architecture\
  \
  This is the centerpiece, so it gets a real engineering treatment.

  Data model

  // types/graph.ts\
  export type NodeKind = 'system' | 'concept' | 'tool' | 'paper' | 'skill'\
  export type EdgeKind = 'uses' | 'builds-on' | 'inspired-by' | 'depends-on'

  export type GraphNode = {\
    id: string\
    label: string\
    kind: NodeKind\
    domain: 'agents' | 'retrieval' | 'infrastructure' | 'evaluation'\
    importance: 1 | 2 | 3        // scales node radius\
    href?: string                // links to /systems/\[slug\] or /lab/\[slug\]\
    summary: string              // shown in inspector\
    metrics?: Record&lt;string, string | number&gt;\
    position?: \[number, number, number\]  // pre-computed; optional\
  }

  export type GraphEdge = {\
    source: string\
    target: string\
    kind: EdgeKind\
    weight: number               // 0..1, drives pulse intensity\
  }

  Graph data lives in lib/graph/data.ts as a typed const — content-as-code. Single source of truth.

  Layout strategy\
  \
  Pre-computed, not live force-directed. A live d3-force layout makes the graph feel like a tech demo. We run d3-force-3d at build time, freeze positions to the data file, and apply a deterministic seed.\
  The graph is the same every visit — like a real lab schematic. Only the camera and pulses move.

  Rendering

  - Nodes: single InstancedMesh (one draw call). Sphere geometry, MeshBasicMaterial with per-instance color attribute. Halo on focus done via second instanced mesh with additive blending.\
  - Edges: LineSegments with custom shader. Each edge has a pulsePhase uniform; when the edge is "active" (its endpoint is hovered or its system is active), a packet travels along it on a 1.6s loop.\
  - Background: subtle starfield (instanced points, very low alpha) — sells "lab depth" without screaming sci-fi.\
  - Camera: OrthographicCamera (not perspective — perspective makes graphs feel cartoonish; ortho feels scientific). Custom orbit rig: damped, constrained pitch, no roll.

  Interactivity

  ┌─────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────┐\
  │     Action      │                                            Result                                             │\
  ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ Hover node      │ Node highlights (signal color); connected edges pulse; inspector opens with summary + metrics │\
  ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ Click node      │ Camera dollies to focus (1.2s, drift easing). Inspector "pins." Other nodes dim to 30%.       │\
  ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ Click outside   │ Camera returns to overview                                                                    │\
  ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ ⌘K → node label │ Jumps directly (same focus animation)                                                         │\
  ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤\
  │ Domain filter   │ Non-matching nodes fade to 12% opacity; matching nodes scale 1.15×                            │\
  └─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┘

  Accessibility\
  \
  - The 2D HUD layer carries the same data structure as a navigable list for screen readers — visually hidden but real.\
  - Keyboard: Tab cycles nodes in importance order; Enter focuses; Esc resets.\
  - The inspector is the actual semantic source; the 3D scene is decorative-accessible (role="img", aria-label="Intelligence graph of …").

  Performance

  - Cold canvas mount only after Boot completes (requestIdleCallback).\
  - ≤ 80 nodes, ≤ 150 edges hard limit — we curate, not dump.\
  - DPR clamped to 1.5; antialias off; tone mapping off.\
  - Tab visibility → pause RAF.\
  - Tested: &lt; 4ms/frame on M1 Air, &lt; 9ms/frame on a mid-tier Android.

  ---\
  11. Project (System) page architecture\
  \
  /systems/\[slug\] — driven by MDX with custom components.

  ┌──────────────────────────────────────────────────────────────────┐\
  │  ← back to systems                                       ⌘K      │\
  ├──────────────────────────────────────────────────────────────────┤\
  │                                                                  │\
  │  \[SYSTEM · ACTIVE\]                                               │\
  │                                                                  │\
  │  rag-engine                                                      │\
  │                                                                  │\
  │  A retrieval-first answer engine that prefers being wrong        │\
  │  loudly over being confidently vague.                            │\
  │                                                                  │\
  │  ─── telemetry ──────────────────────────────────────────        │\
  │  latency        avg recall      languages       since            │\
  │  84ms p50       0.71            ts · py         2025-08          │\
  │                                                                  │\
  ├──────────────────────────────────────────────────────────────────┤\
  │  § the problem                                                   │\
  │  \[editorial prose, 680px measure\]                                │\
  │                                                                  │\
  │  § architecture                                                  │\
  │  \[interactive architecture diagram — SVG with hoverable nodes\]   │\
  │                                                                  │\
  │  § decisions                                                     │\
  │  \[decision log: choice + alternatives considered + why\]          │\
  │                                                                  │\
  │  § evidence                                                      │\
  │  \[demo video, screenshots, live link, repo link\]                 │\
  │                                                                  │\
  │  § open questions                                                │\
  │  \[honest list of things still unsolved\]                          │\
  │                                                                  │\
  ├──────────────────────────────────────────────────────────────────┤\
  │  ← prev system          related → \[graph neighbors as chips\]     │\
  └──────────────────────────────────────────────────────────────────┘

  Why "Decisions" exists: it's the most senior signal in the entire portfolio. Listing what you considered and rejected demonstrates judgment in a way a screenshot can't.

  Status badges: ACTIVE (signal), EXPERIMENTAL (warm), ARCHIVED (text-tertiary), HYPOTHESIS (signal-dim, dashed border).

  MDX components available: &lt;Telemetry&gt;, &lt;Decision&gt;, &lt;Architecture&gt;, &lt;Evidence&gt;, &lt;OpenQuestion&gt;, &lt;Callout&gt;, &lt;Pullquote&gt;, &lt;Figure&gt;, &lt;Code&gt;.

  ---\
  12. AI Lab page architecture\
  \
  The Lab is intentionally rougher than Systems. Systems are finished things; Lab is thinking in public.

  /lab (index):

  ┌──────────────────────────────────────────────────────────────────┐\
  │  research lab                                                    │\
  │  notes, experiments, half-formed ideas. read at your own risk.   │\
  │                                                                  │\
  │  filter: ▢ agents  ▢ retrieval  ▢ infra  ▢ evaluation            │\
  │  state:  ▢ hypothesis  ▢ running  ▢ concluded                    │\
  ├──────────────────────────────────────────────────────────────────┤\
  │                                                                  │\
  │  ┌────────────────────────────┐  ┌───────────────────────────┐   │\
  │  │ HYPOTHESIS · agents        │  │ CONCLUDED · retrieval     │   │\
  │  │ Memory across multi-step   │  │ Reranking with cross-     │   │\
  │  │ agent runs                  │  │ encoder vs LLM judge      │   │\
  │  │ → 3 min read · serif intro │  │ → 8 min read              │   │\
  │  └────────────────────────────┘  └───────────────────────────┘   │\
  │                                                                  │\
  └──────────────────────────────────────────────────────────────────┘

  /lab/\[slug\] (entry):\
  - Long-form MDX, editorial measure, serif intro paragraph, sans body.\
  - State header: HYPOTHESIS / RUNNING / CONCLUDED, last updated, optional "result confidence: low/medium/high".\
  - Inline interactive demos when relevant (e.g., embed a small live chat with a tiny local model to demonstrate a point — guarded by a "run demo" button so we don't auto-boot WASM).\
  - Footnotes and references rendered margin-side on xl+. \
  \
  Lab entries are typed Experiment not Article — naming matters. They're treated as living artifacts; updates are dated changelog entries at the bottom.

  ---\
  13. Development roadmap\
  \
  Eight weeks to a launchable v1. Sequenced so the site is useful (deployable) after every phase.

  Phase 0 — Foundation (Days 1–4)

  - Next.js 15 app, TS strict, Tailwind, shadcn init\
  - Design tokens in CSS vars; Tailwind theme bridge\
  - Fonts (Geist Sans, Geist Mono, Instrument Serif) via next/font\
  - Root layout, Providers, theme switching, reduced-motion plumbing\
  - Nav + StatusBar + Footer chrome\
  - MDX pipeline (@next/mdx, frontmatter schema with zod)\
  - One placeholder page per route — deploy to Vercel

  Exit criteria: clean Lighthouse, real fonts, dark/light working, MDX renders.

  Phase 1 — Voice (Days 5–9)

  - Typography components and editorial primitives\
  - Manifest page (a single beautiful page — establishes the voice early)\
  - Contact page\
  - Command palette (search across routes)

  Exit criteria: the writing of the site reads true at /manifest. Don't proceed until this feels right.

  Phase 2 — Content surfaces (Days 10–16)\
  \
  - Systems index + detail (MDX-driven)\
  - Lab index + detail\
  - 2 real systems written, 2 real lab entries written\
  - Evolution timeline (2D, scroll-scrubbed via GSAP)

  Exit criteria: the site is already useful to a recruiter without any 3D.

  Phase 3 — Boot sequence (Days 17–20)

  - BootSequence component: Framer Motion + monospace typewrite\
  - Skip behavior, "seen before" cookie to shorten on return visits\
  - Reduced-motion variant: static identity card, no typewrite

  Exit criteria: boot feels right on 320px and 1920px alike.

  Phase 4 — Intelligence Graph (Days 21–34)\
  \
  - R3F + Drei scaffold inside the Canvas provider\
  - Graph data file, pre-computed positions, types\
  - Static render: nodes + edges visible\
  - Inspector HUD, hover/focus interactions\
  - Pulse shader on active edges\
  - Camera focus rig\
  - Filter rail, ⌘K integration\
  - 2D fallback for md and below (real fallback, not "view on desktop")\
  - Reduced-motion poster

  Exit criteria: graph is information-dense, navigable by keyboard, runs at 60fps on the M1 baseline.

  Phase 5 — Choreography (Days 35–42)

  - GSAP scroll choreography across sections\
  - Section pin/release, cross-section transitions\
  - Micro-interactions audit (every hover, focus, tap)\
  - Optional ambient sound (off by default, toggle in StatusBar)

  Phase 6 — Hardening (Days 43–50)

  - A11y audit (axe + manual screen-reader pass with VoiceOver)\
  - Keyboard navigation full pass\
  - Performance pass against budgets (Phase 8 targets)\
  - SEO + per-page metadata + dynamic OG images\
  - Privacy-respecting analytics (Plausible or self-hosted Umami)\
  - Error boundaries, 404, 500 pages styled

  Phase 7 — Soft launch (Days 51–56)

  - Share with 5 trusted reviewers, collect feedback\
  - Fix what hurts\
  - Submit to Awwwards, Godly, SiteInspire

  Cross-cutting (every phase)

  - Visual regression snapshots on every PR (Playwright)\
  - Lighthouse CI gate on every PR (perf ≥ 95, a11y = 100)\
  - Bundle analyzer in CI; fail if home bundle &gt; 120KB gz\
  - Content lints: every MDX must have title, summary, status, dates

  ---\
  Assumptions I made — flag any to revisit

  1\. Dark mode is primary, light is fully designed but secondary.\
  2. Single signal color is non-negotiable (this is the biggest "feel" lever).\
  3. Pre-computed graph layout over live force simulation (stability &gt; novelty).\
  4. No login / no CMS — content is MDX in the repo.\
  5. Geist + Instrument Serif font choice — free, distinctive, defensible. If you have a license budget, we could substitute Söhne or NB International for the display face.\
  6. 8-week solo timeline — compressible to 5 weeks if we drop the GSAP choreography in Phase 5 and ship the graph as v1.1.

  ---\
  What I'd build first if you said "start now"\
  \
  Phase 0 + 1 only. Get the chrome, tokens, fonts, and /manifest page perfect — that's where the voice of the lab is set. Everything else is downstream of that voice being right.

  Want me to start scaffolding Phase 0, or would you like to react to anything above first?