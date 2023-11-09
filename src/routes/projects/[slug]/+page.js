import { error } from '@sveltejs/kit';
import { projects } from '../../../data';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    for (let i = 0; i < projects.length; i++) {
        if (params.slug === projects[i].info.path) {
            return {
                info: projects[i].info,
                preview: projects[i].preview,
                content: projects[i].content,
                id: i,
            };
        }
    }
	throw error(404, 'Not found');
}