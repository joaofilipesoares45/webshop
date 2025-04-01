import { faChevronLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { numberForBrl } from "../utils/functions"


export default function Orders({ setView, setSelectedProd }) {
    const { pedidos } = useContext(DataContext)

    return (
        <div className="top orders">
            <h2>Pedidos <FontAwesomeIcon icon={faChevronLeft} onClick={() => setView()} /></h2>
            <div className="list">
                {pedidos.map((item, index) => {
                    const { products, total } = item

                    return (
                        <div className="item" key={"order" + index}>
                            <div className="info">
                                <h4>
                                    {products.map(({ product }, index) => {
                                        return <span key={"prod"+ index} onClick={() => setSelectedProd(product)}>{product.nome}</span>
                                    })}
                                    <p>Total: {numberForBrl(total)}</p>

                                </h4>
                                <div className="img">
                                    {products.map(({ product }) => {
                                        return <img src={product.lista_img[0]} alt="" className="micro" key={"img"+ product.lista_img[0]} onClick={() => setSelectedProd(product)}/>
                                    })}
                                </div>
                            </div>
                            <nav>
                                <button><FontAwesomeIcon icon={faEllipsisV}/></button>
                            </nav>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 