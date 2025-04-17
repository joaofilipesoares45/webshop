import { useState } from "react"
import styles from "./Slide.module.css"

export default function Slide({ children }) {
    const [position, setPosition] = useState()

    const slideRoller = (value) => {
        const list = document.querySelectorAll(`.${styles.slide} .item`)

        let actual
        list.forEach((div, index) => {
            if (div.hasAttribute("view")) {

                actual = index
            }
        })

        let next
        if (value === true) {
            if (actual < list.length - 1) {
                next = actual + 1
            }else {
                next = 0
            }

        } else {
            if (actual > 0) {
                next = actual - 1
            } else {
                next = list.length - 1
            }
        }
    
        if (typeof next === "number") {
            list[actual].removeAttribute("view")
            list[next].setAttribute("view", "true")

            const btns = document.querySelectorAll(`.${styles.slide} nav button`) 
        
            btns.forEach((btn, index) => {
                if (btn.hasAttribute("selected")) {
                    btn.removeAttribute("selected")
                }
                if (index === next) {
                    btn.setAttribute("selected", "true")
                } 
            })
        }
    }
    return (
        <div className={styles.slide} onTouchStart={(event) => setPosition(event.touches[0].clientX)} onTouchEnd={(event) => {
            if (event.changedTouches[0].clientX < position - 120) {
                slideRoller(true)
            } else if (event.changedTouches[0].clientX > position + 120) {
                slideRoller(false)
            }
        }}>
            {children}
        </div>
    )
}