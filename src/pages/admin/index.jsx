import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { DataContext } from "../../context/DataContext"
import { baseUrl } from "../../utils/functions"

export default function AdminPage() {
    const { usuarioAtual } = useContext(DataContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (usuarioAtual.nivel !== "admin") {
            navigate(baseUrl + "/")
        }
    }, [usuarioAtual, navigate])

    return (
        <div className="page admin">
            <h1>Admin</h1>
        </div>
    )
}