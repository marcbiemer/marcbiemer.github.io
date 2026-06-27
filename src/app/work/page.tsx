import type { Metadata } from "next";
import { getAllProjects } from "@/data/project";
import work from "@/data/work";
import WorkClient from "./client";

export const metadata: Metadata = {
    title: "Work",
    description:
        "A selection of interactive, data-driven, and immersive works created for cultural, commercial, and experimental contexts.",
};

export default async function WorkPage() {
    const projects = await getAllProjects();
    return <WorkClient {...work} projects={projects} />;
}
