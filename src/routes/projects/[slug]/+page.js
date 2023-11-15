import { error } from '@sveltejs/kit';
import { projects } from '../../../data';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    for (let i = 0; i < projects.length; i++) {
        if (params.slug === projects[i].info.path) {
            let nextProject = (i === projects.length-1 ? 0 : i+1);
            let prevProject = (i === 0 ? projects.length-1 : i-1);
            return {
                info: projects[i].info,
                preview: projects[i].preview,
                content: projects[i].content,
                id: i,
                nav: {
                    prev: {
                        title: projects[prevProject].info.title,
                        path: projects[prevProject].info.path,
                        preview: projects[prevProject].preview,
                    },
                    next: {
                        title: projects[nextProject].info.title,
                        path: projects[nextProject].info.path,
                        preview: projects[nextProject].preview,
                    },
                },
            };
        }
    }
	throw error(404, 'Not found');
}