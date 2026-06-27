import content from "@/data/content"
import ProjectClient from "./client";

export function generateStaticParams() {
    return content.projects.map((project) => ({
      slug: project.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = content.projects.find((p) => p.slug === slug);

    if (!project) return <div>Project not found</div>;

    return <ProjectClient project={project} />;
}