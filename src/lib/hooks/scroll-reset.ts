"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function ScrollReset() {
    const pathname = usePathname();
    const lenis = useLenis();

    const lenisRef = useRef(lenis);
    lenisRef.current = lenis;

    const prevPathname = useRef(pathname);

    useLayoutEffect(() => {
        if (prevPathname.current === pathname) return;
        prevPathname.current = pathname;

        // Let hash navigation (/#work) do its own scrolling
        if (window.location.hash) return;

        ScrollTrigger.clearScrollMemory("manual");

        // immediate skips the easing, force works even if Lenis is stopped
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);

        ScrollTrigger.refresh();
    }, [pathname]);

    return null;
}
