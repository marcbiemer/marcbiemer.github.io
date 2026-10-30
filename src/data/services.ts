import type { SectionHeaderContent } from "@/components/ui/section-header/section-header";
import type { ImageContent } from "@/types/common";
import raw from "../../public/content/sections/services.json";

export type ServiceItem = {
    label: string;
    description: string;
    img: ImageContent;
};

export type Services = {
    header: SectionHeaderContent;
    services: ServiceItem[];
};

const services = raw as Services;

if (process.env.NODE_ENV === "development") {
    if (!services.header) console.warn("services.json: missing section header content");
    if (!services.services) console.warn("services.json: missing servicesList");
    if (!Array.isArray(services.services))
        console.warn("services.json: servicesList should be an array");
}

export default services;
