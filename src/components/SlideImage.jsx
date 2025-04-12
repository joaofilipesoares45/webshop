import { useState } from "react"

export default function SlideImage({ lista }) {

    const [position, setPosition] = useState()
    const slideRoller = (target, position) => {
        const slide = target.parentElement.querySelectorAll('.slide-div')

        if (position) {
            let next
            let view
            slide.forEach((element, index) => {
                if (element.getAttribute('view') === 'true') {
                    view = element
                    if (index < slide.length - 1) {
                        next = slide[index + 1]
                    }
                }
            });
            view.setAttribute('view', 'false')
            if (!next) {
                next = slide[0]
            }
            if (next) {
                next.setAttribute('view', 'true')
                next.setAttribute("position", "left")
            }
            
            
        } else {
            let next
            let view
            slide.forEach((element, index) => {
                if (element.getAttribute('view') === 'true') {
                    view = element
                    if (index >= 1) {
                        next = slide[index - 1]
                    }
                }
            });
            view.setAttribute('view', 'false')
            if (!next) {
                next = slide[slide.length - 1]
            }
            if (next) {
                next.setAttribute('view', 'true')
                next.setAttribute("position", "right")
            }
        }
    }

    return (
        <div className="slide-image">
            <div className="list" onTouchStart={(event) => setPosition(event.touches[0].clientX)} onTouchEnd={(event) => {
                const element = event.target.parentElement
                if (event.changedTouches[0].clientX < position - 120) {
                    slideRoller(element, true)
                } else if (event.changedTouches[0].clientX > position + 120) {
                    slideRoller(element)
                }
            }}>
                {lista.map((item, index) => {
                    return (
                        <div className="slide-div item" key={"img" + index} view={index === 0 ? "true" : "false"}>
                            <img src={item} alt="" />
                        </div>
                    )
                })}
            </div>

            <nav>
                {lista.map((item, index) => {
                    return (
                        <span key={item + index} className="select-img" index={index} selected={index === 0 ? "true": ""} onClick={({ target }) => {
                            const links = target.parentElement.querySelectorAll("span")

                            links.forEach(el => {
                                if (el === target) {
                                    el.setAttribute("selected", "true")
                                } else {
                                    el.removeAttribute("selected")
                                }
                            })

                            const slide = target.parentElement.parentElement.querySelectorAll(".list .slide-div")

                            slide.forEach((el, index) => {
                                el.removeAttribute("position")
                                if (index !== Number(target.getAttribute("index"))) {
                                    el.removeAttribute("view")
                                } else {
                                    el.setAttribute("view", "true")
                                }
                            });

                        }}></span>
                    )
                })}
            </nav>
        </div>
    )
}

