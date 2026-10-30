import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import type { ContentItem, CVSegment, WorkItem } from "@/data/cv";
import { renderSubtitle, renderTitle, type SectionKey } from "./renderers";
import styles from "./styles.module.css";

type Props = {
    segments: CVSegment[];
};

export default function CVSegments({ segments }: Props) {
    return (
        <>
            {segments.map((segment) => (
                <Segment {...segment} key={segment.id} />
            ))}
        </>
    );
}

function Segment({ type, id, label, content }: CVSegment) {
    return (
        <Section padStart="condensed" padEnd="spacious" id={id} gap="spacious" theme="default">
            <Grid rowGap="normal">
                <GridItem md="1 / span 1" className={styles.labelWrapper}>
                    <h2 className={styles.label}>{label}</h2>
                </GridItem>
                <ul className={styles.list}>
                    {content.map((item, index) => (
                        <SegmentItem
                            key={`${item.title}--${index.toString()}`}
                            item={item}
                            type={type}
                        />
                    ))}
                </ul>
            </Grid>
        </Section>
    );
}

function SegmentItem({ type, item }: { type: SectionKey; item: WorkItem | ContentItem }) {
    const title = renderTitle[type] as (item: WorkItem | ContentItem) => React.ReactNode;
    const sub = renderSubtitle[type] as (item: WorkItem | ContentItem) => React.ReactNode;

    return (
        <li className={styles.item}>
            <GridItem md="1 / span 1">
                <span className={styles.year}>{item.year}</span>
            </GridItem>
            <GridItem md="2 / span 2" className={styles.textStack}>
                <h3 className={styles.itemTitle}>{title(item)}</h3>
                <p className={styles.itemSubTitle}>{sub(item)}</p>
            </GridItem>
        </li>
    );
}
