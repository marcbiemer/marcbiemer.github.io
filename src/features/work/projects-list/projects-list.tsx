import { useMemo, useState } from "react";
import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import ResponsiveImage from "@/components/media/image/responsive-image";
import { AppLink } from "@/components/ui/link/app-link/app-link";
import type { Project } from "@/data/project";
import styles from "./styles.module.css";

type Props = { projects: Project[]; showImage?: boolean; minHeight?: boolean };

function projectStackScale(slug: string): number {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
    }
    return 1 + ((Math.abs(hash) % 1000) / 1000) * 0.2;
}

export default function ProjectsList({ projects, showImage = false, minHeight = false }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const randomScales = useMemo(
        () => projects.map((project) => projectStackScale(project.slug)),
        [projects],
    );

    const MAX_VISIBLE_DEPTH = 7;

    return (
        <div data-min-height={minHeight}>
            <Grid className={styles.grid}>
                <GridItem>
                    <ul className={styles.projects}>
                        {projects.map((project, index) => (
                            <li
                                className={styles.projectItemWrapper}
                                key={project.slug}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <AppLink
                                    className={styles.projectItem}
                                    href={`/work/${project.slug}`}
                                >
                                    <div className={styles.textStack}>
                                        <span className={styles.id}>{`0${index + 1}`}</span>
                                        <span className={styles.title}>{project.title}</span>
                                        <span>
                                            <span className={styles.tags}>
                                                {project.tags.join(", ")}
                                            </span>
                                            <span className={styles.year}>{project.year}</span>
                                        </span>
                                    </div>
                                </AppLink>
                            </li>
                        ))}
                    </ul>
                </GridItem>
                {showImage && (
                    <div className={styles.imageStack}>
                        {projects.map((project, index) => {
                            const delta = index - activeIndex;
                            const distance = Math.min(Math.abs(delta), MAX_VISIBLE_DEPTH);
                            const isActive = delta === 0;
                            const dir = Math.sign(-1 * delta);
                            const offsetY = 26 + distance * 34 + distance ** 1.4 * 6;
                            const translateY = isActive ? 16 : -dir * offsetY;
                            const translateZ = isActive ? 60 : -distance * 90;
                            const opacity = 1;
                            const baseScale = isActive ? 1 : 1 - distance * 0.025;
                            const finalScale = baseScale * randomScales[index];
                            const zIndex = isActive
                                ? projects.length + 1
                                : projects.length - distance;

                            return (
                                <div
                                    key={project.slug}
                                    className={`${styles.stackItem} ${isActive ? styles.stackItemActive : ""}`}
                                    style={{
                                        transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${finalScale})`,
                                        opacity,
                                        zIndex,
                                    }}
                                >
                                    <ResponsiveImage
                                        project={project.slug}
                                        img={project.images[0]}
                                        sizes="40vw"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </Grid>
        </div>
    );
}
