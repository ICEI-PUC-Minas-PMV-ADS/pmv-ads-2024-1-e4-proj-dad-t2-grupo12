import PropTypes from 'prop-types';
import './PainelCentral.css';
import DropdownButtonAction from "../dropdown-button-action/DropdownButtonAction.jsx";
import { Badge, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function calcularHorasTrabalhadas(inicioExpediente, fimExpediente) {
    if (inicioExpediente && fimExpediente) {
        const diffMs = new Date(fimExpediente) - new Date(inicioExpediente);
        const diffDate = new Date(diffMs);
        const hours = String(diffDate.getUTCHours()).padStart(2, '0');
        const minutes = String(diffDate.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    return "-";
}

function calcularSaldoDiario(registro) {
    const horasTrabalhadas = calcularHorasTrabalhadas(registro.inicioExpediente, registro.fimExpediente);

    if (horasTrabalhadas === "-") {
        return "-";
    }

    const [hours, minutes] = horasTrabalhadas.split(":").map(Number);
    const horasTrabalhadasMs = (hours * 3600 + minutes * 60) * 1000;

    const oitoHorasEmMilissegundos = 8 * 3600 * 1000;
    const saldoMs = horasTrabalhadasMs - oitoHorasEmMilissegundos;

    const saldoNegativo = saldoMs < 0;
    const saldoFinalMs = Math.abs(saldoMs);

    const saldoDate = new Date(saldoFinalMs);
    const saldoHours = String(saldoDate.getUTCHours()).padStart(2, '0');
    const saldoMinutes = String(saldoDate.getUTCMinutes()).padStart(2, '0');
    const saldoFormatado = `${saldoHours}:${saldoMinutes}`;

    return saldoNegativo ? `-${saldoFormatado}` : saldoFormatado;
}

function PainelCentral({ registros, colaborador }) {
    const [currentPage, setCurrentPage] = useState(1);
    const registrosFiltrados = registros.filter(registro => registro.temSolicitacaoAlteracao);
    const recordsPerPage = 7;
    const totalPages = Math.ceil(registrosFiltrados.length / recordsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [registrosFiltrados]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = registrosFiltrados.slice(indexOfFirstRecord, indexOfLastRecord);

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
        if (indexOfLastRecord < registrosFiltrados.length) {
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
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {currentRecords.map((registro) => (
                    <tr className="linha-tabela" key={registro.id}>
                        <td className="linha-data">{new Date(registro.dataRegistro).toLocaleDateString('pt-BR')}</td>
                        <td>{calcularHorasTrabalhadas(registro.inicioExpediente, registro.fimExpediente)}</td>
                        <td>{calcularSaldoDiario(registro)}</td>
                        <td>{renderizarStatus(registro)}</td>
                        <td><DropdownButtonAction status={registro.temSolicitacaoAlteracao ? "Solicitação" : "Aprovado" } registro={registro} colaborador={colaborador} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={indexOfLastRecord >= registrosFiltrados.length}>Próximo</button>
            </div>
        </div>
    );
}

PainelCentral.propTypes = {
    registros: PropTypes.arrayOf(PropTypes.object).isRequired,
    colaborador: PropTypes.object.isRequired
};

export default PainelCentral;
