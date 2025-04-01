import { faArrowRight, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { baseUrl, closeModal, numberForBrl } from "../utils/functions"
import { useNavigate } from "react-router"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export default function Cart({ list, set }) {
    const {usuarioAtual, newNotification}= useContext(DataContext)

    const navigate = useNavigate()

    const remove = (index) => {
        const newList = list.filter((value, i) => i !== index)
        localStorage.setItem("eshop:cart", JSON.stringify(newList))
        set(newList)
    }

    return (
        <div className="modal cart">
            <div className="content">
                <div className="top">
                    <h2>Carrinho <FontAwesomeIcon icon={faXmark} onClick={() => closeModal()} /></h2>

                    <div className="list">
                        {list.length > 0 ? list.map((item, index) => {
                            return (
                                <div key={index} className="item">
                                    <div className="info">
                                        <h4>
                                            {item.nome}
                                            <p>{numberForBrl(item.valor)}</p>
                                        </h4>

                                        <img src={item.lista_img[0]} alt="" />
                                    </div>

                                    <nav>
                                        <button onClick={() => remove(index)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </nav>
                                </div>
                            )
                        }) : <div onClick={() => closeModal()} className="none"> <button>Nada no carrinho, retorne as suas compras!</button></div>}
                    </div>
                </div>

                {list.length > 0 && <button className="next" onClick={() => {
                    if (usuarioAtual) {
                        navigate(baseUrl + "/purchase")
                    }else {
                        newNotification(2, "Erro", "Faça login para prosseguir!", () => {
                            navigate(baseUrl + "/login")
                        })
                    }
                    
                }}>Finalizar compra <FontAwesomeIcon icon={faArrowRight} /></button>}
            </div>
        </div>
    )
}