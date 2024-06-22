import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obterColaboradorPeloNome } from "../../services/Api.jsx";
import _ from "lodash";

const BuscarInput = ({ onColaboradorSelect, redirect }) => {
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

    const handleSelect = (colaborador) => {
        if (onColaboradorSelect) {
            onColaboradorSelect(colaborador);
        }
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    className="input-busca"
                    placeholder="Buscar colaborador"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => obterPeloNome(searchTerm)}
                >
                    Pesquisar
                </Button>
            </InputGroup>
            <ListGroup className="autocomplete-list">
                {colaboradores.map((colaborador) => (
                    redirect ? (
                        <Link
                            key={colaborador.id}
                            to={`/painel-colaborador/${colaborador.id}`}
                            state={{ colaborador }}
                            onClick={() => handleSelect(colaborador)}
                        >
                            <ListGroupItem className="autocomplete-item">
                                {colaborador.nome}
                            </ListGroupItem>
                        </Link>
                    ) : (
                        <ListGroupItem
                            key={colaborador.id}
                            className="autocomplete-item"
                            onClick={() => handleSelect(colaborador)}
                        >
                            {colaborador.nome}
                        </ListGroupItem>
                    )
                ))}
            </ListGroup>
        </div>
    );
};

BuscarInput.propTypes = {
    onColaboradorSelect: PropTypes.func,
    redirect: PropTypes.bool,
};

BuscarInput.defaultProps = {
    redirect: false,
};

export default BuscarInput;
