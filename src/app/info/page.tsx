'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import SplitType from "split-type" 
import ReactLenis from "lenis/react"
import Image from "next/image"

import styles from "./page.module.css"

gsap.registerPlugin(useGSAP)

const Info = () => {
    const container = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
  
        const text = new SplitType(".info p", { 
            types: "lines",
            tagName: 'div',
            lineClass: 'line'
        })

        text.lines?.forEach((line) => {
            const content = line.innerHTML
            line.innerHTML = `<span>${content}</span>`
        })

        gsap.set('.info p .line span', {
            y: 400,
            display: 'block'
        })

        gsap.to('.info p .line span', {
            y: 0,
            duration: 2,
            stagger: 0.075,
            ease: "power4.out",
            delay: 0.25
        })

        return () => {
            if (text) text.revert() 
        }
  
    }, {scope: container})

    return (
        <ReactLenis root>
            <div className={`info ${styles.info}`} ref={container}>
                <div className={styles.col}>
                    <Image src={"/media/about/portrait/1280/portrait.jpg"} alt="" width={500} height={500}/>
                </div>
                <div className={styles.col}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                </div>
            </div>
        </ReactLenis>
    )
}

export default Info