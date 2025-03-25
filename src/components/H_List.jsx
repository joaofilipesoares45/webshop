import { faHeart, faHeartCircleCheck, faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { numberForBrl } from "../utils/functions"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export default function Hlist({ list, select }) {
    const { cart, favoritos, setCart, setFavoritos } = useContext(DataContext)

    const isInFavorites = ({ nome }) => {
        const fav = favoritos.map(el => { return el.nome })

        if (fav.includes(nome)) {
            return true
        } else {
            return false
        }
    }

    const isInCart = ({ nome }) => {
        const ct = cart.map(el => { return el.nome })

        if (ct.includes(nome)) {
            return true
        } else {
            return false
        }
    }

    const addCart = (produto) => {
        const local = localStorage.getItem("eshop:cart")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:cart", JSON.stringify(list))
            setCart(list)
        } else {
            localStorage.setItem("eshop:cart", JSON.stringify([produto]))
            setCart([produto])
        }
    }

    const addFavorito = (produto) => {
        const local = localStorage.getItem("eshop:favorites")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:favorites", JSON.stringify(list))
            setFavoritos(list)
        } else {
            localStorage.setItem("eshop:favorites", JSON.stringify([produto]))
            setFavoritos([produto])
        }
    }


    const removeFavorite = (filter) => {
        const list = favoritos
        const newList = list.filter(({ nome }) => nome !== filter)

        localStorage.setItem("eshop:favorites", JSON.stringify(newList))
        setFavoritos(newList)
    }

    return (
        <div className="h-list list" id="offer">
            {list.map((item, index) => {
                const { nome, valor, lista_img } = item
                return (
                    <div key={"itemll" + index} className="item">
                        <nav>
                            {isInFavorites(item) ? <FontAwesomeIcon icon={faHeartCircleCheck} onClick={() => removeFavorite(nome)} /> : <FontAwesomeIcon icon={faHeart} onClick={() => addFavorito(item)} />}
                            {isInCart(item) ? <FontAwesomeIcon icon={faCartArrowDown} /> : <FontAwesomeIcon icon={faCartPlus} onClick={() => addCart(item)} />}
                        </nav>
                        <div className="img" >
                            <img src={lista_img[0]} alt="" />
                        </div>
                        <div className="info" onClick={() => select(item)}>
                            <h4>{nome}</h4>
                            <p>{numberForBrl(valor)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}