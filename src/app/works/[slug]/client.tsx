'use client'

import ReactLenis from "lenis/react";
import Image from "next/image";
import styles from "./page.module.css";
import { Project } from "@/data/content";

type Props = {
  project: Project;
};

export default function ProjectClient({ project }: Props) {
  return (
    <ReactLenis root>
      <div className={styles.projects}>
        <div className={styles.images}>
          <h1>{project.title}</h1>
          <Image
            src={`/media/works/${project.slug}/1920/${project.heroImg}.jpg`}
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>
    </ReactLenis>
  );
}