"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./styles.module.css";

type Props = {
    /** Content shown inside the follower, e.g. a label or an icon */
    children?: React.ReactNode;
    /** Diameter of the follower. Any CSS length. */
    size?: string;
    /** Seconds the follower takes to catch up with the pointer. 0 = locked to it. */
    followDuration?: number;
    /** Seconds for the scale in / out animation */
    scaleDuration?: number;
    /** Hide the native cursor while hovering the parent */
    hideCursor?: boolean;
    className?: string;
};

/**
 * Follows the pointer while it is over the element this component is rendered in.
 * The DOM parent is the hover target, so no refs or wrappers are needed:
 *
 *   <li className={styles.project}>
 *     ...
 *     <CursorFollower>View</CursorFollower>
 *   </li>
 */
export default function CursorFollower({
    children,
    size = "4rem",
    followDuration = 0.4,
    scaleDuration = 0.35,
    hideCursor = false,
    className,
}: Props) {
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const follower = followerRef.current;
        const parent = follower?.parentElement;
        if (!follower || !parent) return;

        // No hover on touch devices, so nothing to follow
        if (window.matchMedia("(hover: none)").matches) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lag = reduceMotion ? 0 : followDuration;
        const scaleTime = reduceMotion ? 0 : scaleDuration;

        // Start hidden and centered on its own origin
        gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

        const moveX = gsap.quickTo(follower, "x", {
            duration: lag,
            ease: "power3",
        });
        const moveY = gsap.quickTo(follower, "y", {
            duration: lag,
            ease: "power3",
        });

        const onEnter = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;

            // Jump to the entry point so it doesn't fly in from the last position
            gsap.set(follower, { x: e.clientX, y: e.clientY });
            moveX(e.clientX);
            moveY(e.clientY);

            if (hideCursor) parent.style.cursor = "none";

            gsap.to(follower, {
                scale: 1,
                duration: scaleTime,
                ease: "back.out(1.7)",
                overwrite: "auto",
            });
        };

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            moveX(e.clientX);
            moveY(e.clientY);
        };

        const onLeave = () => {
            if (hideCursor) parent.style.cursor = "";

            gsap.to(follower, {
                scale: 0,
                duration: scaleTime,
                ease: "power3.in",
                overwrite: "auto",
            });
        };

        parent.addEventListener("pointerenter", onEnter);
        parent.addEventListener("pointermove", onMove);
        parent.addEventListener("pointerleave", onLeave);

        return () => {
            parent.removeEventListener("pointerenter", onEnter);
            parent.removeEventListener("pointermove", onMove);
            parent.removeEventListener("pointerleave", onLeave);
            parent.style.cursor = "";
            gsap.killTweensOf(follower);
        };
    }, [followDuration, scaleDuration, hideCursor]);

    return (
        <div
            ref={followerRef}
            className={`${styles.follower} ${className ?? ""}`}
            style={{ "--cursor-size": size } as React.CSSProperties}
            aria-hidden="true"
        >
            {children}
        </div>
    );
}
