import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@/data/project";
import ProjectClient from "./client";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return { title: "Not found" };

    return {
        title: project.title,
        description: project.intro,
        openGraph: {
            title: project.title,
            description: project.intro,
            images: [`/og/${project.slug}/og-image.jpg`],
        },
    };
}

export function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return notFound();

    return <ProjectClient project={project} />;
}
