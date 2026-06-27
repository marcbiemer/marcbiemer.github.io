"use client";

// TYPES
import type { Meta } from "@/data/meta";
import type { Intro } from "@/data/intro";
import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { Project } from "@/data/project";
import type { Services } from "@/data/services";
import type { WoW } from "@/data/wow";
import type { About } from "@/data/about";

// STYLES / ANIMAITONS
// import styles from "./page.module.css";
import { useEffect } from "react";

// COMPONENTS
import IntroSection from "@/features/intro/intro-section";
import WorkSection from "@/features/work/work-section";
import ServicesSection from "@/features/services/services-section";
import WOWSection from "@/features/wow/wow-section";
import AboutSection from "@/features/about/about-section";
// import FAQSection from "@/features/faq/faq-section";
import ContactSection from "@/features/contact/contact-section";

export default function HomeClient({
  meta,
  intro,
  work,
  services,
  wow,
  about,
}: {
  meta: Meta;
  intro: Intro;
  work: {
    featured: SectionHeaderContent;
    archive: SectionHeaderContent;
    projects: Project[];
  };
  services: Services;
  wow: WoW;
  about: About;
}) {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  return (
    <>
      <IntroSection {...intro} {...meta} />
      <WorkSection
        featuredHeader={work.featured}
        archiveHeader={work.archive}
        projects={work.projects}
      />
      <ServicesSection {...services} />
      <WOWSection {...wow} />
      <AboutSection {...about} />
      {/* <FAQSection /> */}
      <ContactSection />
    </>
  );
}
