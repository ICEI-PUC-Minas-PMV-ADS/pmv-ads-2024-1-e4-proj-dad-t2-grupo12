import './Header.css';
import logotransparente from "/src/assets/logotransparente.png";
import perfilimagem from "/src/assets/perfil.png";
import {Button, InputGroup, Form, Image, Col} from "react-bootstrap";

const Header = () => {
    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src={logotransparente} alt="Logo" width="50" height="50"/>
                </div>
                <div className="barra-pesquisa">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar colaborador"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Pesquisar
                        </Button>
                    </InputGroup>
                </div>
                <div className="usuario-logado">
                    <Col xs={6} md={4}>
                        <Image src={perfilimagem} roundedCircle
                               className="imagem-perfil"
                        />
                    </Col>
                </div>
                <div className="user-name-div">
                    <span className="user-name">Usuário logado</span>
                </div>
            </header>
        </div>
    );
}

export default Header;
