import raw from '../../public/content/sections/cv.json'
import type { SectionHeaderContent } from '@/components/ui/section-header/section-header'
import type { ImageContent } from '@/types/common'

export type WorkItem = {
	year: string
	type?: string
	title: string
	institution: string
	location: string
	link?: string
}

export type ContentItem = {
	year: string
	type?: string
	title: string
	event?: { title: string, link?: string }
	institution?: string
	location: string
	detail?: string
	recording?: string
}

export type CVSegmentType = 'professionalExperience' | 'selectedWork' | 'education' | 'talks' | 'lectures' | 'professionalService' | 'collaborations'

export type CVSegment = {
	type: CVSegmentType,
	id: string,
	label: string,
	content: WorkItem[] | ContentItem[]
}

export type CV = {
	header: SectionHeaderContent
	img: ImageContent
	segments: CVSegment[]
}

const cv = raw as CV

if (process.env.NODE_ENV === 'development') {
	if (!cv.header) console.warn('cv.json: missing section header')
	if (!cv.img) console.warn('cv.json: missing img')
	if (!cv.segments) console.warn('cv.json: missing cv segments')
	if (!Array.isArray(cv.segments)) console.warn('cv.json: cv segments should be an array')
}

export default cv