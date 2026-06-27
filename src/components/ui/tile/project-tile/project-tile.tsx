import ResponsiveImage from "@/components/media/image/responsive-image";
import type { Project } from "@/data/project";

import { AppLink } from "../../link/app-link/app-link";
import styles from "./styles.module.css";

type Props = {
    project: Project;
};

export default function ProjectTile({ project }: Props) {
    return (
        <AppLink href={`/work/${project.slug}`} className={styles.tile} data-tile>
            <div className={styles.imgWrapper}>
                <ResponsiveImage
                    project={project.slug}
                    img={project.images[0]}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className={styles.textStack}>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.subTitle}>
                    {project.year} | {project.tags.join(", ")}
                </p>
            </div>
        </AppLink>
    );
}
