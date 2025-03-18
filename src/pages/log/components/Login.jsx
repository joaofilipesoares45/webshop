import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import { apiConnection, baseUrl, formCaptureData } from "../../../utils/functions"
import { useContext, useState } from "react"
import { DataContext } from "../../../context/DataContext"
import { useNavigate } from "react-router"

const loginPatern = ['email', 'senha']

export default function Login() {

    const { newNotification } = useContext(DataContext)
    const navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        const { target } = event

        const loginObj = formCaptureData(target)

        if (!loginObj.email || !loginObj.senha) {
            let msg = 'Preencha o campo: \n'
            loginPatern.forEach((key, index) => {
                if (loginObj[key] === undefined) {
                    msg += key
                    if (index < loginPatern.length - 1) {
                        msg += '\n'
                    }
                }
            })
            return newNotification(1, 'Erro', msg)
        }

        if (loginObj.senha.length < 8) {
            return newNotification(1, 'Erro', 'A senha deve ter pelo menos 8 caractéres')
        }

        const result = await apiConnection('login', 'post', loginObj).then(data => { return data })

        if (result === undefined) {
            return newNotification(1, "Erro no servidor", 'Tente mais tarde!')
        }
        if (result.status === 200) {
            localStorage.setItem('eshop:user', JSON.stringify(result.data))
            newNotification(1, 'Login bem sucedido', 'Bem Vindo(a) de volta ' + result.data.nome)
            setTimeout(() => {
                return navigate(baseUrl)
            }, 3000)
        
        } else if (result.status === 404) {
            return newNotification(1, 'Erro', result.msg)
        }
    }

    const [icon, setIcon] = useState(true)

    return (
        <form onSubmit={submit}>
            <div className="inputs">
                <h2>
                    Bem Vindo
                    <p>Faça login com sua conta</p>
                </h2>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="senha">senha</label>
                    <input type={icon ? 'password' : 'text'} id="senha" name="senha" />
                    <FontAwesomeIcon icon={icon ? solid.faEye : solid.faEyeSlash} onClick={() => icon ? setIcon(false) : setIcon(true)} />
                </div>
            </div>
            <nav>
                <p className="form-change">Ainda não tem uma conta!</p>
                <button className="submit">Login <FontAwesomeIcon icon={solid.faDoorOpen} /></button>
            </nav>
        </form>
    )
}