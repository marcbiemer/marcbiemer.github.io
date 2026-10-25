import { readdirSync } from 'fs'
import { join } from 'path'

import type { Block } from '@/components/layout/blocks/block-renderer'
import { ImageContent } from '@/types/common'

export const FEATURED_PROJECTS_COUNT = 3;

export const featuredSlugs = [
	"pixlar-o-ljud-live-2",
	"pixlar-o-ljud-live-1",
	"oresund-in-motion",
	"spark",
	"data-portraits-konsthall",
	"curvature",
	"data-portraits-futurice",
	// "talking-portraits"
] as const

export type ProjectStat = {
	label: string
	value: string | string[]
}

export type Project = {
	slug: string
	id: number
	title: string
	year: string
	stats: ProjectStat[]
	intro: string
	tags: string[]
	images: ImageContent[]
	blocks: Block[]
}

export function getProjectSlugs(): string[] {
	const dir = join(process.cwd(), 'public/content/projects')
	return readdirSync(dir).map((file: string) => file.replace('.json', ''))
}

export async function getProject(slug: string): Promise<Project | null> {
	try {
		const data = await import(`../../public/content/projects/${slug}.json`)
		return data.default as Project
	} catch {
		return null
	}
}

export async function getAllProjects(): Promise<Project[]> {
	const slugs = getProjectSlugs();
	const projects = await Promise.all(slugs.map((slug) => getProject(slug)))
	return projects
		.filter((p): p is Project => p !== null)
		.sort((a, b) => a.id - b.id)
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getAllProjects()
	const bySlug = new Map(projects.map((p) => [p.slug, p]))

	return featuredSlugs
		.map((slug) => bySlug.get(slug))
		.filter((p): p is Project => p !== undefined)
}