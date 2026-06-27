"use client";

import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { ServiceItem } from "@/data/services";

import styles from "./styles.module.css";
import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getOptimisedSrc } from '@/lib/media/media';

import Section from "@/components/layout/section/section";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import SectionHeader from "@/components/ui/section-header/section-header";

const BG_FADE_DURATION = 1.1; // seconds
const TEXT_OUT_DURATION = 0.22;
const TEXT_IN_DURATION = 0.35;

type Props = {
  header: SectionHeaderContent;
  services: ServiceItem[];
};

export default function ServicesSection({ header, services }: Props) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(0);

  const bgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isAnimating = useRef(false);
  const reduceMotion = useRef(false);

  useGSAP(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(bgRefs.current[0], { opacity: 1 });

    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      if (reduceMotion.current) {
        gsap.set(listRef.current!.children, { opacity: 1, x: 0 });
        return;
      }

      gsap.set(listRef.current!.children, { opacity: 0, x: 16 });

      gsap.to(listRef.current!.children, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  function selectService(idx: number) {
    if (idx === current || isAnimating.current) return;
    isAnimating.current = true;

    const prevIndex = current;
    const dur = reduceMotion.current ? 0 : BG_FADE_DURATION;

    setCurrent(idx);

    gsap.to(bgRefs.current[prevIndex], {
      opacity: 0,
      duration: dur,
      ease: "power2.inOut",
    });
    gsap.to(bgRefs.current[idx], {
      opacity: 1,
      duration: dur,
      ease: "power2.inOut",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    if (reduceMotion.current) {
      setDisplayed(idx);
      return;
    }

    tl.to(textRef.current, {
      opacity: 0,
      y: 8,
      duration: TEXT_OUT_DURATION,
      ease: "power1.in",
    })
      .call(() => setDisplayed(idx))
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: TEXT_IN_DURATION,
        ease: "power2.out",
      });
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectService(idx);
    }
  }

  const active = services[displayed];

  useEffect(() => {
    bgRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const src = getOptimisedSrc(services[i].img.src);
      layer.style.backgroundImage = `url('${src}')`;
    });
  }, [services]);


  return (
    <Section
      pad="spacious"
      gap="condensed"
      vh
      className={styles.hero}
      id="services"
      theme="inverse"
    >
      <Section.Background color="default">
        <div style={{ opacity: 0.4 }}>
          {services.map((service, idx) => (
            <div
              key={service.label}
              ref={(el) => {
                bgRefs.current[idx] = el;
              }}
              className={styles.bgLayer}
              style={{
                backgroundSize: 'cover',
                backgroundPosition: `${service.img.focusX ?? 'center'} ${service.img.focusY ?? 'center'}`,
                opacity: idx === 0 ? 1 : 0,
              }}
            />
          ))}
        </div>
      </Section.Background>
      <SectionHeader {...header} />
      <Grid className={styles.menu}>
        <GridItem>
          <nav className={styles.navStack}>
            <ul className={styles.serviceList} ref={listRef}>
              {services.map((service, idx) => (
                <li
                  key={service.label}
                  tabIndex={0}
                  className={`${styles.serviceItem} ${
                    idx === current ? styles.active : ""
                  }`}
                  onMouseEnter={() => selectService(idx)}
                  onClick={() => selectService(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className={styles.label}>{service.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem className={styles.textStack} md="3 / span 2" lg="4 / span 1">
          <div ref={textRef} className={styles.fadeGroup}>
            <p className={styles.serviceDesc}>{active.description}</p>
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
}
