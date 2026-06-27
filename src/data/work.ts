import raw from '../../public/content/sections/work.json'
import type { SectionHeaderContent } from '@/components/ui/section-header/section-header'

export type Work = {
	header: SectionHeaderContent
	featured: SectionHeaderContent
	archive: SectionHeaderContent
}

const work = raw as Work

if (process.env.NODE_ENV === 'development') {
	if (!work.header) console.warn('work.json: missing section header content')
	if (!work.featured) console.warn('work.json: missing section featured content')
	if (!work.archive) console.warn('work.json: missing section archive content')
}

export default work