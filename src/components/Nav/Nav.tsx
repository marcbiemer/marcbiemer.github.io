'use client'

import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'

import styles from './styles.module.css'

const Nav = () => {
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
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <div className={styles.link}>
                    <Link href={"/"} onClick={(e) => {
                        e.preventDefault()
                        router.push("/", {onTransitionReady: slideInOut})
                        }}>Index</Link>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.link}>
                    <Link href={"/works"} onClick={(e) => {
                        e.preventDefault()
                        router.push("/works", {onTransitionReady: slideInOut})
                        }}>Works</Link>
                </div>
                <div className={styles.link}>
                    <Link href={"/info"} onClick={(e) => {
                        e.preventDefault()
                        router.push("/info", {onTransitionReady: slideInOut})
                        }}>Info</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav