import { faArrowLeft, faCartArrowDown, faCartPlus, faCheck, faChevronLeft, faChevronRight, faPaperclip, faShare, faStar } from "@fortawesome/free-solid-svg-icons"
import { numberForBrl, openModal } from "../utils/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { DataContext } from "../context/DataContext"

export default function ViewProduct({ product, close }) {
    const { cart, setCart, newNotification } = useContext(DataContext)

    const { nome, descricao, valor, lista_img } = product
    const [reviews, setReviews] = useState([])

    const slideRoller = (target, position) => {
        const slide = target.parentElement.querySelectorAll('.slide-div')
        if (position) {
            let next
            slide.forEach((element, index) => {
                if (index < slide.length - 1) {
                    if (element.getAttribute('view') === 'true') {
                        element.setAttribute('view', 'false')
                        next = slide[index + 1]
                    }
                }
            });
            if (next) {
                next.setAttribute('view', 'true')
            }

        } else {
            slide.forEach((element, index) => {
                if (index >= 1) {
                    if (element.getAttribute('view') === 'true') {
                        slide[index - 1].setAttribute('view', 'true')
                        element.setAttribute('view', 'false')
                    }
                }

            });
        }
    }

    const newReview = (event) => {
        event.preventDefault()
        const { target } = event

        const text = target.querySelector('textarea').value
        const type = target.querySelector('input[name=clasf]:checked').id

        if (text.length > 0 && type) {
            setReviews([...reviews, { user: 'Nome do Usuario', text, type }])
        }
        target.querySelector('textarea').value = ''
    }

    const addCart = (produto) => {
        const local = localStorage.getItem("eshop:cart")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:cart", JSON.stringify(list))
        } else {
            localStorage.setItem("eshop:cart", JSON.stringify([produto]))
        }
        setCart([...cart, produto])
        newNotification(2, "Produto adicionado ao carrinho!", "Ir para a compra?", () => {
            close()
            openModal('cart')
        })
    }

    const isInCart = () => {
        const ct = cart.map(el => {return el.nome})

        if (ct.includes(nome)) {
            return true
        }else {
            return false
        }
    }

    return (
        <div className="modal view-product" open>
            <div className="content">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => close()} />
                <div className="slide">
                    <FontAwesomeIcon icon={faChevronLeft} className="roll-high" onClick={({ target }) => slideRoller(target)} />
                    <FontAwesomeIcon icon={faChevronRight} className="roll-high" onClick={({ target }) => slideRoller(target, true)} />
                    {lista_img.map((el, index) => {
                        return <div className="slide-div" key={nome + "img" + index} view={index === 0 ? 'true' : 'false'} ><img src={el} alt="" /></div>
                    })}

                    <nav>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <FontAwesomeIcon icon={faShare} />
                    </nav>

                </div>

                <div className="info">
                    <h3>
                        <span>{nome}
                            <p>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </p>
                        </span>
                        {numberForBrl(valor)}
                    </h3>

                </div>

                <div className="description">
                    <h4>{descricao}</h4>
                    <h5>
                        <span>6un em estoque<FontAwesomeIcon icon={faCheck} /></span>
                    </h5>

                    <nav>
                        {isInCart() ? 
                        <button style={{backgroundColor:"blue", "--color": "blue",}} onClick={() => 
                            newNotification(2, "Produto adicionado ao carrinho!", "Ir para a compra?", () => {
                                close()
                                openModal('cart')
                            })
                        }>No carrinho<FontAwesomeIcon icon={faCartArrowDown} /></button> : 
                        <button onClick={() => { addCart(product) }}>Adicionar ao carrinho<FontAwesomeIcon icon={faCartPlus} /></button>}
                    </nav>
                </div>

                <div className="feedback">
                    {reviews.length > 0 ?
                        <div className="list">
                            <h4>Reviews:</h4>
                            {reviews.map((item, index) => {
                                const { user, text, type } = item
                                return (
                                    <div className="item" key={index + `asdjbhasj`} type={type}>
                                        <h5>{user}</h5>
                                        <p>{text}</p>
                                    </div>
                                )
                            })}
                        </div> :
                        <div className="none">
                            <h5>Este produto não recebeu nenhum feedback</h5>
                        </div>
                    }
                    <form onSubmit={newReview}>
                        <label htmlFor="">Deixe seu comentario sobre o produto <button type="submit">Enviar</button></label>
                        <textarea></textarea>
                        <div>
                            <label htmlFor="bom">Bom</label>
                            <input type="radio" id="bom" name="clasf" />
                            <label htmlFor="ruim">Ruim</label>
                            <input type="radio" id="ruim" name="clasf" />
                        </div>

                    </form>
                </div>

                <div className="more-options">

                </div>
            </div>

        </div>
    )

}