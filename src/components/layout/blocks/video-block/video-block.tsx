import type { GridItemLayout, MediaSection, VideoContent } from "@/types/common";

import ResponsiveVideo from "@/components/media/video/responsive-video";

export type VideoBlockProps = {
  type: "video";
  layout?: GridItemLayout;
  section?: MediaSection;
  slug: string;
  content: VideoContent;
};

export default function VideoBlock({ section = 'work', slug, content }: VideoBlockProps) {
  return (
    <ResponsiveVideo
      section={section}
      slug={slug}
      video={content}
    />
  );
}
