import Section from "@/components/layout/section/section";
import { Button } from "@/components/ui/button/button";
import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import SectionHeader from "@/components/ui/section-header/section-header";
import type { Project } from "@/data/project";
import ProjectsList from "../projects-list/projects-list";
import styles from "./styles.module.css";

type Props = {
    header: SectionHeaderContent;
    projects: Project[];
};

export default function WorkArchive({ header, projects }: Props) {
    return (
        <Section gap="condensed" pad="spacious" vh valign="center" id="work" theme="default">
            <SectionHeader {...header} />
            <ProjectsList projects={projects} />
            <div className={styles.btnWrapper}>
                <Button variant="secondary" label="Explore All" href="/work" size="medium" />
            </div>
        </Section>
    );
}
