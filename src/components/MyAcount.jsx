import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { faChevronLeft, faPen, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router"
import { baseUrl, logOut } from "../utils/functions";

export default function MyAcount({ setView }) {
    const navigate = useNavigate()

    const { usuarioAtual, setUsuarioAtual } = useContext(DataContext)

    const condition = usuarioAtual !== undefined
    
    return (
        <div className="top my-acount">
            <h2>Minha conta <FontAwesomeIcon icon={faChevronLeft} onClick={() => setView()} /></h2>
            {condition ? <div className="info">

                <div className="head">
                    <div className="img">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <h3>{usuarioAtual.nome}</h3>
                    <h4>{usuarioAtual.email}</h4>
                </div>
                <nav>
                    <button>Editar perfil <FontAwesomeIcon icon={faPen} /></button>
                    <button className="logout" onClick={() => {logOut(); setUsuarioAtual()}}>Desconectar <FontAwesomeIcon icon={faRightFromBracket} /></button>
                </nav>

            </div> : <div className="none"><h3>Você ainda não está logado!</h3><button onClick={() => navigate(baseUrl+"/login")}>Fazer login</button></div>
            }
        </div>
    )

}