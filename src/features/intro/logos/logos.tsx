import type { Logo } from "@/types/common";

import styles from "./styles.module.css";

import Section from "@/components/layout/section/section";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";

export default function Logos({ logos }: { logos: Logo[] }) {
  return (
    <Section pad="condensed">
      <Grid rowGap="condensed" className={styles.logos}>
        {logos.map((logo, index) => (
          <GridItem key={index} base="span 3" md="span 2" lg="span 1">
            <Logo logo={logo} />
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
}

function Logo({ logo }: { logo: Logo }) {
  return <div className={styles.logo}>{logo.label}</div>;
}
