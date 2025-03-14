import { faCartArrowDown, faCartPlus, faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { numberForBrl, openModal } from "../utils/functions";
import { DataContext } from "../context/DataContext";

export default function SlideDiv({ item, list, set, index, select }) {
    const { newNotification, favoritos, setFavoritos } = useContext(DataContext)
    const { nome, descricao, valor, lista_img } = item

    const [img, setImg] = useState(0)
    const changeImg = () => {
        if (img < lista_img.length - 1) {
            setImg(img + 1)
        } else {
            setImg(0)
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

    const addCart = (produto) => {
        const local = localStorage.getItem("eshop:cart")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:cart", JSON.stringify(list))
            set(list)
        } else {
            localStorage.setItem("eshop:cart", JSON.stringify([produto]))
            set([produto])
        }
        // set([...list, produto])
        newNotification(2, "Produto adicionado ao carrinho!", "Ir para a compra?", () => openModal('cart'))
    }

    const removeFavorite = (filter) => {
        const list = favoritos
        const newList = list.filter(({nome}) => nome !== filter)
        
        localStorage.setItem("eshop:favorites", JSON.stringify(newList))
        setFavoritos(newList)
    }

    const isInFavorites = () => {
        const fav = favoritos.map(el => {return el.nome})

        if (fav.includes(nome)) {
            return true
        }else{
            return false
        }
    }

    const isInCart = () => {
        const ct = list.map(el => {return el.nome})

        if (ct.includes(nome)) {
            return true
        }else {
            return false
        }
    }

    return (
        <div className="slide-div" view={index === 0 ? 'true' : 'false'} >
            <span className="info" onClick={() => select(item)}>
                <h3>{nome}
                    <sub>{descricao}</sub>
                </h3>

                <p>{numberForBrl(valor)}</p>
            </span>

            <img src={lista_img[img]} alt="" onClick={changeImg} />

            <nav>
                {isInFavorites() ? <FontAwesomeIcon icon={faHeartCircleCheck} onClick={() => removeFavorite(nome)}/> : <FontAwesomeIcon icon={faHeart} onClick={() => addFavorito(item)} />}       
                {isInCart() ? <FontAwesomeIcon icon={faCartArrowDown} /> : <FontAwesomeIcon icon={faCartPlus} onClick={() => addCart(item)} />}
            </nav>
        </div>
    )
}