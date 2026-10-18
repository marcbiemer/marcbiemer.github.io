"use client";

import type { FooterSection } from "@/data/meta";

import styles from "./styles.module.css";

import { TextLink } from "@/components/ui/link/text-link/text-link";

export default function FooterSitemap({ sitemap }: { sitemap: FooterSection }) {

  return (
    <nav className={styles.sitemap} aria-labelledby="footer-sitemap">
      <ul className={styles.list}>
        {sitemap.links.map((site, index) => (
          <li key={index}>
            <TextLink href={site.href}>{site.label}</TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
