"use client";

import SwirlGradientBackground from "@/components/backgrounds/shaders/swirl-gradient";
import Clock from "@/components/ui/clock/clock";
import { Icon } from "@/components/ui/icon/icon";
import { TextLink } from "@/components/ui/link/text-link/text-link";
import meta from "@/data/meta";
import Grid from "../grid/grid";
import GridItem from "../grid/grid-item/grid-item";
import Section from "../section/section";
import FooterSitemap from "./footer-sitemap/footer-sitemap";
import styles from "./styles.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer} id="footer">
            <Section pad="spacious" theme="inverse">
                <Section.Background color="default" />
                <Grid rowGap="spacious" className={styles.footerTop}>
                    <GridItem md="1 / span 2" lg="1 / span 1" className={styles.sitemap}>
                        <h3 id="footer-sitemap">{meta.sitemap.header.sectionTitle}</h3>
                        <FooterSitemap sitemap={meta.sitemap} />
                    </GridItem>
                    <GridItem md="3 / span 2" lg="2 / span 2" className={styles.contact}>
                        <h3>{meta.contact.header.sectionTitle}</h3>
                        <div className={styles.list}>
                            <TextLink href={meta.contact.links[0].href} arrow>
                                {meta.contact.links[0].label}
                            </TextLink>
                            {meta.contact.header.body?.blocks.map((block) => (
                                <p key={block}>{block}</p>
                            ))}
                        </div>
                    </GridItem>
                    <GridItem lg="4 / span 1" className={styles.socials}>
                        <h3>{meta.socials.header.sectionTitle}</h3>
                        <ul className={styles.list}>
                            {meta.socials.links.map((social) => (
                                <li key={social.href}>
                                    <TextLink href={social.href} newTab arrow>
                                        {social.label}
                                    </TextLink>
                                </li>
                            ))}
                        </ul>
                    </GridItem>
                </Grid>
            </Section>

            <Section theme="inverse">
                <Section.Background color="default" />
                <Grid rowGap="normal">
                    <GridItem md="1 / span 2" lg="1 / span 1" className={styles.clock}>
                        <Clock location={meta.location} timezone={meta.timezone} />
                    </GridItem>
                    <GridItem md="3 / span 2" lg="2 / span 1" className={styles.availability}>
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className={styles.scrollToTop}
                        >
                            {"Back to top"}
                            <Icon iconName={"arrow_warm_up"} />
                        </button>
                        <span>{meta.availability}</span>
                    </GridItem>
                    <GridItem lg="4 / span 1" className={styles.copyright}>
                        <span>©{meta.copyright}</span>
                    </GridItem>
                </Grid>
            </Section>

            <Section theme="inverse">
                <Section.Background color="default">
                    <SwirlGradientBackground
                        darkColor="#03060d"
                        midColor="#091970"
                        highlightColor="#4332FF"
                    />
                </Section.Background>
                <Grid rowGap="condensed">
                    <GridItem md="1 / span 2" className={styles.studioName}>
                        <span>{meta.studio}</span>
                    </GridItem>
                    <GridItem md="3 / span 2" className={styles.tagline}>
                        <span>{meta.tagline}</span>
                    </GridItem>
                </Grid>
            </Section>
        </footer>
    );
}
