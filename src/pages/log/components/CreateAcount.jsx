import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import { apiConnection, formCaptureData } from "../../../utils/functions"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../context/DataContext"
import {useNavigate} from "react-router"

const userPatern = ['nome', 'idade', 'email', 'senha', 'cidade', 'uf']
const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
    "DF"
];

export default function CreateAcount() {

    const { newNotification } = useContext(DataContext)
    const navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        const { target } = event

        const loginObj = formCaptureData(target)

        if (!loginObj.nome || !loginObj.email || !loginObj.senha || !loginObj.idade || !loginObj.cidade || !loginObj.uf) {
            let msg = 'Preencha o campo: \n'
            userPatern.forEach((key, index) => {
                if (loginObj[key] === undefined) {
                    msg += key
                    if (index < userPatern.length - 1) {
                        msg += '\n'
                    }
                }
            })

            return newNotification(1, 'Erro', msg)
        }

        if (loginObj.senha.length < 8) {
            return newNotification(1, 'Erro', 'Sua senha deve possuir pelo menos 8 caracteres')
        }

        if (!ufs.includes(loginObj.uf)) {
            return newNotification(1, 'Erro', 'UF inválida')
        }

        loginObj.nivel = 'basico'
    
        const result = await apiConnection('users', 'post', loginObj).then(data => { return data })
        if (result.status === 200) {
            localStorage.setItem('eshop:user', JSON.stringify(result.data))
            newNotification(1, 'Login bem sucedido', 'Bem Vindo(a) ' + result.data.nome)
            setTimeout(() => navigate('/webshop'), 3000) 
        } else if (result.status === 404) {
            return newNotification(1, 'Erro', result.msg)
        }
    }

    const [icon, setIcon] = useState(true)
    const [Uf, setUf] = useState()
    const [municipios, setMunicipios] = useState([])

    useEffect(() => {
        const getCities = async () => {
            if (Uf) {
                const cities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${Uf}/municipios`).then(res => res.json()).then(data => { return data })
                setMunicipios(cities)
            }
        }

        getCities()
    }, [Uf])

    return (
        <form onSubmit={submit}>
            <div className="inputs">
                <h2>
                    Nova Conta
                    <p>Preencha os dados para logar</p>
                </h2>
                <div>
                    <label htmlFor="nome">nome</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email" />
                </div>

                <div>
                    <label htmlFor="uf">idade</label>
                    <input type="number" id="idade" name="idade" />
                </div>

                <div className="group">
                    <div>
                        <label htmlFor="uf">uf (estado)</label>
                        <input type="text" id="uf" name="uf" list="ufs-list" value={Uf} onChange={({ target }) => setUf(target.value)} />
                        <datalist id="ufs-list">
                            {ufs.map(el => {
                                return <option key={el} value={el}>{el}</option>
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="cidade">cidade</label>
                        <input type="text" id="cidade" name="cidade" list="cities-list" />
                        <datalist id="cities-list">
                            {municipios.map(el => { return el.nome }).map(el => {
                                return <option key={el} value={el}>{el}</option>
                            })}
                        </datalist>
                    </div>
                </div>
                <div>
                    <label htmlFor="senha">senha - <span>Minimo 8 caracteres</span></label>
                    <input type={icon ? 'password' : 'text'} id="senha" name="senha" />
                    <FontAwesomeIcon icon={icon ? solid.faEye : solid.faEyeSlash} onClick={() => icon ? setIcon(false) : setIcon(true)} />

                </div>
            </div>
            <nav>
                <p className="form-change">Já tem uma conta!</p>
                <button className="submit">Login <FontAwesomeIcon icon={solid.faDoorOpen} /></button>
            </nav>
        </form>
    )
}