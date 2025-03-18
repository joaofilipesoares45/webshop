import { useState } from "react"
import './index.css'
import Login from "./components/Login"
import CreateAcount from "./components/CreateAcount"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'

export default function Log() {

    const [form, setForm] = useState(true)

    const changeForm = ({ target }) => {
        if (target.classList[0] === 'form-change') {
            form ? setForm(false) : setForm(true)
        }
    }

    return (
        <div className="page log" onClick={changeForm}>
            <div className="view">
                <div className="logo">
                    <h1>
                        <a href="/webshop">
                            <span>eShop <p>loja online <FontAwesomeIcon icon={solid.faCartShopping} /></p></span>
                        </a>
                    </h1>
                </div>

                <div className="form">
                    <div className="paint">
                        <h1>
                            <a href="/">eShop <FontAwesomeIcon icon={solid.faShoppingCart} /></a>
                        </h1>
                    </div>

                    {form ? <Login /> : <CreateAcount />}
                    <span>Prencha os dados para prosseguir!</span>
                </div>

            </div>

        </div>
    )
}