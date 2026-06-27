import meta from "@/data/meta";
import intro from "@/data/intro";
import work from "@/data/work";
import { getFeaturedProjects } from "@/data/project";
import services from "@/data/services";
import wow from "@/data/wow";
import about from "@/data/about";

import HomeClient from "./client";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  return (
    <HomeClient
      meta={meta}
      intro={intro}
      work={{...work, projects: projects }}
      services={services}
      wow={wow}
      about={about}
    />
  );
}
