import { mediaPath } from "@/lib/media/media";
import type { ImageContent, MediaSection } from "@/types/common";
import { SIZES } from "@/types/common";

import styles from "./styles.module.css";

type Props = {
    section?: MediaSection;
    project: string;
    img: ImageContent;
    sizes?: string;
    loading?: "lazy" | "eager";
};

export default function ResponsiveImage({
    section = "work",
    project,
    img,
    sizes = "100vw",
    loading = "lazy",
}: Props) {
    const filename = img.src;
    const srcSet = SIZES.map(
        (s) => `${mediaPath({ section, project, filename, size: s })} ${s}w`,
    ).join(", ");

    const src = mediaPath({ section, project, filename, size: 1920 });

    return (
        <figure className={styles.figure}>
            <div className={styles.imgWrapper} data-aspect-ratio={img.aspect ?? "ignore"}>
                <img
                    className={styles.image}
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt={img.alt}
                    loading={loading}
                    decoding="async"
                    style={{ objectPosition: `${img.focusX} ${img.focusY}` }}
                />
            </div>
            {(img.caption || img.credits) && (
                <figcaption>
                    {img.caption && <span className={styles.caption}>{img.caption}</span>}
                    {img.credits && <span className={styles.credits}>{img.credits}</span>}
                </figcaption>
            )}
        </figure>
    );
}
