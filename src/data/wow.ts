import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import raw from "../../public/content/sections/wow.json";

export type ProcessItem = {
    label: string;
    description: string;
};

export type WoW = {
    header: SectionHeaderContent;
    process: ProcessItem[];
};

const wow = raw as WoW;

if (process.env.NODE_ENV === "development") {
    if (!wow.header) console.warn("wow.json: missing section header content");
    if (!wow.process) console.warn("wow.json: missing process steps");
    if (!Array.isArray(wow.process)) console.warn("wow.json: process should be an array");
}

export default wow;
