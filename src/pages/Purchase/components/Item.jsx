import { useContext, useEffect, useState } from "react";
import { numberForBrl } from "../../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { DataContext } from "../../../context/DataContext";

export default function Item({ item, index, list, setSelectedProd }) {
    const { cart, setCart, newNotification } = useContext(DataContext)
    const { nome, valor, lista_img } = item

    const [quant, setQuant] = useState(1)

    useEffect(() => {
        list[index].quant = quant
    }, [quant, index, list])

    const remove = () => {
        newNotification(2, "Remover do carrinho", "Tem certeza que quer remover esse produto?", () => {
            const newList = cart.filter((va, i) => i !== index)
            localStorage.setItem("eshop:cart", JSON.stringify(newList))
            setCart(newList)
        })
    }

    return (
        <div className="item">
            <div className="info">
                <h4 onClick={() => setSelectedProd(item)}>
                    {nome}
                    <span>{numberForBrl(valor)}</span>
                </h4>

                <nav>
                    <button onClick={remove}><span>Remover</span><FontAwesomeIcon icon={faTrash} /></button>
                    <div className="quant">
                        <FontAwesomeIcon icon={faMinus} onClick={() => quant > 1 && setQuant(quant - 1)} />
                        <p className="q">{quant}</p>
                        <FontAwesomeIcon icon={faPlus} onClick={() => setQuant(quant + 1)} />
                        {quant > 1 && <p>{numberForBrl(valor * quant)}</p>}
                    </div>
                </nav>

            </div>
            <img src={lista_img[0]} alt="" />

        </div>
    )
}