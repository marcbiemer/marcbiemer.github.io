import HighlightText from "@/components/ui/highlight-text/highlight-text";
import type { GridItemLayout } from "@/types/common";
import styles from "./styles.module.css";

export type TextBlockProps = {
    type: "text";
    layout?: GridItemLayout;
    slug: string;
    align?: "start" | "end" | "center";
    title?: string;
    content: string[];
};

export default function TextBlock({ align = "start", title, content }: TextBlockProps) {
    return (
        <div className={styles.textStack} data-text-align={align}>
            {title && (
                <h3 className={styles.title}>
                    <HighlightText text={title} />
                </h3>
            )}
            {content.map((block) => (
                <p key={block} className={styles.body}>
                    <HighlightText text={block} className={styles.bodyAlt} linkHasUnderline />
                </p>
            ))}
        </div>
    );
}
