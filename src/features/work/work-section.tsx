import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { Project } from "@/data/project";

import WorkArchive from "./work-archive/work-archive";
import WorkFeatured from "./work-featured/work-featured";

type Props = {
  featuredHeader: SectionHeaderContent;
  archiveHeader: SectionHeaderContent;
  projects: Project[];
  featuredProjectsCount: number;
};

export default function WorkSection({
  featuredHeader,
  archiveHeader,
  projects,
  featuredProjectsCount
}: Props) {
  const featuredProjects = projects.slice(0, featuredProjectsCount);
  return (
    <>
      <WorkFeatured header={featuredHeader} projects={featuredProjects} />
      <WorkArchive header={archiveHeader} projects={projects} />
    </>
  );
}
