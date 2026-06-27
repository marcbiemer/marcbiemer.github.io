import ResponsiveImage from "@/components/media/image/responsive-image";
import type { GridItemLayout, ImageContent, MediaSection } from "@/types/common";

export type ImageBlockProps = {
    type: "image";
    layout?: GridItemLayout;
    section?: MediaSection;
    slug: string;
    content: ImageContent;
};

type SIZEKEY = "span 1" | "span 2" | "span 3" | "-1";

const SIZEMAP = {
    "span 1": "20vw",
    "span 2": "40vw",
    "span 3": "60vw",
    "span 4": "80vw",
    "-1": "80vw",
};

export default function ImageBlock({ layout, section = "work", slug, content }: ImageBlockProps) {
    let sizes = "100vw";
    const size_md = layout?.md?.split("/")[1].trim();
    const size_lg = layout?.lg?.split("/")[1].trim();

    if (size_md && !size_lg) {
        sizes = `(max-width: 768px) 100vw, ${SIZEMAP[size_md as SIZEKEY]}`;
    }

    if (size_lg && !size_md) {
        sizes = `(max-width: 1280px) 100vw, ${SIZEMAP[size_lg as SIZEKEY]}`;
    }

    if (size_md && size_lg) {
        sizes = `(max-width: 768px) 100vw, (max-width: 1280px) ${SIZEMAP[size_md as SIZEKEY]}, ${SIZEMAP[size_lg as SIZEKEY]}`;
    }

    return <ResponsiveImage section={section} project={slug} img={content} sizes={sizes} />;
}
