import Grid from "@/components/layout/grid/grid";
import GridItem from "@/components/layout/grid/grid-item/grid-item";
import type { ImageBlockProps } from "./image-block/image-block";
import ImageBlock from "./image-block/image-block";
import type { TextBlockProps } from "./text-block/text-block";
import TextBlock from "./text-block/text-block";
import type { VideoBlockProps } from "./video-block/video-block";
import VideoBlock from "./video-block/video-block";

export type Block = TextBlockProps | ImageBlockProps | VideoBlockProps;

type Props = {
    slug: string;
    blocks: Block[];
};

export default function BlockRenderer({ slug, blocks }: Props) {
    return (
        <Grid rowGap="spacious" colGap="condensed">
            {blocks.map((block, index) => {
                const resolvedBlock = { ...block, slug: block.slug ?? slug };
                return (
                    <GridItem
                        key={`${index.toString()}--${resolvedBlock.type}--${block.slug}`}
                        base={resolvedBlock.layout?.base ?? "1 / -1"}
                        md={resolvedBlock.layout?.md}
                        lg={resolvedBlock.layout?.lg}
                    >
                        {renderBlock(resolvedBlock)}
                    </GridItem>
                );
            })}
        </Grid>
    );
}

function renderBlock(block: Block) {
    switch (block.type) {
        case "text":
            return <TextBlock {...block} />;
        case "image":
            return <ImageBlock {...block} />;
        case "video":
            return <VideoBlock {...block} />;
    }
}
