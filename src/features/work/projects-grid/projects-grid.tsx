import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import ProjectTile from "@/components/ui/tile/project-tile/project-tile";
import type { Project } from "@/data/project";
import styles from "./styles.module.css";

type Props = {
    projects: Project[];
};

export default function ProjectsGrid({ projects }: Props) {
    return (
        <Grid className={styles.projectGrid} rowGap="condensed" colGap="condensed">
            {projects.map((project) => (
                <GridItem key={project.slug} md="span 2">
                    <ProjectTile project={project} />
                </GridItem>
            ))}
        </Grid>
    );
}
