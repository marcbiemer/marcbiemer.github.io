import type { ProjectStat } from "@/data/project";

import styles from "./styles.module.css";

type Props = {
    title: string;
    tags: string[];
    stats: ProjectStat[];
};

export default function ProjectStats({ title, tags, stats }: Props) {
    return (
        <ul className={styles.stats}>
            <li className={styles.stat}>
                <h3>Project</h3>
                <p>{title}</p>
            </li>
            <li className={styles.stat}>
                <h3>Type</h3>
                {tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                ))}
            </li>
            {stats.map((stat) => (
                <li key={stat.label} className={styles.stat}>
                    <h3>{stat.label}</h3>
                    <p>{stat.value}</p>
                </li>
            ))}
        </ul>
    );
}
