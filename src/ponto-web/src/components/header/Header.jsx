import { useState, useEffect, useCallback } from "react";
import './Header.css';
import logotransparente from "/src/assets/logotransparente.png";
import perfilimagem from "/src/assets/perfil.png";
import { Button, InputGroup, Form, Image, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import _ from 'lodash';
import { obterColaboradorPeloNome } from "../../services/api.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const obterPeloNome = async (term) => {
        try {
            const response = await obterColaboradorPeloNome(term);
            setColaboradores(response);
        } catch (error) {
            console.error("Erro ao buscar colaborador pelo nome:", error);
        }
    };

    const debouncedSearch = useCallback(_.debounce((term) => {
        if (term) {
            obterPeloNome(term);
        } else {
            setColaboradores([]);
        }
    }, 500), []);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src={logotransparente} alt="Logo" width="50" height="50" />
                </div>
                <div className="barra-pesquisa">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Buscar colaborador"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => obterPeloNome(searchTerm)}>
                            Pesquisar
                        </Button>
                    </InputGroup>
                    <ListGroup className="autocomplete-list">
                        {colaboradores.map((colaborador) => (
                            <Link key={colaborador.id} to={`/painel-colaborador/${colaborador.id}`}>
                                <ListGroupItem className="autocomplete-item">
                                    {colaborador.nome}
                                </ListGroupItem>
                            </Link>
                        ))}
                    </ListGroup>
                </div>
                <div className="usuario-logado">
                    <Col xs={6} md={4}>
                        <Image src={perfilimagem} roundedCircle className="imagem-perfil" />
                    </Col>
                </div>
                <div className="user-name-div">
                    <span className="user-name">Usuário logado</span>
                </div>
            </header>
        </div>
    );
};

export default Header;
