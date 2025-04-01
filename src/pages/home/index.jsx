import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCartShopping, faChevronLeft, faChevronRight, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";
import Cart from "../../components/Cart";
import { openModal, formCaptureData, baseUrl } from "../../utils/functions";
import SlideDiv from "../../components/SlideDiv";
import Perfil from "../../components/Perfil";
import { DataContext } from "../../context/DataContext";
import ViewProduct from "../../components/ViewProduct";
import "./index.css"
import { useNavigate } from "react-router";
import Footer from "../../components/footer";
import Hlist from "../../components/H_List";

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
        id: 6,
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
    }
]

export default function Home() {
    const { cart, setCart, setSearchText, searchText } = useContext(DataContext)
    const [selectedProd, setSelectedProd] = useState()
    const navigate = useNavigate()

    const slideRoller = (target, position) => {
        const slide = target.parentElement.querySelectorAll('.slide-div')
        if (position) {
            let next
            let view
            slide.forEach((element, index) => {
                if (element.getAttribute('view') === 'true') {
                    view = element
                    if (index < slide.length - 1) {
                        next = slide[index + 1]
                    }
                }
            });
            view.setAttribute('view', 'false')
            if (!next) {
                next = slide[0]
            }
            if (next) {
                next.setAttribute('view', 'true')
                next.setAttribute("position", "left")
            }

        } else {
            let next
            let view
            slide.forEach((element, index) => {
                if (element.getAttribute('view') === 'true') {
                    view = element
                    if (index >= 1) {
                        next = slide[index - 1]
                    }
                }
            });
            view.setAttribute('view', 'false')
            if (!next) {
                next = slide[slide.length - 1]
            }
            if (next) {
                next.setAttribute('view', 'true')
                next.setAttribute("position", "right")
            }
        }
    }

    const search = (event) => {
        event.preventDefault()
        const { target } = event
        if (target.tagName === "FORM") {
            setSearchText(formCaptureData(target).search);
        } else {
            setSearchText(target.textContent)
        }

        if (searchText) {
            if (searchText.length > 0) {
                navigate(baseUrl + "/search")
            }
        }
    }

    const categorias = []
    produtos.map((item) => {
        const { categoria } = item
        if (!categorias.includes(categoria)) {
            categorias.push(categoria)
        }
    })

    const [position, setPosition] = useState()
    return (
        <div className="page home">
            <nav className="top-nav">
                <a href="/webshop" className="logo">
                    <span>eShop <p>loja online <FontAwesomeIcon icon={faCartShopping} /></p></span>
                </a>
                <nav>
                    <button>
                        <span>Categorias</span>
                        <div className="categories">
                            {categorias.map(cat => { return <p key={cat} onClick={search}>{cat}</p> })}
                        </div>
                    </button>
                    <button><a href="#offer">Ofertas</a></button>
                    <button><a href="#highlights">Populares</a></button>
                    <button><a href="#week">Semanal</a></button>
                </nav>

                <div className="login-nav">
                    <button>
                        <form onSubmit={search}>
                            <input type="text" name="search" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={({ target }) => {
                                target.parentElement.querySelector('input').focus()
                            }} />
                        </form>
                    </button>
                    <button onClick={() => openModal('cart')}><span>Carrinho</span><FontAwesomeIcon icon={faBagShopping} /></button>
                    <button onClick={() => openModal('perfil')}><span>Perfil</span><FontAwesomeIcon icon={faUser} /></button>
                </div>
            </nav>

            <section>
                <div className="week-promo" id="week">
                    <div className="info">
                        <h3>WEEK PROMO</h3>
                        <span>
                            Todos os SmartWatchs com 20% de desconto.
                        </span>
                        <button>Ver Mais</button>
                    </div>
                    <img src="/webshop/smartwatch.jpeg" alt="" />
                </div>

                <div className="highlights" id="highlights" onTouchStart={(event) => setPosition(event.touches[0].clientX)} onTouchEnd={(event) => {
                    if (event.changedTouches[0].clientX < position - 120) {
                        slideRoller(document.querySelector(".page.home .highlights .roll-high"), true)
                    } else if (event.changedTouches[0].clientX > position + 120) {
                        slideRoller(document.querySelector(".page.home .highlights .roll-high"))
                    }
                }}>
                    <FontAwesomeIcon icon={faChevronLeft} className="roll-high" onClick={({ target }) => slideRoller(target)} />
                    <FontAwesomeIcon icon={faChevronRight} className="roll-high" onClick={({ target }) => slideRoller(target, true)} />
                    {produtos.map((item, index) => {
                        return <SlideDiv key={index + item.nome} item={item} list={cart} set={setCart} index={index} select={setSelectedProd} />
                    })}
                </div>
                <Hlist list={produtos} select={setSelectedProd}/>
            </section>
            <Footer />
            <Cart list={cart} set={setCart} />
            <Perfil setSelectedProd={setSelectedProd}/>
            {selectedProd && <ViewProduct product={selectedProd} close={setSelectedProd} />}
        </div>
    )
}