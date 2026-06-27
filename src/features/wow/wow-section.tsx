"use client";

import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { ProcessItem } from "@/data/wow";

import styles from "./styles.module.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

import Section from "@/components/layout/section/section";
import SectionHeader from "@/components/ui/section-header/section-header";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import InteractiveGradient from "@/components/backgrounds/shaders/interactive-gradient";
import ProcessTile from "@/components/ui/tile/process-tile/process-tile";

type Props = {
  header: SectionHeaderContent;
  process: ProcessItem[];
};

const palettes = [
  { colorA: "#3a1fe0", colorB: "#3a1fe0" },
  { colorA: "#3a1fe0", colorB: "#3a1fe0" },
  { colorA: "#3a1fe0", colorB: "#3a1fe0" },
  { colorA: "#3a1fe0", colorB: "#3a1fe0" },
  { colorA: '#cfd9df', colorB: '#e2ebf0' },
];

export default function WOWSection({ header, process }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".wowCard");
      if (cards.length === 0) return;

      gsap.from(cards, {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [process]);

  return (
    <Section
      pad="spacious"
      id="ways-of-working"
      gap="spacious"
      vh
      valign="center"
      theme="default"
    >
      <Section.Background color="accent" />
      <SectionHeader {...header} className={styles.intro} />
      <div ref={gridRef} className={styles.grid}>
        <Grid className={styles.wow} rowGap="condensed" colGap="condensed">
          {process.map((step, index) => (
            <GridItem md="span 2" lg="span 1" key={index}>
              <div className={`${styles.card} wowCard`}>
                <ProcessTile range={process.length} index={index} step={step}>
                  <ProcessTile.Background color="default">
                    <InteractiveGradient
                      colorA={palettes[index].colorA}
                      colorB={palettes[index].colorB}
                      bgColor="#FCFCFC"
                      // "#444248"
                    />
                  </ProcessTile.Background>
                </ProcessTile>
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
