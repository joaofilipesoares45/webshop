import { faArrowLeft, faCartArrowDown, faCartPlus, faCheck, faPaperclip, faShare, faStar } from "@fortawesome/free-solid-svg-icons"
import { numberForBrl, openModal } from "../utils/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { DataContext } from "../context/DataContext"
import SlideImage from "./SlideImage"

export default function ViewProduct({ product, close }) {
    const { cart, setCart, newNotification } = useContext(DataContext)

    const { nome, descricao, valor, lista_img } = product
    const [reviews, setReviews] = useState([])

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
        const ct = cart.map(el => { return el.nome })

        if (ct.includes(nome)) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="modal view-product" open>
            <div className="content">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => close()} />

                <SlideImage lista={lista_img}>
                    <nav>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <FontAwesomeIcon icon={faShare} />
                    </nav>
                </SlideImage>

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
                            <button style={{ backgroundColor: "blue", "--color": "blue", }} onClick={() =>
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