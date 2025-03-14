import { faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "../utils/functions";
import {  useState } from "react";

import Favorites from "./Favorites";


export default function Perfil() {
    const [view, setView] = useState()
    
    const logOut = () => {
        console.log("Deslogado.");
    }

    const changeView = (vw) => {
        let html
        switch (vw) {
            case 'favoritos':
                html = <Favorites setView={setView}/>
                break;
            default:
                setView()
                break;
        }

        setView(html)
    }

    return (
        <div className="modal perfil">
            <div className="content">

                <div className="top">
                    <h2>Perfil <FontAwesomeIcon icon={faXmark} onClick={() => closeModal()} /></h2>
                    <nav>
                        <button>Minha conta</button>
                        <button onClick={() => changeView('favoritos')}>Favoritos</button>
                        <button>Editar perfil</button>
                    </nav>
                </div>

                {view && <div className="view">
                    {view}
                </div>}

                <button className="logout" onClick={logOut}>Desconectar <FontAwesomeIcon icon={faRightFromBracket} /></button>
            </div>
        </div>
    )
}