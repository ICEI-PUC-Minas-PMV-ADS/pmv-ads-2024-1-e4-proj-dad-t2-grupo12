import PropTypes from 'prop-types';
import './PainelCentral.css';
import DropdownButtonAction from "../dropdown-button-action/DropdownButtonAction.jsx";
import { Badge, Table } from "react-bootstrap";
import { useState } from "react";

function PainelCentral({ registros }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = registros.slice(indexOfFirstRecord, indexOfLastRecord);

    const renderizarStatus = (registro) => {
        if (registro.temSolicitacaoAlteracao) {
            return (
                <Badge className="solicitacao-badge" bg="warning">
                    Solicitação
                </Badge>
            );
        } else if ([registro.inicioExpediente, registro.inicioIntervalo, registro.fimIntervalo, registro.fimExpediente].filter(horario => horario !== null).length < 4) {
            return (
                <Badge className="incompleto-badge" bg="">
                    Incompleto
                </Badge>
            );
        } else {
            return (
                <Badge className="aprovacao-badge" bg="">
                    Aprovado
                </Badge>
            );
        }
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
                        <td>{renderizarStatus(registro)}</td>
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
