import './Header.css';
import logotransparente from "/src/assets/logotransparente.png";
import perfilimagem from "/src/assets/perfil.png";
import { Col, Image } from "react-bootstrap";

const Header = () => {
    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src={logotransparente} alt="Logo" width="50" height="50" />
                </div>
                <div className="usuario-logado">
                    <span className="user-name">Usuário logado</span>
                    <Col xs={6} md={4}>
                        <Image src={perfilimagem} roundedCircle className="imagem-perfil" />
                    </Col>
                </div>
            </header>
        </div>
    );
};

export default Header;
