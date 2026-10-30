import SwirlGradientBackground from "@/components/backgrounds/shaders/swirl-gradient";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";

import Section from "@/components/layout/section/section";
import Clock from "@/components/ui/clock/clock";
import HighlightText from "@/components/ui/highlight-text/highlight-text";
import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import SectionHeader from "@/components/ui/section-header/section-header";
import type { LogoContent, VideoContent } from "@/types/common";
import styles from "./styles.module.css";

// import Logos from "./logos/logos";

type Props = {
    location: string;
    timezone: string;
    coordinates: string;
    header: SectionHeaderContent;
    video?: VideoContent;
    logos: LogoContent[];
};

export default function IntroSection({ header, location, timezone, coordinates }: Props) {
    // const container = useRef<HTMLDivElement | null>(null);

    // useGSAP(() => {

    //   const heroText = new SplitType(".home h1", { types: "chars" })
    //   gsap.set(heroText.chars, {y: 400})
    //   gsap.to(heroText.chars, {
    //     y: 0,
    //     duration: 1,
    //     stagger: 0.075,
    //     ease: "power4.out",
    //     delay: 1
    //   })

    // }, {scope: container})

    return (
        <>
            <Section
                padStart="spacious"
                padEnd="normal"
                id="index"
                vh
                valign="space-between"
                theme="inverse"
            >
                <Section.Background>
                    <SwirlGradientBackground
                        darkColor="#03060d"
                        midColor="#091970"
                        highlightColor="#4332FF"
                    />
                </Section.Background>
                <Grid colGap="normal" rowGap="normal">
                    {header.body?.blocks.map((block) => (
                        <GridItem key={block} md="span 1" className={styles.body}>
                            <p>
                                <HighlightText text={block} className={styles.bodyAlt} />
                            </p>
                        </GridItem>
                    ))}
                    <GridItem md="span 1" className={`${styles.body} ${styles.details}`}>
                        <p>
                            Based in {location.split(",")[0]}
                            <br />
                            <Clock location={location} timezone={timezone} useTimeOnly />
                        </p>
                    </GridItem>
                    <GridItem md="span 1" className={`${styles.body} ${styles.details}`}>
                        <p>
                            <HighlightText text={coordinates} className={styles.bodyAlt} />
                        </p>
                    </GridItem>
                </Grid>
                {header.title && (
                    <SectionHeader
                        title={header.title}
                        titleShift={header.titleShift}
                        titleLimit={header.titleLimit}
                        titleScale={header.titleScale}
                        indentFirstLine={header.indentFirstLine}
                    />
                )}
            </Section>
            {/* <Logos logos={logos} /> */}
        </>
    );
}
