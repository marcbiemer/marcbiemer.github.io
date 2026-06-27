import raw from '../../public/content/sections/contact.json'
import type { SectionHeaderContent } from '@/components/ui/section-header/section-header'
import type { FormContent } from '@/types/common'

export type Contact = {
	header: SectionHeaderContent
	teaser: SectionHeaderContent
	contactForm: FormContent
}

const contact = raw as Contact

if (process.env.NODE_ENV === 'development') {
	if (!contact.header) console.warn('contact.json: missing section header')
	if (!contact.teaser) console.warn('contact.json: missing section teaser')
	if (!contact.contactForm) console.warn('contact.json: missing contact form')
}

export default contact