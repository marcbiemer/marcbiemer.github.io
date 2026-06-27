import about from "@/data/about";
import intro from "@/data/intro";
import meta from "@/data/meta";
import { FEATURED_PROJECTS_COUNT, getFeaturedProjects } from "@/data/project";
import services from "@/data/services";
import work from "@/data/work";
import wow from "@/data/wow";

import HomeClient from "./client";

export default async function HomePage() {
    const projects = await getFeaturedProjects();
    return (
        <HomeClient
            meta={meta}
            intro={intro}
            work={{
                ...work,
                projects: projects,
                featuredProjectsCount: FEATURED_PROJECTS_COUNT,
            }}
            services={services}
            wow={wow}
            about={about}
        />
    );
}
