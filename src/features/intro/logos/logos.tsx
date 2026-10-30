import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";

import Section from "@/components/layout/section/section";
import type { LogoContent } from "@/types/common";
import styles from "./styles.module.css";

export default function Logos({ logos }: { logos: LogoContent[] }) {
    return (
        <Section pad="condensed">
            <Grid rowGap="condensed" className={styles.logos}>
                {logos.map((logo) => (
                    <GridItem key={logo.label} base="span 3" md="span 2" lg="span 1">
                        <Logo logo={logo} />
                    </GridItem>
                ))}
            </Grid>
        </Section>
    );
}

function Logo({ logo }: { logo: LogoContent }) {
    return <div className={styles.logo}>{logo.label}</div>;
}
