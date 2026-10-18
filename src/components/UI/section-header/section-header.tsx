import type { SizeToken } from "@/types/common";

import styles from "./styles.module.css";

import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import HighlightText from "../highlight-text/highlight-text";

type BodyContent = {
  blocks: string[];
  className?: string;
};

export type SectionHeaderContent = {
  layout?: "col" | "row";
  hasMarker?: boolean;
  sectionTitle?: string;
  supTitle?: string;
  title?: string;
  titleLimit?: boolean;
  titleShift?: 0 | 1 | 2 | 3;
  titleScale?: SizeToken
  indentFirstLine?: boolean;
  subTitle?: string;
  body?: BodyContent;
  className?: string;
};

const titleShiftMap = [
  ["1 / span 2", "1 / span 3"],
  ["2 / span 3", "2 / span 3"],
  ["3 / span 2", "3 / span 2"],
  ["1 / -1", "1 / -1"],
];

export default function SectionHeader({
  layout = "col",
  hasMarker = false,
  sectionTitle,
  supTitle,
  title,
  titleLimit = false,
  titleShift = 0,
  titleScale = "medium",
  indentFirstLine = false,
  subTitle,
  body,
  className,
}: SectionHeaderContent) {
  const hasSectionTitleOrMarker = sectionTitle || hasMarker;
  return (
    <Grid rowGap="normal" className={className}>
      {hasSectionTitleOrMarker && (
        <GridItem
          className={styles.sectionTitleStack}
          md={titleShift != 0 ? "1 / span 1" : "1 / -1"}
        >
          {hasMarker && <span className={styles.marker}></span>}
          {sectionTitle && (
            <h1 className={styles.sectionTitle}>{sectionTitle}</h1>
          )}
        </GridItem>
      )}
      <GridItem
        md={titleShiftMap[titleShift][0]}
        lg={titleShiftMap[titleShift][1]}
        className={styles.titleStack}
      >
        {supTitle && <span className={styles.supTitle}>{supTitle}</span>}
        {title && (
          <h2
            className={styles.title}
            data-width-limit={titleLimit}
            data-title-scale={titleScale}
            data-title-indent={indentFirstLine}
          >
            <HighlightText text={title} className={styles.titleAlt} />
          </h2>
        )}
        {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
      </GridItem>

      {body && body.blocks && (
        <GridItem
          className={styles.bodyStack}
          md={layout === "row" ? "4 / span 1" : "1 / span 2"}
        >
          {body.blocks.map((block, index) => (
            <p key={index} className={styles.body}>
              <HighlightText
                text={block}
                className={`${body.className} ${styles.bodyAlt}`}
              />
            </p>
          ))}
        </GridItem>
      )}
    </Grid>
  );
}
