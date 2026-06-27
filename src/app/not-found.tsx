"use client";

import Section from "@/components/layout/section/section";
import SectionHeader from "@/components/ui/section-header/section-header";
import SwirlGradientBackground from "@/components/backgrounds/shaders/swirl-gradient";

export default function NotFound() {
  return (
    <Section vh valign="end" theme="inverse">
      <Section.Background>
        <SwirlGradientBackground
          darkColor="#03060d"
          midColor="#091970"
          highlightColor="#4332FF"
        />
      </Section.Background>
      <SectionHeader
        layout="row"
        hasMarker
        sectionTitle="404"
        title="[Whoops... ]{br}It looks like this page does not exist"
        titleScale="large"
        titleLimit
      />
    </Section>
  );
}
