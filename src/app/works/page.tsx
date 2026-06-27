'use client'

import ReactLenis from "lenis/react"
import Image from "next/image"
import Link from "next/link"
import { useTransitionRouter } from "next-view-transitions"

import styles from "./page.module.css"
import content from '@/data/content'

const Projects = () => {
    const router = useTransitionRouter()

    function slideInOut() {
        document.documentElement.animate([
            {
                opacity: 1,
                transform: "translateY(0)"
            },
            {
                opacity: 0.2,
                transform: "translateY(-35%)"
            }
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)"
        })

        document.documentElement.animate([
            {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
            },
            {
                clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)"
            }
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)"
        })
    }

    return (
        <ReactLenis root>
            <div className={`${styles.projects} layout-wrapper`}>
                <div className={styles.images}>
                    {content.projects.map((project) => (
                        <Link key={project.title} href={`/works/${project.title}`} onClick={(e) => {
                            e.preventDefault()
                            router.push(`/works/${project.title}`, {onTransitionReady: slideInOut})
                            }}>
                            <Image src={`/media/works/${project.title}/1920/${project.heroImg}.jpg`} alt="" width={500} height={500}/>
                        </Link>
                    ))}
                </div>
            </div>
        </ReactLenis>
    )
}

export default Projects