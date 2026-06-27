import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import CursorFollower from "@/components/ui/cursor-follower/cursor-follower";
import EmblaCarousel from "@/components/ui/embla-carousel/embla-carousel";
import HighlightText from "@/components/ui/highlight-text/highlight-text";
import { AppLink } from "@/components/ui/link/app-link/app-link";
import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import SectionHeader from "@/components/ui/section-header/section-header";
import type { Project } from "@/data/project";
import styles from "./styles.module.css";

type WorkFeaturedProps = {
    header: SectionHeaderContent;
    projects: Project[];
};

export default function WorkFeatured({ header, projects }: WorkFeaturedProps) {
    return (
        <Section gap="spacious" padStart="spacious" padEnd="none" vh theme="default">
            <SectionHeader {...header} />
            {projects.map((feature, index) => (
                <ProjectFeature
                    {...feature}
                    index={index}
                    key={`${feature.id}-${index.toString()}`}
                />
            ))}
        </Section>
    );
}

type ProjectFeatureProps = Project & {
    index: number;
};

function ProjectFeature({ slug, title, year, intro, tags, images, index }: ProjectFeatureProps) {
    return (
        <AppLink href={`/work/${slug}`} className={styles.link}>
            <EmblaCarousel project={slug} slides={images} options={{ loop: true, axis: "x" }} />
            <Grid className={styles.info} rowGap="condensed">
                <GridItem md="1 / span 1" className={styles.idStack}>
                    <span className={styles.id}>{`0${index + 1}`}</span>
                </GridItem>
                <GridItem md="2 / span 1" className={styles.textStack}>
                    <h1 className={styles.title}>{title}</h1>
                    {intro && (
                        <p className={styles.intro}>
                            <HighlightText text={intro} />
                        </p>
                    )}
                </GridItem>
                <GridItem md="4 / span 1" className={styles.tagStack}>
                    <span className={styles.year}>{year}</span>
                    <ul className={styles.tags}>
                        {tags.map((tag) => (
                            <li key={tag} className={styles.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </GridItem>
            </Grid>
            <CursorFollower>View Project</CursorFollower>
        </AppLink>
    );
}
