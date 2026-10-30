"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { scrollToSection } from "@/lib/hooks/scroll-to-section";
import { slideInOut } from "@/lib/transitions/slide-in-out";
import { useMenu } from "@/providers/menu-provider/menu-provider";

export type AppLinkProps = Omit<React.ComponentProps<"a">, "href"> & {
    href: string;
    newTab?: boolean;
    fromNav?: boolean;
};

const isExternal = (href: string) => /^(https?:)?\/\/|^mailto:|^tel:/.test(href);

/** "/#work" -> { path: "/", hash: "work" }, "#work" -> { path: "", hash: "work" } */
function splitHash(href: string) {
    const i = href.indexOf("#");
    if (i === -1) return { path: href, hash: "" };
    return { path: href.slice(0, i), hash: href.slice(i + 1) };
}

export function AppLink({
    href,
    newTab,
    fromNav = false,
    onClick,
    children,
    ...rest
}: AppLinkProps) {
    const router = useTransitionRouter();
    const pathname = usePathname();
    const { setIsOpen } = useMenu();
    const openInNewTab = newTab ?? isExternal(href);

    if (openInNewTab) {
        return (
            <a {...rest} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <Link
            {...rest}
            href={href}
            onClick={(e) => {
                onClick?.(e);
                if (e.defaultPrevented) return;

                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
                    return;
                }

                e.preventDefault();

                const { path, hash } = splitHash(href);
                const samePage = path === "" || path === pathname;
                if (hash && samePage) {
                    scrollToSection(hash, fromNav);
                    setIsOpen(false);
                    return;
                }

                router.push(href, { onTransitionReady: slideInOut });
                setIsOpen(false);
            }}
        >
            {children}
        </Link>
    );
}
