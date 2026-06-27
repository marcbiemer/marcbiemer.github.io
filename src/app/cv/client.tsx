"use client";

import type { CV } from "@/data/cv";

// import { useRef } from "react"
// import { useGSAP } from "@gsap/react";
// import { gsap } from "@/lib/gsap";

import ContactSection from "@/features/contact/contact-section";
import CVHero from "@/features/cv/cv-hero/cv-hero";
import CVSegments from "@/features/cv/cv-segments/cv-segments";

export default function CVClient({ cv }: { cv: CV }) {
    return (
        <article>
            <CVHero {...cv} />
            <CVSegments {...cv} />
            <ContactSection />
        </article>
    );
}
