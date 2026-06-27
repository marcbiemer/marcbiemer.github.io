import work from "@/data/work";
import { getAllProjects } from "@/data/project";
import WorkClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of interactive, data-driven, and immersive works created for cultural, commercial, and experimental contexts.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return <WorkClient {...work} projects={projects} />;
}
