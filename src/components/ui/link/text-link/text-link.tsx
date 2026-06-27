"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/icon/icon";
import { AppLink, type AppLinkProps } from "@/components/ui/link/app-link/app-link";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./styles.module.css";

type Props = AppLinkProps & {
    arrow?: boolean;
    hasUnderline?: boolean;
};

export function TextLink({ arrow, hasUnderline, children, className, ...rest }: Props) {
    const classes = [styles.link, hasUnderline && styles.underline, className]
        .filter(Boolean)
        .join(" ");

    const containerRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const cloneRef = useRef<HTMLSpanElement>(null);
    const highlightWrapperRef = useRef<HTMLSpanElement>(null);
    const highlightRef = useRef<HTMLSpanElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (hasUnderline) return;

            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.set(cloneRef.current, { yPercent: 100 });
            gsap.set(highlightRef.current, {
                yPercent: 100,
                scaleX: 1,
                transformOrigin: "center",
            });

            tl.current = gsap
                .timeline({
                    paused: true,
                    defaults: {
                        duration: reduceMotion ? 0 : 0.4,
                        ease: "power3.out",
                    },
                })
                .to(labelRef.current, { yPercent: -100 }, 0)
                .to(cloneRef.current, { yPercent: 0 }, 0)
                .to(highlightRef.current, { yPercent: 0, scaleX: 1.1 }, 0);
        },
        { scope: containerRef, dependencies: [hasUnderline] },
    );

    const handleEnter = () => tl.current?.play();
    const handleLeave = () => tl.current?.reverse();

    if (hasUnderline) {
        return (
            <AppLink {...rest} className={classes}>
                {children}
                {arrow && (
                    <span className={styles.iconWrapper} aria-hidden="true">
                        <Icon iconName="arrow_outward" />
                    </span>
                )}
            </AppLink>
        );
    }

    return (
        <AppLink
            {...rest}
            className={classes}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
        >
            <span ref={containerRef} className={styles.container}>
                <span
                    ref={highlightWrapperRef}
                    className={styles.highlightWrapper}
                    aria-hidden="true"
                >
                    <span ref={highlightRef} className={styles.highlight} />
                </span>
                <span className={styles.labelWrapper}>
                    <span ref={labelRef} className={styles.label}>
                        {children}
                    </span>
                    <span ref={cloneRef} className={styles.labelClone} aria-hidden="true">
                        {children}
                    </span>
                </span>
                {arrow && (
                    <span className={styles.iconWrapper} aria-hidden="true">
                        <Icon iconName="arrow_outward" />
                    </span>
                )}
            </span>
        </AppLink>
    );
}
