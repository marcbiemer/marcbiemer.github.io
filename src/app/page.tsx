'use client'

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import SplitType from "split-type"
import ReactLenis from "lenis/react"

import styles from "./page.module.css"

gsap.registerPlugin(useGSAP)

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {

    const heroText = new SplitType(".home h1", { types: "chars" })
    gsap.set(heroText.chars, {y: 400})
    gsap.to(heroText.chars, {
      y: 0,
      duration: 1,
      stagger: 0.075,
      ease: "power4.out",
      delay: 1
    })

  }, {scope: container})

  return (
    <ReactLenis root>
      <div className={`home ${styles.home}`} ref={container}>
        <h1>NAUSEA</h1>
      </div>
    </ReactLenis>
  );
}
