import raw from '../../public/content/sections/faq.json'
import type { SectionHeaderContent } from '@/components/ui/section-header/section-header'

export type FAQ = {
	header: SectionHeaderContent
	content: { question: string, answer: string }[]
}

const faq = raw as FAQ

if (process.env.NODE_ENV === 'development') {
	if (!faq.header) console.warn('faq.json: missing header')
	if (!faq.content) console.warn('faq.json: missing questions')
	if (!Array.isArray(faq.content)) console.warn('faq.json: questions should be an array')
}

export default faq