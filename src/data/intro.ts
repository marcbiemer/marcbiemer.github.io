import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { LogoContent, VideoContent } from "@/types/common";
import raw from "../../public/content/sections/intro.json";

export type Intro = {
    header: SectionHeaderContent;
    video?: VideoContent;
    logos: LogoContent[];
};

const intro = raw as Intro;

if (process.env.NODE_ENV === "development") {
    if (!intro.header) console.warn("intro.json: missing section header content");
    if (!intro.logos) console.warn("intro.json: missing logos");
    if (!Array.isArray(intro.logos)) console.warn("intro.json: logos should be an array");
}

export default intro;
