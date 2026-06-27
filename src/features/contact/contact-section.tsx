import HalftoneMatrix from "@/components/backgrounds/shaders/halftone-matrix";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import { Button } from "@/components/ui/button/button";
import HighlightText from "@/components/ui/highlight-text/highlight-text";
import contact from "@/data/contact";
import styles from "./styles.module.css";

export default function ContactSection() {
    return (
        <Section pad="spacious" id="contact" valign="center" theme="default">
            <Section.Background color="accent">
                <HalftoneMatrix bgColor="#FEFBFE" highlightColor="#4332FF" gridDensity={50} />
            </Section.Background>
            <Grid>
                <GridItem className={styles.content} md="2 / span 2">
                    <div className={styles.textStack}>
                        {contact.teaser.supTitle && (
                            <span className={styles.supTitle}>
                                <HighlightText
                                    text={contact.teaser.supTitle}
                                    className={styles.titleAlt}
                                />
                            </span>
                        )}
                        {contact.teaser.title && (
                            <h2 className={styles.title}>
                                <HighlightText
                                    text={contact.teaser.title}
                                    className={styles.titleAlt}
                                />
                            </h2>
                        )}
                        {contact.teaser.subTitle && (
                            <p className={styles.subTitle}>
                                <HighlightText
                                    text={contact.teaser.subTitle}
                                    className={styles.titleAlt}
                                />
                            </p>
                        )}
                    </div>
                    <div className={styles.ctaWrapper}>
                        <Button
                            variant="primary"
                            label="Book a call"
                            href="https://calendar.app.google/s4ZFtdqrwTnP8w1E9"
                            size="medium"
                        />
                        <Button
                            variant="secondary"
                            label="Get In Touch"
                            href="/contact"
                            size="medium"
                        />
                    </div>
                </GridItem>
            </Grid>
        </Section>
    );
}
