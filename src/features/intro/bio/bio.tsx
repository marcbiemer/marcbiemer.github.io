import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import styles from "./styles.module.css";

type Props = {
    hero?: string;
    body: string[];
};

export default function BioSection({ hero, body }: Props) {
    return (
        <Section pad="spacious" valign="center">
            {/* <Section.Background color="neutral-muted"></Section.Background> */}
            <Grid rowGap="spacious" className={styles.intro}>
                <GridItem md="1 / span 3" className={styles.headline}>
                    <p>{hero}</p>
                </GridItem>
                <GridItem lg="2 / span 3" className={styles.textWrapper}>
                    {body.map((block) => (
                        <p key={block}>{block}</p>
                    ))}
                </GridItem>
            </Grid>
        </Section>
    );
}
