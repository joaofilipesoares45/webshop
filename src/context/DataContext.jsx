import { createContext, useEffect, useState } from "react";
import { apiConnection, closeModal, openModal } from "../utils/functions";


const getList = async (path, set) => {
    const list = await apiConnection(path, 'get')
    set(list)
}

export const DataContext = createContext();

export function DataProvider({ children }) {

    const [component, setComponent] = useState()

    const [usuarioAtual, setUsuarioAtual] = useState()
    const [usuarios, setUsuarios] = useState([])
    const [favoritos, setFavoritos] = useState([])
    const [cart, setCart] = useState([])
    const [pedidos, setPedidos] = useState([])

    const [dataNotification, setDataNotification] = useState({})

    const newNotification = (type, title, text, fn) => {
        switch (type) {
            case 1:
                setDataNotification({ type, title, text })
                break;
            case 2:
                setDataNotification({ type, title, text, fn })
                break;
        }
        openModal('notification')
        if (type !== 2) {
            setTimeout(() => {
                setDataNotification({})
                closeModal('notification')
            }, 3000)
        }
    }

    useEffect(() => {
        getList("users", setUsuarios)
    }, [usuarios])

    useEffect(() => {
        if (localStorage.getItem("eshop:user") !== null) {
            setUsuarioAtual(JSON.parse(localStorage.getItem("eshop:user")))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("eshop:purchases") !== null) {
            setPedidos(JSON.parse(localStorage.getItem("eshop:puschases")))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("eshop:favorites") !== null) {
            setFavoritos(JSON.parse(localStorage.getItem("eshop:favorites")))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("eshop:cart") !== null) {
            setCart(JSON.parse(localStorage.getItem("eshop:cart")))
        }
    }, [])

    const value = {
        usuarioAtual,
        setUsuarioAtual,

        usuarios,
        setUsuarios,

        component,
        setComponent,

        dataNotification,
        setDataNotification,
        newNotification,

        favoritos,
        setFavoritos,
        cart,
        setCart,
        pedidos,
        setPedidos,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}