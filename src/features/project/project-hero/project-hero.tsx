import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";

import Section from "@/components/layout/section/section";
import ResponsiveImage from "@/components/media/image/responsive-image";
import type { Project } from "@/data/project";
import styles from "./styles.module.css";

export default function ProjectHero({ slug, images, title, year, intro }: Project) {
    return (
        <Section theme="inverse" padStart="spacious" className={styles.hero} valign="end">
            <Section.Background color="default">
                <div className={styles.cover}>
                    <ResponsiveImage project={slug} img={images[0]} />
                </div>
            </Section.Background>
            <Grid rowGap="normal">
                <GridItem className={styles.title}>
                    <span>PROJECT | {year}</span>
                    <h1>{title}</h1>
                    <p>{intro}</p>
                </GridItem>
            </Grid>
        </Section>
    );
}
