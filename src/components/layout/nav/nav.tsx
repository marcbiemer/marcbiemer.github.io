"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import SwirlGradientBackground from "@/components/backgrounds/shaders/swirl-gradient";
import { TextLink } from "@/components/ui/link/text-link/text-link";
import meta from "@/data/meta";
import { CustomEase, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMenu } from "@/providers/menu-provider/menu-provider";
import styles from "./styles.module.css";

CustomEase.create("hop", "0.87, 0, 0.13, 1");

const NAV_OFFSET = 24;

export default function Nav() {
    const lenis = useLenis();
    const { isOpen, setIsOpen } = useMenu();
    const [theme, setTheme] = useState<"default" | "accent" | "inverse">("default");
    const pathname = usePathname();

    useGSAP(
        () => {
            const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");

            function getActiveTheme(): "default" | "accent" | "inverse" | null {
                let active: HTMLElement | null = null;
                for (const section of sections) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= NAV_OFFSET) {
                        active = section;
                    } else {
                        break;
                    }
                }
                return (active?.dataset.theme as "default" | "accent" | "inverse") ?? null;
            }

            sections.forEach((section) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: `top ${NAV_OFFSET}px`,
                    end: `bottom ${NAV_OFFSET}px`,
                    onEnter: () =>
                        setTheme(section.dataset.theme as "default" | "accent" | "inverse"),
                    onEnterBack: () =>
                        setTheme(section.dataset.theme as "default" | "accent" | "inverse"),
                });
            });

            ScrollTrigger.refresh();

            const initial = getActiveTheme();
            if (initial) setTheme(initial);
        },
        { dependencies: [pathname] },
    );

    const menuToggleBtnRef = useRef<HTMLButtonElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuOverlayContainerRef = useRef<HTMLDivElement>(null);
    const menuMediaWrapperRef = useRef<HTMLDivElement>(null);
    const menuToggleLabelRef = useRef<HTMLParagraphElement>(null);
    const hamburgerIconRef = useRef<HTMLDivElement>(null);
    const menuColsRef = useRef<HTMLDivElement[]>([]);
    const menuLinkItemsRef = useRef<HTMLDivElement[]>([]);

    const addMenuColRef = (el: HTMLDivElement | null) => {
        if (el && !menuColsRef.current.includes(el)) {
            menuColsRef.current.push(el);
        }
    };

    const addMenuLinkItemRef = (el: HTMLDivElement | null) => {
        if (el && !menuLinkItemsRef.current.includes(el)) {
            menuLinkItemsRef.current.push(el);
        }
    };

    // set the initial hidden state for the link rows once, on mount —
    // nothing here touches TextLink's own internal markup
    useGSAP(() => {
        gsap.set(menuLinkItemsRef.current, { opacity: 0, y: 24 });
    }, []);

    useGSAP(
        () => {
            const menuOverlay = menuOverlayRef.current;
            const menuOverlayContainer = menuOverlayContainerRef.current;
            const menuMediaWrapper = menuMediaWrapperRef.current;
            const menuToggleLabel = menuToggleLabelRef.current;
            const hamburgerIcon = hamburgerIconRef.current;
            const menuCols = menuColsRef.current;

            if (
                !menuOverlay ||
                !menuOverlayContainer ||
                !menuMediaWrapper ||
                !menuToggleLabel ||
                !hamburgerIcon
            ) {
                return;
            }

            const changeMenuLabel = (label: string) => {
                if (!menuToggleLabel) return;

                menuToggleLabel.textContent = label;

                gsap.set(menuToggleLabel, {
                    y: "110%",
                });
                gsap.to(menuToggleLabel, {
                    y: "0%",
                    duration: 1,
                    ease: "hop",
                });
            };

            if (isOpen) {
                lenis?.stop();

                hamburgerIcon.classList.add(styles.active);

                const tl = gsap.timeline();

                tl.to(menuToggleLabel, {
                    y: "-110%",
                    duration: 1,
                    ease: "hop",
                })
                    .to(
                        menuOverlay,
                        {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            duration: 1,
                            ease: "hop",
                        },
                        "<",
                    )
                    .to(
                        menuOverlayContainer,
                        {
                            yPercent: 0,
                            duration: 1,
                            ease: "hop",
                        },
                        "<",
                    )
                    .to(
                        menuMediaWrapper,
                        {
                            opacity: 1,
                            duration: 0.75,
                            ease: "power2.out",
                            delay: 0.5,
                        },
                        "<",
                    )
                    .call(() => changeMenuLabel("close"))
                    .to(
                        menuLinkItemsRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            stagger: 0.05,
                        },
                        "-=0.5",
                    );

                return () => {
                    tl.kill();
                };
            }

            hamburgerIcon.classList.remove(styles.active);

            const tl = gsap.timeline({
                onComplete: () => {
                    lenis?.start();
                },
            });

            tl.to(menuOverlay, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "hop",
            })
                .to(
                    menuOverlayContainer,
                    {
                        yPercent: -50,
                        duration: 1,
                        ease: "hop",
                    },
                    "<",
                )
                .to(
                    menuToggleLabel,
                    {
                        y: "-110%",
                        duration: 1,
                        ease: "hop",
                    },
                    "<",
                )
                .to(
                    menuCols,
                    {
                        opacity: 0.25,
                        duration: 1,
                        ease: "hop",
                    },
                    "<",
                )
                .call(() => changeMenuLabel("menu"));

            tl.set(menuLinkItemsRef.current, {
                opacity: 0,
                y: 24,
            });

            tl.set(menuCols, {
                opacity: 1,
            });

            tl.set(menuMediaWrapper, {
                opacity: 0,
            });

            return () => {
                tl.kill();
            };
        },
        {
            dependencies: [isOpen, lenis],
            revertOnUpdate: false,
        },
    );

    return (
        <nav className={`${styles.nav} ${styles[isOpen ? "default" : theme]}`}>
            <div className={styles.menuBar}>
                <div className={styles.menuLogo}>
                    <TextLink href="/#index">{meta.studio}</TextLink>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((previous) => !previous)}
                    ref={menuToggleBtnRef}
                    className={styles.menuToggleBtn}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <div className={styles.menuToggleLabel}>
                        <p ref={menuToggleLabelRef}>menu</p>
                    </div>

                    <div ref={hamburgerIconRef} className={styles.menuHamburgerIcon}>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            <div ref={menuOverlayRef} className={styles.menuOverlay}>
                <div className={styles.menuOverlayContent}>
                    <div ref={menuMediaWrapperRef} className={styles.menuMediaWrapper}>
                        <div className={styles.menuMedia}>
                            <SwirlGradientBackground
                                darkColor="#03060d"
                                midColor="#091970"
                                highlightColor="#4332FF"
                            />
                        </div>
                    </div>

                    <div ref={menuOverlayContainerRef} className={styles.menuContentWrapper}>
                        <div className={styles.menuContentMain}>
                            <div ref={addMenuColRef} className={styles.menuCol}>
                                {meta.sitemap.links.map((link) => (
                                    <div
                                        ref={addMenuLinkItemRef}
                                        className={styles.menuLink}
                                        key={link.href}
                                    >
                                        <TextLink href={link.href} fromNav>
                                            {link.label}
                                        </TextLink>
                                    </div>
                                ))}
                            </div>

                            <div ref={addMenuColRef} className={styles.menuCol}>
                                {meta.sitemap.additionalLinks?.map((link) => (
                                    <div
                                        ref={addMenuLinkItemRef}
                                        className={styles.menuTag}
                                        key={link.href}
                                    >
                                        <TextLink href={link.href} fromNav>
                                            {link.label}
                                        </TextLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
