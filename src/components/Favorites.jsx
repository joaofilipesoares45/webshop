import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { faCartShopping, faChevronLeft, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { closeModal, numberForBrl, openModal } from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Favorites({ setView }) {

    const { favoritos, setFavoritos, setCart } = useContext(DataContext)

    const remove = (index) => {
        const list = favoritos
        const newList = list.filter((value, i) => i !== index)
        localStorage.setItem("eshop:favorites", JSON.stringify(newList))
        setFavoritos(newList)
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
        closeModal('perfil')
        openModal('cart')
    }

    return (
        <div className="top">
            <h2>Favoritos <FontAwesomeIcon icon={faChevronLeft} onClick={() => setView()} /></h2>

            <div className="list">
                {favoritos.map((item, index) => {
                    return (
                        <div key={item.nome + index} className="item">

                            <div className="info">
                                <h4>
                                    {item.nome}
                                    <p>{numberForBrl(item.valor)}</p>
                                </h4>
                                <img src={item.lista_img[0]} alt="" />
                            </div>
                            <nav>
                                <button onClick={() => remove(index)}><FontAwesomeIcon icon={faHeartBroken} /></button>
                                <button onClick={() => { addCart(item); remove(index) }}><FontAwesomeIcon icon={faCartShopping} /></button>
                            </nav>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}