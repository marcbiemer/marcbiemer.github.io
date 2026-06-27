import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { LinkItem } from "@/types/common";
import raw from "../../public/content/meta.json";

export type Name = {
    full: string;
    short: string;
    initials: string;
};

export type FooterSection = {
    header: SectionHeaderContent;
    links: LinkItem[];
    additionalLinks?: LinkItem[];
};

export type Meta = {
    studio: string;
    tagline: string;
    name: Name;
    availability: string;
    copyright: string;
    location: string;
    timezone: string;
    coordinates: string;
    socials: FooterSection;
    contact: FooterSection;
    sitemap: FooterSection;
};

const meta = raw as Meta;

if (process.env.NODE_ENV === "development") {
    if (!meta.studio) console.warn("meta.json: missing studio name");
    if (!meta.tagline) console.warn("meta.json: missing tagline");
    if (!meta.name) console.warn("meta.json: missing name");
    if (!meta.name) console.warn("meta.json: missing intro");
    if (!meta.availability) console.warn("meta.json: missing availability");
    if (!meta.copyright) console.warn("meta.json: missing copyright");
    if (!meta.location) console.warn("meta.json: missing location");
    if (!meta.timezone) console.warn("meta.json: missing timezone");
    if (!meta.coordinates) console.warn("meta.json: missing coordinates");
    if (!meta.socials) console.warn("meta.json: missing socials");
    if (!meta.contact) console.warn("meta.json: missing contact details");
    if (!meta.sitemap) console.warn("meta.json: missing sitemap");
}

export default meta;
