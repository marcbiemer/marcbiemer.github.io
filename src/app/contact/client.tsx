"use client";

import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { FormContent } from "@/types/common";

import styles from "./page.module.css";

// import { useRef } from "react"
// import { useGSAP } from "@gsap/react";
// import { gsap } from "@/lib/gsap";

import Section from "@/components/layout/section/section";
import SectionHeader from "@/components/ui/section-header/section-header";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Form from "@/components/ui/form/form";

type Props = {
  header: SectionHeaderContent;
  contactForm: FormContent;
  location: string;
  timezone: string;
};

export default function ContactClient({
  header,
  contactForm,
}: Props) {
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
    <Section pad="spacious" gap="normal" vh valign="center" theme="default">
      <Section.Background color="accent" />
      <SectionHeader {...header} className={styles.header} />
      <Grid rowGap="normal">
        <GridItem md="2 / span 2" className={styles.formWrapper}>
          <Form {...contactForm} />
        </GridItem>
      </Grid>
    </Section>
  );
}
