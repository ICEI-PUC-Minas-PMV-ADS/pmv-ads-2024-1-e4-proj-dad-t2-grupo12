import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BuscarInput.css';  // Make sure to include this line if you have specific styles

const BuscarInput = ({ searchTerm, setSearchTerm, colaboradores, obterPeloNome }) => {
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
                    <Link key={colaborador.id} to={`/painel-colaborador/${colaborador.id}`} state={{ colaborador }}>
                        <ListGroupItem className="autocomplete-item">
                            {colaborador.nome}
                        </ListGroupItem>
                    </Link>
                ))}
            </ListGroup>
        </div>
    );
};

BuscarInput.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    colaboradores: PropTypes.array.isRequired,
    obterPeloNome: PropTypes.func.isRequired,
};

export default BuscarInput;
