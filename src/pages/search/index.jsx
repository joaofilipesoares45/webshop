import { useNavigate } from "react-router"
import "./index.css"
import { formCaptureData, numberForBrl } from "../../utils/functions"
import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faMagnifyingGlass, faHeartCircleCheck, faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import ViewProduct from "../../components/ViewProduct";
import { DataContext } from "../../context/DataContext";
import Footer from "../../components/footer";

const produtos = [
    {
        id: 1,
        nome: 'Pc Gamer Fênix X50, NVIDIA GeForce RTX 4070',
        descricao: "Processador Intel Core i7-13700K, Placa de Vídeo NVIDIA GeForce RTX 4070, Memória RAM 32 GB DDR5, Armazenamento 1 TB SSD NVMe, Gabinete Corsair 4000D Airflow com 3 Fans RGB, Placa Mãe ASUS ROG Strix Z790-A Gaming WiFi, Fonte Corsair RM850x (2021)",
        valor: 8500,
        lista_img: ["/webshop/pcgamer.jpg", "/webshop/sample_0 (7).jpg"],
        categoria: "gamer"
    },
    {
        id: 1,
        nome: "Fone de Ouvido Gamer HyperX Cloud Stinger Core",
        descricao: "Experimente um som imersivo com o HyperX Cloud Stinger Core. Com drivers de 40mm, microfone com cancelamento de ruído e design leve, ele é perfeito para longas sessões de jogo.",
        valor: 299.90,
        lista_img: ["/webshop/fone.jpg"],
        categoria: "eletronicogamer"
    },
    {
        id: 2,
        nome: "Smart TV Samsung 55 polegadas 4K",
        descricao: "Desfrute de imagens impecáveis com a Smart TV Samsung 55 polegadas 4K. Com resolução 4 vezes maior que o Full HD, você terá cores vibrantes e detalhes impressionantes. Explore o mundo do streaming com o sistema Tizen e conecte-se com seus dispositivos favoritos via Bluetooth.",
        valor: 2999.00,
        lista_img: ["/webshop/sample_0 (10).jpg"],
        categoria: "smart"
    },
    {
        id: 3,
        nome: "Smartphone Xiaomi Redmi Note 11",
        descricao: "O Redmi Note 11 é a escolha perfeita para quem busca um smartphone com ótimo custo-benefício. Com tela AMOLED de 90Hz, câmera de 50MP e bateria de longa duração, ele oferece performance e design impecáveis.",
        valor: 1499.00,
        lista_img: ["/webshop/sample_0 (8).jpg"],
        categoria: "smart"
    },
    {
        id: 4,
        nome: "Câmera Digital Sony Alpha 6400",
        descricao: "Libere o fotógrafo que existe em você com a Sony Alpha 6400. Com sensor APS-C de 24.2MP, foco automático rápido e gravação de vídeo 4K, ela é ideal para capturar momentos incríveis com qualidade profissional.",
        valor: 4999.00,
        lista_img: ["/webshop/camera.jpg"],
        categoria: "camera"
    },
    {
        id: 5,
        nome: "Tablet Samsung Galaxy Tab S8",
        descricao: "O Galaxy Tab S8 é a combinação perfeita de produtividade e entretenimento. Com tela AMOLED de 11 polegadas, S Pen integrada e processador potente, ele é ideal para trabalho, estudo e lazer.",
        valor: 5999.00,
        lista_img: ["/webshop/ipad.jpg"],
        categoria: "smart"
    },
]

export default function Search({ text }) {
    const { setSearchText, setCart, setFavoritos, favoritos, cart } = useContext(DataContext)
    const [selectProduct, setSelectProduct] = useState()
    const navigate = useNavigate()

    const [list, setList] = useState([])


    useEffect(() => {

        if (!text || text === undefined) {
            setList(produtos)
        } else {
            setList(produtos.filter(({ nome, descricao, categoria }) => nome.toLowerCase().includes(text.toLowerCase()) || descricao.toLowerCase().includes(text.toLowerCase()) || categoria.toLowerCase().includes(text.toLowerCase())))
        }
    }, [setList, navigate, text])

    const submit = (event) => {
        event.preventDefault()
        const { target } = event
        const data = formCaptureData(target)
        setSearchText(data.text)
    }

    const addCart = (produto) => {
        const local = localStorage.getItem("eshop:cart")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:cart", JSON.stringify(list))
            setCart(list)
        } else {
            localStorage.setItem("eshop:cart", JSON.stringify([produto]))
            setCart([produto])
        }
    }

    const addFavorito = (produto) => {
        const local = localStorage.getItem("eshop:favorites")

        if (local !== null) {
            const list = JSON.parse(local)
            list.push(produto)
            localStorage.setItem("eshop:favorites", JSON.stringify(list))
            setFavoritos(list)
        } else {
            localStorage.setItem("eshop:favorites", JSON.stringify([produto]))
            setFavoritos([produto])
        }
    }

    const removeFavorite = (filter) => {
        const list = favoritos
        const newList = list.filter(({ nome }) => nome !== filter)

        localStorage.setItem("eshop:favorites", JSON.stringify(newList))
        setFavoritos(newList)
    }

    const isInFavorites = ({ nome }) => {
        const fav = favoritos.map(el => { return el.nome })

        if (fav.includes(nome)) {
            return true
        } else {
            return false
        }
    }

    const isInCart = ({ nome }) => {
        const ct = cart.map(el => { return el.nome })

        if (ct.includes(nome)) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="page search">
            <nav className="search-nav">
                <a href="/webshop" className="logo">
                    <span>eShop <p>loja online <FontAwesomeIcon icon={faCartShopping} /></p></span>
                </a>
                <form onSubmit={submit}>
                    <div className="text-input">
                        <input type="text" name="text" placeholder="Buscar produtos..." />
                        <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </form>
            </nav>
            <section>
                <h2>{list.length === 0 ? <p>Nenhum resultado para "{text}"</p> : <p>Resultados da busca ...</p>} </h2>
                <div className="list">
                    {list.map((item, index) => {
                        const { nome, valor, lista_img } = item
                        return (
                            <div className="item" key={"item" + index}>
                                <nav>
                                    {isInFavorites(item) ? <FontAwesomeIcon icon={faHeartCircleCheck} onClick={() => removeFavorite(nome)} /> : <FontAwesomeIcon icon={faHeart} onClick={() => addFavorito(item)} />}
                                    {isInCart(item) ? <FontAwesomeIcon icon={faCartArrowDown} /> : <FontAwesomeIcon icon={faCartPlus} onClick={() => addCart(item)} />}
                                </nav>
                                <div className="img">
                                    <img src={lista_img[0]} alt="" />
                                </div>

                                <div className="info" onClick={() => setSelectProduct(item)}>
                                    <h4>{nome}</h4>
                                    <span>{numberForBrl(valor)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {selectProduct && <ViewProduct product={selectProduct} close={setSelectProduct} />}
            <Footer />
        </div>
    )
}