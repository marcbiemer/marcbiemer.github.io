import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { ImageContent } from "@/types/common";

import styles from "./styles.module.css";

import Section from "@/components/layout/section/section";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import HighlightText from "@/components/ui/highlight-text/highlight-text";
import ResponsiveImage from "@/components/media/image/responsive-image";

type Props = {
  header: SectionHeaderContent;
  img: ImageContent;
};

export default function CVHero({ header, img }: Props) {
  // const container = useRef<HTMLDivElement | null>(null)

  // useGSAP(() => {

  //     const text = new SplitType(".info p", {
  //         types: "lines",
  //         tagName: 'div',
  //         lineClass: 'line'
  //     })

  //     text.lines?.forEach((line) => {
  //         const content = line.innerHTML
  //         line.innerHTML = `<span>${content}</span>`
  //     })

  //     gsap.set('.info p .line span', {
  //         y: 400,
  //         display: 'block'
  //     })

  //     gsap.to('.info p .line span', {
  //         y: 0,
  //         duration: 2,
  //         stagger: 0.075,
  //         ease: "power4.out",
  //         delay: 0.25
  //     })

  //     return () => {
  //         if (text) text.revert()
  //     }

  // }, {scope: container})
  return (
    <Section pad="spacious" theme="default">
      <Grid rowGap="spacious">
        {header.sectionTitle && (
          <GridItem
            base="1 / -1"
            md="2 / span 1"
            className={styles.sectionTitle}
          >
            <span>
              <HighlightText
                text={header.sectionTitle}
                className={styles.titleAlt}
              />
            </span>
          </GridItem>
        )}
        <GridItem
          base="1 / -1"
          md="3 / span 2"
          lg="4 / span 1"
          className={styles.imgWrapper}
        >
          <ResponsiveImage section="about" project="portrait" img={img} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" loading="eager" />
        </GridItem>
        {header.title && (
          <GridItem md="2 / span 1" className={styles.title}>
            <h1>
              <HighlightText text={header.title} className={styles.titleAlt} />
            </h1>
          </GridItem>
        )}
        {header.subTitle && (
          <GridItem md="3 / span 1" className={styles.subTitle}>
            <h2>
              <HighlightText
                text={header.subTitle}
                className={styles.titleAlt}
              />
            </h2>
          </GridItem>
        )}
        <GridItem md="4 / span 1" className={styles.body}>
          {header.body?.blocks.map((block, index) => (
            <p key={index}>
              <HighlightText text={block} className={styles.bodyAlt} />
            </p>
          ))}
        </GridItem>
      </Grid>
    </Section>
  );
}
