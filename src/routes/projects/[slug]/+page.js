import { error } from '@sveltejs/kit';
import { projects } from '../../../data';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    for (let i = 0; i < projects.length; i++) {
        if (params.slug === projects[i].info.path) {
            let prevProject = (i === 0 ? projects.length-1 : i-1);
            let nextProject = (i === projects.length-1 ? 0 : i+1);
            let upProject = (nextProject === projects.length-1 ? 0 : nextProject+1)
            return {
                info: projects[i].info,
                preview: projects[i].preview,
                content: projects[i].content,
                id: i,
                previews: [
                    {
                        id: prevProject,
                        info: projects[prevProject].info,
                        preview: projects[prevProject].preview,
                    },
                    {
                        id: nextProject,
                        info: projects[nextProject].info,
                        preview: projects[nextProject].preview,
                    },
                    {
                        id: upProject,
                        info: projects[upProject].info,
                        preview: projects[upProject].preview,
                    },
                ],
            };
        }
    }
	throw error(404, 'Not found');
}