import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "../utils/functions";
import {  useState } from "react";
import Favorites from "./Favorites";
import MyAcount from "./MyAcount";


export default function Perfil() {
    const [view, setView] = useState()

    const changeView = (vw) => {
        let html
        switch (vw) {
            case 'favoritos':
                html = <Favorites setView={setView}/>
                break;
            case 'my-acount':
                html = <MyAcount setView={setView}/>
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
                        <button onClick={() => changeView('my-acount')}>Minha conta</button>
                        <button onClick={() => changeView('favoritos')}>Favoritos</button>
                        <button>Meus pedidos</button>
                    </nav>
                </div>

                {view && <div className="view">
                    {view}
                </div>}
            </div>
        </div>
    )
}