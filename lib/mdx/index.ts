import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { System, Experiment } from "@/types/content"

const SYSTEMS_DIR = path.join(process.cwd(), "content/systems")
const LAB_DIR = path.join(process.cwd(), "content/lab")

async function parseMDX(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8")
  return matter(raw)
}

export async function getAllSystems(): Promise<System[]> {
  const files = await fs.readdir(SYSTEMS_DIR)
  const systems = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const { data } = await parseMDX(path.join(SYSTEMS_DIR, file))
        return data as System
      })
  )
  return systems.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
}

export async function getSystemBySlug(
  slug: string
): Promise<{ frontmatter: System; content: string } | null> {
  const files = await fs.readdir(SYSTEMS_DIR)
  for (const file of files.filter((f) => f.endsWith(".mdx"))) {
    const { data, content } = await parseMDX(path.join(SYSTEMS_DIR, file))
    if (data.slug === slug) {
      return { frontmatter: data as System, content }
    }
  }
  return null
}

export async function getAllExperiments(): Promise<Experiment[]> {
  const files = await fs.readdir(LAB_DIR)
  const experiments = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const { data } = await parseMDX(path.join(LAB_DIR, file))
        return data as Experiment
      })
  )
  return experiments.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
}

export async function getExperimentBySlug(
  slug: string
): Promise<{ frontmatter: Experiment; content: string } | null> {
  const files = await fs.readdir(LAB_DIR)
  for (const file of files.filter((f) => f.endsWith(".mdx"))) {
    const { data, content } = await parseMDX(path.join(LAB_DIR, file))
    if (data.slug === slug) {
      return { frontmatter: data as Experiment, content }
    }
  }
  return null
}
