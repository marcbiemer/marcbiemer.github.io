"use client";

import type { Project } from "@/data/project";

import styles from "./page.module.css";

import Section from "@/components/layout/section/section";
import ProjectHero from "@/features/project/project-hero/project-hero";
import BlockRenderer from "@/components/layout/blocks/block-renderer";
// import ProjectNav from "@/features/works/project/ProjectNav/ProjectNav";
import ContactSection from "@/features/contact/contact-section";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import ProjectStats from "@/features/project/project-stats/project-stats";

type Props = {
  project: Project;
};

export default function ProjectClient({ project }: Props) {
  return (
    <>
      <article>
        <ProjectHero {...project} />
        <Section gap="normal" theme="default">
          <Grid rowGap="normal">
            <GridItem md="1 / span 1" className={styles.sidebarWrapper}>
              <div className={styles.sidebar}>
                <ProjectStats title={project.title} tags={project.tags} stats={project.stats} />
              </div>
            </GridItem>
            <GridItem md="2 / span 3">
              <BlockRenderer slug={project.slug} blocks={project.blocks} />
            </GridItem>
          </Grid>
        </Section>
      </article>
      {/* <ProjectNav
        images={project.images}
        links={[`/works/${project.slug}`,`/works/${ project.slug}`]}
      /> */}
      <ContactSection />
    </>
  );
}
