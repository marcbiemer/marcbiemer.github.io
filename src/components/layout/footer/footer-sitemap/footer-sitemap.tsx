"use client";

import { TextLink } from "@/components/ui/link/text-link/text-link";
import type { FooterSection } from "@/data/meta";
import styles from "./styles.module.css";

export default function FooterSitemap({ sitemap }: { sitemap: FooterSection }) {
    return (
        <nav className={styles.sitemap} aria-labelledby="footer-sitemap">
            <ul className={styles.list}>
                {sitemap.links.map((site) => (
                    <li key={site.href}>
                        <TextLink href={site.href}>{site.label}</TextLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
