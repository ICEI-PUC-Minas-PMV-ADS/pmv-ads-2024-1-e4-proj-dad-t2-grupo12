import PropTypes from 'prop-types';
import './PainelCentral.css';
import DropdownButtonAction from "../dropdown-button-action/DropdownButtonAction.jsx";
import { Badge, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function PainelCentral({ registros }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = registros.slice(indexOfFirstRecord, indexOfLastRecord);

    const renderizarStatus = (isPositivo) => {
        return isPositivo ? (
            <Badge className="aprovacao-badge" bg="">
                Aprovado
            </Badge>
        ) : (
            <Badge className="incompleto-badge" bg="">
                Incompleto
            </Badge>
        );
    };

    const handleNextPage = () => {
        if (indexOfLastRecord < registros.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="table-div">
            <Table bordered hover>
                <thead>
                <tr className="tr-cabecalho-primeira-linha">
                    <th className="linha-data">Data</th>
                    <th>Horas trabalhadas</th>
                    <th>Saldo diário</th>
                    <th>Saldo final</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {currentRecords.map((registro) => (
                    <tr className="linha-tabela" key={registro.id}>
                        <td className="linha-data">{new Date(registro.dataRegistro).toLocaleDateString('pt-BR')}</td>
                        <td>{registro.inicioExpediente && registro.fimExpediente ? (
                            new Date(new Date(registro.fimExpediente) - new Date(registro.inicioExpediente)).toISOString().substr(11, 8)
                        ) : "-"}</td>
                        <td>{registro.saldo}</td>
                        <td>{registro.saldo}</td>
                        <td>{renderizarStatus(registro.isPositivo)}</td>
                        <td><DropdownButtonAction status={registro.isPositivo ? "Aprovado" : "Incompleto"} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={indexOfLastRecord >= registros.length}>Próximo</button>
            </div>
        </div>
    );
}

PainelCentral.propTypes = {
    registros: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PainelCentral;
