import raw from '../../public/content/sections/about.json'
import type { SectionHeaderContent } from '@/components/ui/section-header/section-header'
import type { TextContent, ImageContent } from '@/types/common'

export type About = {
	header: SectionHeaderContent
	content: TextContent
	img: ImageContent
}

const about = raw as About

if (process.env.NODE_ENV === 'development') {
	if (!about.header) console.warn('about.json: missing section header')
	if (!about.content) console.warn('about.json: missing content')
	if (!about.img) console.warn('about.json: missing image')
}

export default about