import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <footer>
            <a href="/webshop" className="logo">
                <span>eShop <p>loja online <FontAwesomeIcon icon={faCartShopping} /></p></span>
            </a>
            <h3>
                <a href="https://github.com/joaofilipesoares45" target="_blank"><FontAwesomeIcon icon={faGithub} />https://github.com/joaofilipesoares45</a>
            </h3>
        </footer>
    )
}