import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";

import Section from "@/components/layout/section/section";
import ResponsiveImage from "@/components/media/image/responsive-image";
import HighlightText from "@/components/ui/highlight-text/highlight-text";
import { TextLink } from "@/components/ui/link/text-link/text-link";
import SectionHeader from "@/components/ui/section-header/section-header";
import type { About } from "@/data/about";
import styles from "./styles.module.css";

export default function AboutSection({ header, content, img }: About) {
    return (
        <Section pad="spacious" id="about" vh gap="spacious" valign="space-between" theme="default">
            <SectionHeader {...header} />
            <Grid rowGap="spacious" colGap="spacious">
                <GridItem md="1 / span 2" className={styles.leftPane}>
                    <div className={styles.textStack}>
                        {content.body.map((block) => (
                            <p className={styles.body} key={block}>
                                <HighlightText className={styles.bodyAlt} text={block} />
                            </p>
                        ))}
                    </div>
                    <TextLink href="/cv" arrow className={styles.link}>
                        View full CV
                    </TextLink>
                </GridItem>
                <GridItem md="3 / span 2" lg="4 / span 1" className={styles.imgWrapper}>
                    <ResponsiveImage
                        section="about"
                        project="portrait"
                        img={img}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                </GridItem>
            </Grid>
        </Section>
    );
}
