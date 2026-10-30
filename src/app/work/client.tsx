"use client";

import { useState } from "react";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import { Button } from "@/components/ui/button/button";
import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { Project } from "@/data/project";
import ContactSection from "@/features/contact/contact-section";
import ProjectsGrid from "@/features/work/projects-grid/projects-grid";
import ProjectsList from "@/features/work/projects-list/projects-list";
import styles from "./page.module.css";

export default function WorkClient({
    header,
    projects,
}: {
    header: SectionHeaderContent;
    projects: Project[];
}) {
    const [view, setView] = useState<"grid" | "list">("grid");

    return (
        <>
            <Section pad="spacious" gap="normal" vh className={styles.section} theme="default">
                <Grid rowGap="normal">
                    <GridItem md="1 / span 2" className={styles.title}>
                        <h1>{header.title}</h1>
                    </GridItem>
                    <GridItem md="3 / span 2" className={styles.toggle}>
                        <Button
                            label="Grid"
                            size="medium"
                            variant="secondary"
                            icon={{ iconName: "grid_view" }}
                            iconPos="start"
                            onClick={() => setView("grid")}
                            disabled={view === "grid"}
                        />
                        <Button
                            label="List"
                            size="medium"
                            variant="secondary"
                            icon={{ iconName: "menu" }}
                            iconPos="start"
                            onClick={() => setView("list")}
                            disabled={view === "list"}
                        />
                    </GridItem>
                </Grid>
                {view === "grid" ? (
                    <ProjectsGrid projects={projects} />
                ) : (
                    <ProjectsList projects={projects} showImage />
                )}
            </Section>
            <ContactSection />
        </>
    );
}
