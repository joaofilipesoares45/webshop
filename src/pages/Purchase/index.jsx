import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context/DataContext"
import { useNavigate } from "react-router"
import { baseUrl, formCaptureData, numberForBrl } from "../../utils/functions"
import "./index.css"
import Item from "./components/item"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import ViewProduct from "../../components/ViewProduct"

const purchasePattern = {
    costumerid: undefined,
    products: undefined,
    total: undefined,
    cpf: undefined,
    paymethod: undefined,
    cep: undefined,
    bairro: undefined,
    cidade: undefined,
    uf: undefined,
    rua: undefined,
    complemento: undefined,
    numero: undefined,
    data: undefined,
    hora: undefined,
}

export default function Purchase() {

    const { usuarioAtual, cart, pedidos, newNotification } = useContext(DataContext)
    const [list, setList] = useState([])
    const [selectedProd, setSelectedProd] = useState()
    const navigate = useNavigate()
    if (cart.length === 0) {
        navigate(baseUrl)
    }
    const [address, setAddress] = useState()
    const { register, setValue } = useForm({
        defaultValues: {
            cidade: "",
            uf: "",
            rua: "",
            bairro: "",
            complemento: ""
        }
    })

    useEffect(() => {
        if (address) {
            setValue('cidade', address.localidade)
            setValue('uf', address.uf)
            setValue('rua', address.logradouro)
            setValue('bairro', address.bairro)
            setValue('complemento', address.complemento)
        } else {
            setValue('cidade', "")
            setValue('uf', "")
            setValue('rua', "")
            setValue('bairro', "")
            setValue('complemento', "")
        }
    }, [address])

    useEffect(() => {
        const l = cart.map((item) => {
            return { product: item, quant: 1 }
        })
        setList(l)
    }, [cart])

    const open_close_div = ({ target }) => {
        const parent = target.parentElement.parentElement
        if (target.hasAttribute("open")) {
            target.removeAttribute("open", "")
            parent.style.height = "58.71px"
        } else {
            target.setAttribute("open", "")
            parent.style.height = "100%"
        }
    }

    const total = () => {
        let price = 0

        list.map(({ product, quant }) => {
            price += product.valor * quant
        })

        return price
    }

    const submit = (event) => {
        event.preventDefault()
        const { target } = event
        target.parentElement.parentElement.querySelectorAll("form").forEach((el) => {
            const form = formCaptureData(el)
            Object.keys(form).forEach((key) => {
                purchasePattern[key] = form[key]
            })
        })
        purchasePattern.costumerid = usuarioAtual.id
        purchasePattern.total = total()
        purchasePattern.products = list

        if (pedidos.length === 0 ) {
            localStorage.setItem("eshop:purchases", JSON.stringify([purchasePattern])) 
        }else {
            localStorage.setItem("eshop:purchases", JSON.stringify([...pedidos, purchasePattern]))
        }
        newNotification(1, "Parabéns", "Sua compra foi finalizada, aguarde a comfirmação do pedido pelo whatsapp")

        setTimeout(() => {
            localStorage.removeItem("eshop:cart")
            navigate(baseUrl)
        }, 3000)
    }

    return (
        <div className="page purchase">
            <div className="resumo">
                <div className="list description-div">
                    <h3>Lista de produtos <FontAwesomeIcon icon={faChevronDown} open={true} onClick={open_close_div} /></h3>
                    {list.map((item, index) => {
                        return <Item index={index} item={item.product} key={"itemr" + index} list={list} setSelectedProd={setSelectedProd} />
                    })}

                    <h5 className="total-price">Total: {numberForBrl(total())}</h5>
                </div>

                <form className="description-div" autoComplete="none">
                    <h3>Formulario de Pagamento <FontAwesomeIcon icon={faChevronDown} open={true} onClick={open_close_div} /></h3>
                    <h4>Total a pagar: <span>{numberForBrl(total())}</span></h4>
                    <div className="inputs">
                        <div>
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" name="cpf" id="cpf" />
                        </div>

                        <div>
                            <label htmlFor="paymethod">Metodo de pagamento</label>
                            <input type="text" name="paymethod" id="paymethod" onFocus={({ target }) => {
                                target.parentElement.querySelector(".select-method").setAttribute("open", "")

                            }} onBlur={({ target }) => {
                                setTimeout(() => {
                                    target.parentElement.querySelector(".select-method").removeAttribute("open")
                                }, 100)
                            }} />
                            <span className="select-method" onClick={({ target }) => {
                                target.parentElement.parentElement.querySelector("input").value = target.value
                            }}>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Pix">Pagamento pix</option>
                                <option value="Boleto Bancario">Boleto Bancario</option>
                            </span>
                        </div>
                    </div>
                </form>

                <form className="description-div" autoComplete="none">
                    <h3>Endereço de Entrega <FontAwesomeIcon icon={faChevronDown} open={true} onClick={open_close_div} /></h3>
                    <div className="inputs">
                        <div>
                            <label htmlFor="cep">CEP</label>
                            <input type="number" name="cep" id="cep" onKeyUp={({ target }) => {
                                const { value } = target
                                if (value.length === 8) {
                                    fetch(`https://viacep.com.br/ws/${value}/json/`).then(res => res.json()).then(data => {
                                        setAddress(data);
                                    })
                                } else {
                                    setAddress()
                                }
                            }} />
                        </div>
                        <div>
                            <label htmlFor="rua">Logradouro (rua)</label>
                            <input type="text" name="rua" id="rua" {...register("rua")} />
                        </div>
                        <div>
                            <label htmlFor="numero">numero</label>
                            <input type="number" name="numero" id="numero" />
                        </div>
                        <div>
                            <label htmlFor="bairro">Bairro</label>
                            <input type="text" name="bairro" id="bairro" {...register("bairro")} />
                        </div>
                        <div>
                            <label htmlFor="cidade">Cidade</label>
                            <input type="text" name="cidade" id="cidade" {...register("cidade")} />
                        </div>
                        <div>
                            <label htmlFor="uf">Uf (estado)</label>
                            <input type="text" name="uf" id="uf" {...register("uf")} />
                        </div>
                        <div>
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" name="complemento" id="complemento" {...register("complemento")} />
                        </div>
                    </div>
                </form>
                <nav className="bottom description-div">
                    <button type="submit" onClick={submit}>Confirmar <FontAwesomeIcon icon={faCheck} /></button>
                </nav>
            </div>
            {selectedProd && <ViewProduct product={selectedProd} close={setSelectedProd} />}
        </div>
    )
}  