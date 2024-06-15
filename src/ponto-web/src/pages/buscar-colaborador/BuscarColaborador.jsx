import './BuscarColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import {Form, InputGroup, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useCallback, useEffect, useState} from "react";
import {obterColaboradorPeloNome} from "../../services/api.jsx";
import _ from "lodash";
import {Link} from "react-router-dom";

const BuscarColaborador = () => {
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
            <Header></Header>
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral></MenuLateral>
                </div>
                <div className="conteudo-central">
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Buscar Colaborador</h2>
                        </div>
                    </div>
                    <div className="main-painel-inicial-buscar">
                        <div className="painel-table-inicial-buscar">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    className={"input-busca"}
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
                                    <Link key={colaborador.id} to={`/painel-colaborador/${colaborador.id}`} state={{ colaborador }}>
                                        <ListGroupItem className="autocomplete-item">
                                            {colaborador.nome}
                                        </ListGroupItem>
                                    </Link>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuscarColaborador;
