import Image from "next/image";
import Link from "next/link";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import Section from "@/components/layout/section/section";
import styles from "./styles.module.css";

type Props = {
    images: string[];
    links: string[];
};

export default function ProjectNav({ images, links }: Props) {
    return (
        <Section pad="normal">
            <Section.Background color="default"></Section.Background>
            <Grid rowGap="normal" className={styles.imgBlock}>
                <GridItem base="1 / span 1" className={styles.titleWrapper}>
                    <h1>More Works</h1>
                    <p>Some text here</p>
                </GridItem>
                {images.map((img, index) => (
                    <GridItem base="1 / span 1" className={styles.imgWrapper} key={img}>
                        <figure>
                            <Image src={img} alt="test" fill />
                            <figcaption>Testing this</figcaption>
                        </figure>
                        <Link href={links[index]}>Another Project</Link>
                    </GridItem>
                ))}
            </Grid>
        </Section>
    );
}
