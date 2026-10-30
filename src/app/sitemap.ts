import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://marcbiemer.github.io",
            priority: 1,
            lastModified: new Date(),
        },
        {
            url: "https://marcbiemer.github.io/work",
            priority: 0.8,
            lastModified: new Date(),
        },
        {
            url: "https://marcbiemer.github.io/contact",
            priority: 0.7,
            lastModified: new Date(),
        },
        {
            url: "https://marcbiemer.github.io/cv",
            priority: 0.5,
            lastModified: new Date(),
        },
    ];
}
