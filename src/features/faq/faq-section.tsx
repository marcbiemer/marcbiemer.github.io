import PseudoGrid from "@/components/backgrounds/pseudo-grid/pseudo-grid";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import Accordion from "@/components/ui/accordion/accordion";
import EdgeMarkers from "@/components/ui/edge-markers/edge-markers";
import { Icon } from "@/components/ui/icon/icon";
import SectionHeader from "@/components/ui/section-header/section-header";
import faq from "@/data/faq";
import styles from "./styles.module.css";

export default function FAQSection() {
    return (
        <Section pad="spacious" vh>
            <Section.Background color="default">
                <PseudoGrid />
            </Section.Background>
            <Grid rowGap="spacious">
                <SectionHeader {...faq.header} className={styles.faqHeader} />
                <GridItem md="3 / span 2">
                    <Accordion className={styles.accordion} defaultOpenIndex={0}>
                        {faq.content.map((item, index) => (
                            <Accordion.Item
                                key={item.question}
                                index={index}
                                className={styles.item}
                                triggerClassName={styles.trigger}
                                trigger={
                                    <>
                                        <h2 className={styles.title}>{item.question}</h2>
                                        <div className={styles.iconWrapper}>
                                            <Icon iconName="add" size="large" />
                                        </div>
                                    </>
                                }
                            >
                                <p className={styles.body}>{item.answer}</p>
                                <EdgeMarkers />
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </GridItem>
            </Grid>
        </Section>
    );
}
