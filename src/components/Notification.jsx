import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from '@fortawesome/free-solid-svg-icons'
import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import { closeModal } from "../utils/functions"

export default function Notification() {
    const { dataNotification, setDataNotification } = useContext(DataContext)

    let { type, title, text, fn } = dataNotification

    const exec = () => {
        fn()
        setDataNotification({})
        closeModal('notification')
    }

    return (
        <div className="modal notification" type={type}>
            {dataNotification.type &&
                <div className="content" type={type}>
                    <h3>{title}
                        <FontAwesomeIcon icon={solid.faXmark} onClick={() => {
                            setDataNotification({})
                            closeModal('notification')
                        }} />
                    </h3>
                    <div className="msg">
                        <h4>{text}</h4>

                        {type === 2 &&
                            <nav>
                                <button onClick={exec}>Sim</button>
                                <button onClick={() => {
                                    setDataNotification({})
                                    closeModal('notification')
                                }}>Não</button>
                            </nav>
                        }
                    </div>

                </div>}
        </div>
    )
}