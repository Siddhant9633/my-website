export type CommandItem = {
  id: string
  label: string
  href: string
  group: "Pages" | "Systems" | "Lab"
  keywords?: string[]
}

export const commandItems: CommandItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    group: "Pages",
    keywords: ["boot", "graph", "index"],
  },
  {
    id: "manifest",
    label: "Manifest",
    href: "/manifest",
    group: "Pages",
    keywords: ["principles", "founding", "how i build"],
  },
  {
    id: "systems",
    label: "Systems",
    href: "/systems",
    group: "Pages",
    keywords: ["projects", "built", "shipped"],
  },
  {
    id: "lab",
    label: "Research Lab",
    href: "/lab",
    group: "Pages",
    keywords: ["experiments", "research", "notes"],
  },
  {
    id: "evolution",
    label: "Evolution",
    href: "/evolution",
    group: "Pages",
    keywords: ["timeline", "history", "milestones"],
  },
  {
    id: "now",
    label: "Now",
    href: "/now",
    group: "Pages",
    keywords: ["current", "working on", "this week"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    group: "Pages",
    keywords: ["email", "reach", "schedule"],
  },
  {
    id: "system-rag-engine",
    label: "rag-engine",
    href: "/systems",
    group: "Systems",
    keywords: ["retrieval", "rag", "active"],
  },
  {
    id: "system-agent-mesh",
    label: "agent-mesh",
    href: "/systems",
    group: "Systems",
    keywords: ["agents", "multi-agent", "active"],
  },
  {
    id: "lab-memory",
    label: "Memory across multi-step agent runs",
    href: "/lab",
    group: "Lab",
    keywords: ["hypothesis", "agents", "memory"],
  },
  {
    id: "lab-reranking",
    label: "Reranking with cross-encoder vs LLM judge",
    href: "/lab",
    group: "Lab",
    keywords: ["retrieval", "concluded", "reranker"],
  },
]

export const commandGroups = ["Pages", "Systems", "Lab"] as const
